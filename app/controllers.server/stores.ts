import type { Query } from "firebase-admin/firestore";
import { db } from "~/firebase";

export type StoreType = {
  name: string;
};

export type ProductType = {
  name: string;
  stock: string;
  minStock: string;
};


export const getStoreId = async (userId:string, storeName:string) => {
  const storesRef = db.collection("users").doc(userId).collection("stores")
  let query = storesRef.where('name', '==', storeName);
  const snapshot = await query.get()
  if (snapshot.empty){
    return ''
  }
  const store = snapshot.docs[0]
  return store.id
}

export const getStores = async (userId: string) => {
  const storesRef = db.collection("users").doc(userId).collection("stores");
  let query: Query = storesRef;
  query = query.orderBy("name", "desc");

  const stores = (await query.get()).docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return stores;
};

export const getProductId = async (userId:string, storeId:string, productName:string) => {
  const productsRef = db.collection("users").doc(userId).collection("stores").doc(storeId).collection('products')
  let query = productsRef.where('name', '==', productName);
  const snapshot = await query.get()
  console.log(productName)
  if (snapshot.empty){
    return ''
  }
  const product = snapshot.docs[0]
  return product.id
}


export const getProducts = async (userId:string, storeId:string) => {
  const storesRef = db.collection("users").doc(userId).collection("stores")
  const productsRef = storesRef.doc(storeId).collection('products')
  let producstQuery: Query = productsRef
  producstQuery = producstQuery.orderBy('name', 'desc')
  const products = (await producstQuery.get()).docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return products
}
