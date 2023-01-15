import { DocumentSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/authContext";
import { useContactListContext } from "../contexts/contactListContext";
import { getMessagesFromSnapshot } from "../firebase/messages";
import { Chat, Message } from "../types/Message";

export const useChat = (contactId?: string) => {
  const { contactList } = useContactListContext();
  const { currentUser } = useAuthContext();

  const [chat, setChat] = useState<Chat[]>([]);

  const observer = (snapshot: DocumentSnapshot<Message[]>) => {
    if (snapshot.exists() && currentUser) {
      const messageList = snapshot.data();
      const chat: Chat[] = messageList.map((message) => ({
        ...message,
        senderName:
          message.senderId === currentUser.id
            ? currentUser?.name
            : contactList.find((contact) => contact.id === message.senderId)
                ?.name ?? "No Name",
      }));
      setChat(chat.sort((a, b) => a.timestamp - b.timestamp));
    } else {
      setChat([]);
    }
  };

  useEffect(() => {
    if (!currentUser || !contactId) {
      return;
    }
    const unsub = getMessagesFromSnapshot(currentUser.id, contactId, observer);

    if (unsub) {
      return () => unsub();
    }
  }, [currentUser, contactId]);

  return { chat };
};
