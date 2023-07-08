import { Operators } from "@/types/types";
import {
  getDoc,
  setDoc,
  doc,
  updateDoc,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  deleteDoc,
  onSnapshot,
  collection,
} from "firebase/firestore";

export default function () {
  /**
   * Using Firebase addDoc method
   */
  const addNewFirebaseDocument = async (
    collectionName: string,
    formData: {}
  ) => {
    const { $firestore, $auth } = useNuxtApp();
    try {
      const collectionRef = collection($firestore, collectionName);
      const data = { ...formData, authorID: $auth.currentUser?.uid };
      await addDoc(collectionRef, data);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  /**
   * Using Firebase setDoc method
   */
  const setNewFirebaseDocumentWithId = async (
    collectionName: string,
    documentId: string,
    formData: {}
  ) => {
    const { $firestore, $auth } = useNuxtApp();
    try {
      const docRef = doc($firestore, collectionName, documentId);
      const data = { ...formData, authorID: $auth.currentUser?.uid };
      await setDoc(docRef, data);
    } catch (e) {
      console.error("Error setting document: ", e);
    }
  };

  /**
   * Using Firebase getDoc method
   */
  const getFirebaseDocument = async (
    collectionName: string,
    documentId: string
  ) => {
    const { $firestore } = useNuxtApp();
    try {
      const docRef = doc($firestore, collectionName, documentId);
      const snap = await getDoc(docRef);
      return snap;
    } catch (e) {
      console.error("Error getting document: ", e);
    }
  };

  /**
   * Using Firebase updateDoc method
   */
  const updateFirebaseDocument = async (
    collectionName: string,
    documentId: string,
    key: string,
    newValue: any
  ) => {
    const { $firestore } = useNuxtApp();
    try {
      const docRef = doc($firestore, collectionName, documentId);
      await updateDoc(docRef, { [key]: newValue });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  /**
   * Using Firebase deleteDoc method
   */
  const deleteFirebaseDocument = async (
    collectionName: string,
    documentId: string
  ) => {
    const { $firestore } = useNuxtApp();
    try {
      const docRef = doc($firestore, collectionName, documentId);
      await deleteDoc(docRef);
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  /**
   * Using Firebase onSnapshot method
   * Value for the Id property will be assign automatically based on the Firebase Document Id
   */
  const subscribeToFirebaseCollection = async <T>(
    collectionName: string,
    orderByKey: string
  ) => {
    const { $firestore, $auth } = useNuxtApp();
    try {
      const arr: T[] = [];
      const q = query(
        collection($firestore, collectionName),
        orderBy(orderByKey),
        where("authorID", "==", $auth.currentUser?.uid)
      );
      const unSub = onSnapshot(q, (snap) => {
        snap.forEach((doc) => {
          arr.push({ ...doc.data(), id: doc.id } as T);
        });
      });

      return { unSub, arr };
    } catch (e) {
      console.error("Error subscribing to collection: ", e);
    }
  };

  /**
   * Using Firebase onSnapshot method
   * Value for the Id property will be assign automatically based on the Firebase Document Id
   */
  const subscribeToFirebaseCollectionWithFilter = async <T>(
    collectionName: string,
    orderByKey: string,
    key: string,
    operator: Operators,
    filterValue: string | number,
    searchLimit: number
  ) => {
    const { $firestore, $auth } = useNuxtApp();
    try {
      // prettier-ignore
      const operators = ['<', '<=', '==', '>', '>=', '!=', 'array-contains', 'array-contains-any', 'in', 'not-in']
      if (!operators.includes(operator)) {
        alert("Operator must be valid");
        return;
      }

      const arr: T[] = [];
      const q = query(
        collection($firestore, collectionName),
        orderBy(orderByKey),
        where("authorID", "==", $auth.currentUser?.uid),
        where(key, operator, filterValue),
        limit(searchLimit)
      );
      const unSub = onSnapshot(q, (snap) => {
        snap.forEach((doc) => {
          arr.push({ ...doc.data(), id: doc.id } as T);
        });
      });

      return { unSub, arr };
    } catch (e) {
      console.error("Error subscribing to collection with filter: ", e);
    }
  };

  return {
    addNewFirebaseDocument,
    setNewFirebaseDocumentWithId,
    getFirebaseDocument,
    updateFirebaseDocument,
    deleteFirebaseDocument,
    subscribeToFirebaseCollection,
    subscribeToFirebaseCollectionWithFilter,
  };
}
