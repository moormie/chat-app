import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";

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
      await updateProfile(response.user, {
        displayName: name,
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

export const signIn = async (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      console.log(error);
      throw new Error("Something went wrong...");
    });
};
