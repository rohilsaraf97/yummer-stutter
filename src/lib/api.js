import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

const recipesCollectionRef = collection(db, "recipes");

export const addRecipe = async (requestData) => {
  await addDoc(recipesCollectionRef, requestData);
};
