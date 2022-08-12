import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { doc } from "firebase/firestore";

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

export const deleteRecipeById = async (requestData) => {
  const recipeDoc = doc(db, "recipes", requestData);
  await deleteDoc(recipeDoc);
};

export const editRecipeById = async (requestData) => {
  const recipeDoc = doc(db, "recipes", requestData.id);
  await updateDoc(recipeDoc, requestData.data);
};

export const getRecipeById = async (requestData) => {
  const docRef = doc(db, "recipes", requestData);
  const docSnap = await getDoc(docRef);
  const transformedData = {
    ...docSnap.data(),
    id: docSnap.id,
  };

  return transformedData;
};
