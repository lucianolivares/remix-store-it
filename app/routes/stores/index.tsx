import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { auth } from "~/auth.server";
import type { AuthUser } from "~/auth.server/auth-types";
import StoresList from "~/components/StoresList";
import type { StoreType} from "~/controllers.server/stores";
import { getStores } from "~/controllers.server/stores";


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
  const stores: Array<StoreType> = data?.stores;

  return (
    <div>
      <h1 className="text-center pt-8 mb-4 text-4xl font-bold tracking-tight leading-none dark:text-gray-100">
        Almacenes 📚
      </h1>
      <main className="flex flex-col">
        <StoresList stores={stores} />
        <Link className="mx-auto shadow bg-teal-500 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" to="new-store">
          Nuevo Almacen
        </Link>
      </main>
    </div>
  );
}
