import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { useUserStore } from "@/stores/userStore";
import { useGlobalStore } from "@/stores/globalStore";
import { usePlayersStore } from "@/stores/playersStore";

// TODO: Implement this - https://firebase.google.com/docs/auth/web/manage-users#send_a_user_a_verification_email
export default function () {
  const { $auth } = useNuxtApp();
  const { setNewFirebaseDocumentWithId } = useFirebaseDb();

  const createUser = async (
    email: string,
    password: string,
    username: string
  ) => {
    try {
      // prettier-ignore
      const { user } = await createUserWithEmailAndPassword($auth, email, password);
      await updateProfile(user, { displayName: username });
      await setNewFirebaseDocumentWithId("users", user.uid, { username });
      await navigateTo("/dashboard");
    } catch (e) {
      console.error("Error creating user: ", e);
    }
  };

  const signInUser = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword($auth, email, password);
      await navigateTo("/dashboard");
    } catch (e) {
      console.error("Error signing in user: ", e);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut($auth);
      await navigateTo("/");
    } catch (e) {
      console.error("Error signing out user: ", e);
    }
  };

  const watchForAuthChange = async () => {
    const userStore = useUserStore();
    const globalStore = useGlobalStore();
    const playersStore = usePlayersStore();
    const unsubscribe = onAuthStateChanged($auth, (user) => {
      if (user) {
        userStore.user = user;
        playersStore.subscribeToPlayersCollection();
      } else {
        userStore.$reset();
        globalStore.$reset();
        playersStore.unsubscribeFromPlayersCollection();
      }
    });

    return unsubscribe;
  };

  const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
      const removeListener = onAuthStateChanged(
        getAuth(),
        (user) => {
          removeListener();
          resolve(user);
        },
        reject
      );
    });
  };

  return {
    createUser,
    signInUser,
    signOutUser,
    watchForAuthChange,
    getCurrentUser,
  };
}
