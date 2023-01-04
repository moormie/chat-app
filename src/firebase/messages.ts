import {
  arrayUnion,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  onSnapshot,
  QueryDocumentSnapshot,
  setDoc,
  SnapshotOptions,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import moment from "moment";
import { Message } from "../types/Message";

export const messagesConverter = {
  toFirestore(): DocumentData {
    return {};
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions) {
    const data = snapshot.data(options)!;
    return data?.messages.map((m: Message) => ({
      senderId: m.senderId,
      message: m.message,
      timestamp: m.timestamp,
    }));
  },
};

export const createMessage = async (
  message: string,
  userId: string,
  receiverId: string
) => {
  const senderRef = doc(db, "users", userId, "chats", receiverId);
  const receiverRef = doc(db, "users", receiverId, "chats", userId);
  const docSnapSender = await getDoc(senderRef);
  const docSnapReceiver = await getDoc(receiverRef);

  if (!docSnapSender.exists()) {
    await setDoc(senderRef, {
      messages: [],
    });
  }
  if (!docSnapReceiver.exists()) {
    await setDoc(receiverRef, {
      messages: [],
    });
  }

  const sentData = {
    message: message,
    timestamp: moment.now().valueOf(),
    senderId: userId,
  };

  await updateDoc(senderRef, {
    messages: arrayUnion(sentData),
  });
  await updateDoc(receiverRef, {
    messages: arrayUnion(sentData),
  });
};

export const getMessages = async (userId: string, receiverId: string) => {
  try {
    const docRef = doc(db, "users", userId, "chats", receiverId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMessagesFromSnapshot = (
  userId: string,
  receiverId: string,
  metaObserver: (snapshot: DocumentSnapshot<Message[]>) => void
) => {
  try {
    const docRef = doc(db, "users", userId, "chats", receiverId).withConverter(
      messagesConverter
    );
    return onSnapshot(docRef, metaObserver);
  } catch (error) {
    console.log(error);
  }
};
