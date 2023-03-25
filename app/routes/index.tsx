import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { auth } from "~/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  // redirect if already signed in
  if (await auth.user(request)) {
    return redirect('/stores');
  } else {
    return null;
  }
};

export default function IndexRoute() {
  return (
    <main className="bg-white dark:bg-gray-900 h-screen">
        <div className="flex flex-col gap-4 justify-center mr-auto place-self-center px-4 py-8 mx-auto">
          <h1 className="mx-auto max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none dark:text-white">
            📦 Store it !
          </h1>
          <p className="mx-auto max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Ten siempre a mano tu lista del mercado
            
          </p>
          <a
            href="/auth"
            className="mx-auto inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            Iniciar
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
          <a
            href="/"
            className="mx-auto inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Ver Ejemplos
          </a>
        </div>
    </main>
  );
}
