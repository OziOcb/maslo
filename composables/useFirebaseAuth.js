import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useUserStore } from "@/stores/userStore";

// TODO: Implement this - https://firebase.google.com/docs/auth/web/manage-users#send_a_user_a_verification_email
export default function () {
  const { $auth } = useNuxtApp();

  const createUser = async (email, password, username) => {
    try {
      await createUserWithEmailAndPassword($auth, email, password);
      await updateProfile($auth.currentUser, { displayName: username });
      await navigateTo("/");
    } catch (e) {
      console.error("Error creating user: ", e);
    }
  };

  const signInUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword($auth, email, password);
      await navigateTo("/");
    } catch (e) {
      console.error("Error signing in user: ", e);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut($auth);
      await navigateTo("/login");
    } catch (e) {
      console.error("Error signing out user: ", e);
    }
  };

  const watchForAuthChange = async () => {
    const userStore = useUserStore();
    const unsubscribe = onAuthStateChanged($auth, (user) => {
      if (user) {
        userStore.user = user;
      } else {
        userStore.$reset();
      }
    });

    return unsubscribe;
  };

  return {
    createUser,
    signInUser,
    signOutUser,
    watchForAuthChange,
  };
}
