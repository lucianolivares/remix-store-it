import type { LoaderFunction} from "@remix-run/node";

import { Outlet, useLoaderData } from "@remix-run/react";
import { auth } from "~/auth.server";
import type { AuthUser } from "~/auth.server/auth-types";
import NavBar from "~/components/NavBar";

export const loader: LoaderFunction = async ({ request }) => {
  await auth.requireUser(request, null, "/auth")
  return await auth.user(request);
};

export default function StoresRoute() {
  const user: AuthUser = useLoaderData();

  return (
    <div className="dark:bg-gray-800 min-h-screen">
      <NavBar user={user} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
