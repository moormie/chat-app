import { createContext, FC, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "../types/User";

interface ContextData {
  user: User | null;
  loading: boolean;
}

export const AuthContext = createContext<ContextData>({
  user: null,
  loading: true,
});

type Props = {
  children?: React.ReactNode;
};

export const AuthContextProvider: FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          id: user?.uid,
          name: user?.displayName ?? "",
          email: user?.email!,
        });
        setLoading(false);
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user: currentUser, loading: loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const store = useContext(AuthContext);
  return store;
};
