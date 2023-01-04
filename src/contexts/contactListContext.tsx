import { createContext, FC, useContext, useEffect, useState } from "react";
import { User } from "../types/User";
import { getContactList } from "../firebase/contacts";
import { useAuthContext } from "./authContext";

interface ContextData {
  contactList: User[];
}

export const ContactListContext = createContext<ContextData>({
  contactList: [],
});

type Props = {
  children?: React.ReactNode;
};

export const ContactListContextProvider: FC<Props> = ({ children }) => {
  const { user } = useAuthContext();

  const [contactList, setContactList] = useState<User[]>([]);

  useEffect(() => {
    if (!user) {
      return;
    }
    const load = async () => {
      const result = await getContactList(user.id);
      setContactList(result);
    };
    load();
  }, [user]);

  return (
    <ContactListContext.Provider value={{ contactList: contactList }}>
      {children}
    </ContactListContext.Provider>
  );
};

export const useContactListContext = () => {
  const store = useContext(ContactListContext);
  return store;
};
