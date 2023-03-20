import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { auth } from "~/auth.server";
import type { AuthUser } from "~/auth.server/auth-types";
import { db } from "~/firebase";

export const loader: LoaderFunction = async ({ request }) => {
  const user: AuthUser = await auth.user(request);

  const userRef = await db.collection("users").doc(user.id);
  const doc = await userRef.get();
  if (!doc.exists) {
    return null;
  }

  const { stores } = doc.data() || {};
  return {
    user: await auth.user(request),
    stores: stores,
  };
};

export default function StoresIndexRoute() {
  const { user, stores } = useLoaderData()
  const storesNames = Object.keys(stores) 
  return (
    <div>
      <h1 className="text-center pt-8 mb-4 text-4xl font-bold tracking-tight leading-none dark:text-white">
        Stores de {user.username} 📚
      </h1>
      <main className="flex flex-col">
        <ul className="flex flex-col mb-4 gap-2">
          {!storesNames.length && <h1>"Debes crear una lista"</h1>}
          {storesNames.map((list, index) => (
            <li key={index} className="dark:text-white self-center bg-gray-700 p-2">
              <Link to={list}>{list.toString()}</Link>
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
