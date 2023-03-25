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
            className="shadow bg-orange-500 hover:bg-orange-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          >
            Cerrar Sessión{user.name}
          </button>
        </form>
      )}
    </header>
  );
}
