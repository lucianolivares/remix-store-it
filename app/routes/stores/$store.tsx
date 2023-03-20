import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { auth } from "~/auth.server";
import type { AuthUser } from "~/auth.server/auth-types";
import { db } from "~/firebase";

export const loader: LoaderFunction = async ({ request, params }) => {
  const user: AuthUser = await auth.user(request);
  const store  = params.store || ''
  const userRef = await db.collection("users").doc(user.id);
  const doc = await userRef.get();
  if (!doc.exists) {
    return null;
  }
  const data = doc.data()
  const stores = data?.stores

  if (stores?.[store] === undefined) {
    return redirect("/stores");
  }
  const products = stores[store] || {};
  return {
    user: await auth.user(request),
    store: store,
    products: products,
  };
};

export default function StoreRoute() {
  const { store, products } = useLoaderData();
  return (
    <div className="flex flex-col">
      <h1 className="text-center pt-8 mb-4 text-4xl font-extrabold tracking-tight leading-none dark:text-white">
        {store}
      </h1>

      <Outlet context={products}/>
    </div>
  );
}
