import { Link } from "@remix-run/react";
import type { AuthUser } from "~/auth.server/auth-types";

export default function NavBar( {user}: {user: AuthUser}) {
  return (
    <header className="flex justify-between px-4 dark:bg-gray-900 align-middle">
      <Link to="/" className="text-2xl self-center font-bold text-gray-200 p-4">
        <h1>📦 Store it!</h1>
      </Link>
      {user && (
        <form action="/auth/logout" method="post" className="p-4">
          <button
            type="submit"
            className="rounded-full bg-orange-500 p-2 text-gray-100"
          >
            Cerrar Sessión{user.name}
          </button>
        </form>
      )}
    </header>
  );
}
