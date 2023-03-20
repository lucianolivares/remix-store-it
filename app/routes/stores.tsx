import type { LoaderFunction} from "@remix-run/node";

import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { auth } from "~/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  await auth.requireUser(request, null, "/auth")
  return await auth.user(request);
};

export default function StoresRoute() {
  const user = useLoaderData();

  return (
    <div className="dark:bg-gray-800 min-h-screen">
      <header className="flex justify-between px-4 dark:bg-gray-900 align-middle">
        <Link to="/" className="text-2xl self-center font-bold text-gray-200 p-4">
          <h1 >
            📦 Store it!
          </h1>
        </Link>
        {user && (
          <form action="/auth/logout" method="post" className="p-4">
            <button type="submit" className="rounded-full bg-orange-500 p-2 text-gray-100">
              Cerrar Sessión
            </button>
          </form>
        )}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
