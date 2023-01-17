import { DocumentSnapshot } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../contexts/authContext";
import { useContactListContext } from "../contexts/contactListContext";
import { getMessagesFromSnapshot } from "../firebase/messages";
import { Chat, Message } from "../types/Message";
import { User } from "../types/User";

export const useChat = (contactId?: string) => {
  const { contactList } = useContactListContext();
  const { currentUser } = useAuthContext();

  const [chat, setChat] = useState<Chat[]>([]);

  const observer = useCallback(
    (snapshot: DocumentSnapshot<Message[]>) => {
      const chatList = getChatList(currentUser, contactList, snapshot.data());
      setChat(chatList);
    },
    [currentUser, contactList]
  );

  useEffect(() => {
    if (!currentUser || !contactId) {
      return;
    }
    const unsub = getMessagesFromSnapshot(currentUser.id, contactId, observer);

    if (unsub) {
      return () => unsub();
    }
  }, [currentUser, contactId, observer]);

  return { chat };
};

const getChatList = (
  currentUser: User | null,
  contactList: User[],
  messageList?: Message[]
) => {
  if (!messageList || !currentUser || !contactList) {
    return [];
  }
  const chat: Chat[] = messageList.map((message) => ({
    ...message,
    senderName:
      message.senderId === currentUser.id
        ? currentUser?.name
        : contactList.find((contact) => contact.id === message.senderId)
            ?.name ?? "No Name",
  }));
  return chat.sort((a, b) => a.timestamp - b.timestamp);
};
