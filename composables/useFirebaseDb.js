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

  const addNewFirebaseDocument = async (collectionName, formData) => {
    try {
      const collectionRef = collection($firestore, collectionName);
      const data = { ...formData, authorID: $auth.currentUser.uid };
      await addDoc(collectionRef, data);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getFirebaseDocument = async (collectionName, documentId) => {
    try {
      const docRef = doc($firestore, collectionName, documentId);
      const snap = await getDoc(docRef);
      return snap;
    } catch (e) {
      console.error("Error getting document: ", e);
    }
  };

  const updateFirebaseDocument = async (
    collectionName,
    documentId,
    key,
    newValue
  ) => {
    try {
      const docRef = doc($firestore, collectionName, documentId);
      await updateDoc(docRef, { [key]: newValue });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const deleteFirebaseDocument = async (collectionName, documentId) => {
    try {
      const docRef = doc($firestore, collectionName, documentId);
      await deleteDoc(docRef);
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  const subscribeToFirebaseCollection = async (
    collectionName,
    orderByKey,
    dataRef
  ) => {
    try {
      const collectionRef = collection($firestore, collectionName);
      const q = query(
        collectionRef,
        orderBy(orderByKey),
        where("authorID", "==", $auth.currentUser.uid)
      );
      const unSub = onSnapshot(q, (snap) => {
        const arr = [];
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
    collectionName,
    orderByKey,
    dataRef,
    key,
    operator,
    filterValue,
    searchLimit
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
        const arr = [];
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
