import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// TODO: 1. Implement this - https://vuefire.vuejs.org/guide/
// TODO: 2. Implement this - https://firebase.google.com/docs/auth/web/manage-users#send_a_user_a_verification_email
export default function () {
  const { $auth } = useNuxtApp();

  const createUser = async (email, password, username) => {
    try {
      await createUserWithEmailAndPassword($auth, email, password);
      await updateProfile($auth.currentUser, { displayName: username });
    } catch (error) {
      console.error(error);
    }
  };

  const signInUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword($auth, email, password);
    } catch (e) {
      console.error(e);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut($auth);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    createUser,
    signInUser,
    signOutUser,
  };
}
