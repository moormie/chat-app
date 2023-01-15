import { ContactListContextProvider } from "../../contexts/contactListContext";
import { NewContactContextProvider } from "../../hooks/useNewContact";
import { HomePage } from "./HomePage";

export const Home = () => {
  return (
    <ContactListContextProvider>
      <NewContactContextProvider>
        <HomePage />
      </NewContactContextProvider>
    </ContactListContextProvider>
  );
};
