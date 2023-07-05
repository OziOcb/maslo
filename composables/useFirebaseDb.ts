import { Operators } from "@/types/types";
import {
  getDoc,
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
  const { $firestore, $auth } = useNuxtApp();

  const addNewFirebaseDocument = async (
    collectionName: string,
    formData: {}
  ) => {
    try {
      const collectionRef = collection($firestore, collectionName);
      const data = { ...formData, authorID: $auth.currentUser?.uid };
      await addDoc(collectionRef, data);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getFirebaseDocument = async (
    collectionName: string,
    documentId: string
  ) => {
    try {
      const docRef = doc($firestore, collectionName, documentId);
      const snap = await getDoc(docRef);
      return snap;
    } catch (e) {
      console.error("Error getting document: ", e);
    }
  };

  const updateFirebaseDocument = async (
    collectionName: string,
    documentId: string,
    key: string,
    newValue: any
  ) => {
    try {
      const docRef = doc($firestore, collectionName, documentId);
      await updateDoc(docRef, { [key]: newValue });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const deleteFirebaseDocument = async (
    collectionName: string,
    documentId: string
  ) => {
    try {
      const docRef = doc($firestore, collectionName, documentId);
      await deleteDoc(docRef);
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  const subscribeToFirebaseCollection = async (
    collectionName: string,
    orderByKey: string,
    dataRef: Ref
  ) => {
    try {
      const collectionRef = collection($firestore, collectionName);
      const q = query(
        collectionRef,
        orderBy(orderByKey),
        // TODO: ENDED HERE!
        // TODO: ENDED HERE!
        // TODO: ENDED HERE!
        // TODO: ENDED HERE!
        // TODO: ENDED HERE! Fix this errors!!!!
        // TODO: ENDED HERE! Sproubuj tej metody - https://stackoverflow.com/questions/72814848/nuxt-3-onload-wait-for-onauthstatechange
        // TODO: ENDED HERE!
        // TODO: ENDED HERE!
        where("authorID", "==", $auth.currentUser.uid)
      );
      const unSub = onSnapshot(q, (snap) => {
        const arr: { id: string }[] = [];
        snap.forEach((doc) => {
          arr.push({ ...doc.data(), id: doc.id });
        });
        dataRef.value = arr;
      });

      return unSub;
    } catch (e) {
      console.error("Error subscribing to collection: ", e);
    }
  };

  const subscribeToFirebaseCollectionWithFilter = async (
    collectionName: string,
    orderByKey: string,
    dataRef: Ref,
    key: string,
    operator: Operators,
    filterValue: string | number,
    searchLimit: number
  ) => {
    try {
      // prettier-ignore
      const operators = ['<', '<=', '==', '>', '>=', '!=', 'array-contains', 'array-contains-any', 'in', 'not-in']
      if (!operators.includes(operator)) {
        alert("Operator must be valid");
        return;
      }

      const collectionRef = collection($firestore, collectionName);
      const q = query(
        collectionRef,
        orderBy(orderByKey),
        where("authorID", "==", $auth.currentUser.uid),
        where(key, operator, filterValue),
        limit(searchLimit)
      );
      const unSub = onSnapshot(q, (snap) => {
        const arr: { id: string }[] = [];
        snap.forEach((doc) => {
          arr.push({ ...doc.data(), id: doc.id });
        });
        dataRef.value = arr;
      });

      return unSub;
    } catch (e) {
      console.error("Error subscribing to collection with filter: ", e);
    }
  };

  return {
    addNewFirebaseDocument,
    getFirebaseDocument,
    updateFirebaseDocument,
    deleteFirebaseDocument,
    subscribeToFirebaseCollection,
    subscribeToFirebaseCollectionWithFilter,
  };
}
