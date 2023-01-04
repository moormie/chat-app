import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
import { User } from "../types/User";
import { db } from "./firebase";

export const userConverter = {
  toFirestore(): DocumentData {
    return {};
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions) {
    const data = snapshot.data(options)!;
    return {
      id: data.id,
      name: data.name,
      email: data.email,
    } as User;
  },
};

export const getUserById = async (id: string) => {
  try {
    const docRef = doc(db, "users", id).withConverter(userConverter);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (error) {
    console.log("No data");
    return undefined;
  }
};

export const getUsers = async () => {
  const q = query(collection(db, "users")).withConverter(userConverter);
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    return snapshot.docs.map((doc) => doc.data());
  } else {
    return [];
  }
};
