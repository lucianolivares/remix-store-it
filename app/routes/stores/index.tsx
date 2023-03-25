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
  const user: AuthUser = data.user;
  const stores: Array<StoreType> = data?.stores;

  return (
    <div>
      <h1 className="text-center pt-8 mb-4 text-4xl font-bold tracking-tight leading-none dark:text-white">
        Stores de {user.username} 📚
      </h1>
      <main className="flex flex-col">
        <StoresList stores={stores} />
        <Link className="rounded-full m-auto px-4 py-2 bg-teal-500" to="new-store">
          Nuevo Store
        </Link>
      </main>
    </div>
  );
}
