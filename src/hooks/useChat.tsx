import { DocumentSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/authContext";
import { useContactListContext } from "../contexts/contactListContext";
import { getMessagesFromSnapshot } from "../firebase/messages";
import { Chat, Message } from "../types/Message";

export const useChat = (contactId?: string) => {
  const { contactList } = useContactListContext();
  const { user } = useAuthContext();

  const [chat, setChat] = useState<Chat[]>([]);

  const observer = (snapshot: DocumentSnapshot<Message[]>) => {
    if (snapshot.exists() && user) {
      const messageList = snapshot.data();
      const chat: Chat[] = messageList.map((message) => ({
        ...message,
        senderName:
          message.senderId === user.id
            ? user?.name
            : contactList.find((contact) => contact.id === message.senderId)
                ?.name ?? "No Name",
      }));
      setChat(chat.sort((a, b) => a.timestamp - b.timestamp));
    } else {
      setChat([]);
    }
  };

  useEffect(() => {
    if (!user || !contactId) {
      return;
    }
    const unsub = getMessagesFromSnapshot(user.id, contactId, observer);

    if (unsub) {
      return () => unsub();
    }
  }, [user, contactId]);

  return { chat };
};
