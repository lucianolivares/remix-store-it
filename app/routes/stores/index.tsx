import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { Query } from "firebase-admin/firestore";
import { auth } from "~/auth.server";
import type { AuthUser } from "~/auth.server/auth-types";
import { db } from "~/firebase";

type StoreType = {
  name: string;
};

const getStores = async (userId: string) => {
  const storesRef = db.collection("users").doc(userId).collection("stores");
  let query: Query = storesRef;
  query = query.orderBy("name", "desc");

  const stores = (await query.get()).docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return stores;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user: AuthUser = await auth.user(request);
  const stores = await getStores(user.id);
  return {
    user,
    stores,
  };
};

export default function StoresIndexRoute() {
  const data = useLoaderData();
  const user = data.user;
  const stores: Array<StoreType> = data?.stores;

  return (
    <div>
      <h1 className="text-center pt-8 mb-4 text-4xl font-bold tracking-tight leading-none dark:text-white">
        Stores de {user.username} 📚
      </h1>
      <main className="flex flex-col">
        {/* Crear componente lista de stores */}
        <ul className="flex flex-col mb-4 gap-2">
          {!stores.length && <h1>No has creado ninguna lista</h1>}
          {stores.map((store, index: any) => (
            <li
              key={index}
              className="dark:text-white self-center bg-gray-700 p-2"
            >
              <Link to={store.name}>{store.name}</Link>
            </li>
          ))}
        </ul>
        <Link className="rounded-full m-auto p-4 bg-teal-500" to="new-store">
          Nuevo Store
        </Link>
      </main>
    </div>
  );
}
