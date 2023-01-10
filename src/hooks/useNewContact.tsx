import { FC, useState, createContext, useContext } from "react";
import { User } from "../types/User";

interface ContextData {
  newContact: User | null;
  setNewContact: (user: User | null) => void;
}

type Props = {
  children?: React.ReactNode;
};

const NewContactContext = createContext<ContextData>({
  newContact: null,
  setNewContact: () => {},
});

export const NewContactContextProvider: FC<Props> = ({ children }) => {
  const [state, setState] = useState<ContextData>({
    newContact: null,
    setNewContact: (user: User | null) => {
      setState((prevState) => ({
        ...prevState,
        newContact: user,
      }));
    },
  });

  return (
    <NewContactContext.Provider value={state}>
      {children}
    </NewContactContext.Provider>
  );
};

export const useNewContact = () => {
  const store = useContext(NewContactContext);
  return store;
};
