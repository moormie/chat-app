import {
  collection,
  getDocs,
  onSnapshot,
  query,
  QuerySnapshot,
} from "firebase/firestore";
import { User } from "../types/User";
import { db } from "./firebase";
import { getUserById } from "./users";

export const getContactsFromChat = async (id: string) => {
  const q = query(collection(db, "users", id, "chats"));
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    return snapshot.docs.map((doc) => doc.id);
  } else {
    return [];
  }
};

export const getContactList = async (id: string) => {
  const resultList: User[] = [];
  const contacts = await getContactsFromChat(id);
  await Promise.all(
    contacts.map((id: string) =>
      getUserById(id).then((u) => {
        u && resultList.push(u);
      })
    )
  );
  return resultList;
};

export const getContactsFromSnapshot = (
  id: string,
  metaObserver: (snapshot: QuerySnapshot) => void
) => {
  try {
    const q = query(collection(db, "users", id, "chats"));
    return onSnapshot(q, metaObserver);
  } catch (error) {
    console.log(error);
  }
};
