import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

export const createNewUser = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (response.user) {
      const { user } = response;
      await updateProfile(user, {
        displayName: name,
      });
      const { displayName, uid } = user;
      await setDoc(doc(db, "users", uid), {
        id: uid,
        name: displayName,
        contacts: [],
      });
    }
    return response;
  } catch (error: any) {
    console.log(error.code);
    if (error.code === "auth/email-already-in-use") {
      throw new Error("Email already in use");
    } else if (error.code === "auth/weak-password") {
      throw new Error("The password must contain...");
    } else {
      throw new Error("Something went wrong...");
    }
  }
};

export const signIn = async (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      console.log(error);
      throw new Error("Wrong user name or password!");
    });

export const signOut = () => {
  auth.signOut();
};
