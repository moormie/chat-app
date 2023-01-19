import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../types/User";
import { getContactsFromSnapshot } from "../firebase/contacts";
import { useAuthContext } from "./authContext";
import { getUserById } from "../firebase/users";
import { QuerySnapshot } from "firebase/firestore";

interface ContextData {
  contactList: User[];
  loading: boolean;
}

export const ContactListContext = createContext<ContextData>({
  contactList: [],
  loading: true,
});

type Props = {
  children?: React.ReactNode;
};

export const ContactListContextProvider: FC<Props> = ({ children }) => {
  const { currentUser } = useAuthContext();

  const [contactList, setContactList] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const observer = useCallback(async (snapshot: QuerySnapshot) => {
    setLoading(true);
    const resultIdList: string[] = [];
    const resultList: User[] = [];
    snapshot.forEach((doc) => {
      resultIdList.push(doc.id);
    });
    await Promise.all(
      resultIdList.map((id: string) =>
        getUserById(id).then((u) => {
          u && resultList.push(u);
        })
      )
    );
    setLoading(false);
    setContactList(resultList);
  }, []);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    const unsub = getContactsFromSnapshot(currentUser.id, observer);
    return () => unsub && unsub();
  }, [currentUser, observer]);

  return (
    <ContactListContext.Provider value={{ contactList, loading }}>
      {children}
    </ContactListContext.Provider>
  );
};

export const useContactListContext = () => {
  const store = useContext(ContactListContext);
  return store;
};
