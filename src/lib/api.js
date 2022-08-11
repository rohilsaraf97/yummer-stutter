import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const recipesCollectionRef = collection(db, "recipes");

export const addRecipe = async (requestData) => {
  await addDoc(recipesCollectionRef, requestData);
};

export const getRecipes = async () => {
  const data = await getDocs(recipesCollectionRef);
  const transformedData = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return transformedData;
};
