import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useSearchParams } from "@remix-run/react";
import { auth } from "~/auth.server";
import type { AppError } from "~/util/error-type";


export const action: ActionFunction = async ({ request }) => {
  try {
    const form = await request.formData();
    // TODO mejorar la validación
    const email: any = form.get("email");
    const password: any = form.get("password");

    // TODO validar formulario
    if (!email || email.trim() === '') {
      return json<AppError>(
        {
          status: 'error',
          errorCode: 'signup/invalid-email',
          errorMessage: 'Email field cannot be empty',
        },
        { status: 400 }
      );
    }
    if (!password || password.trim() === '') {
      return json<AppError>(
        {
          status: 'error',
          errorCode: 'signup/invalid-password',
          errorMessage: 'Password field cannot be empty',
        },
        { status: 400 }
      );
    }
    return auth.login({username: email, password})
  } catch (error) {
    return json<AppError>(
      {
        status: 'error',
        errorCode: 'login/general',
        errorMessage: 'There was a problem logging in',
      },
      { status: 500 }
    );
  }
};
export const loader: LoaderFunction = async ({ request }) => {
  const user = await auth.user(request)
  if (user) {
    return redirect('/stores')
  }
  return null
};
export default function Login() {
  const actionError = useActionData();
  const [searchParams] = useSearchParams();
  const actionData = useActionData<typeof action>();
  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          {/* <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" /> */}
          📦 Store It!
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Ingresa a tu cuenta
            </h1>
            <form className="space-y-4 md:space-y-6" method="post">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Correo Electronico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="nombre@ejemplo.com"
                  defaultValue={actionData?.fields?.email}
                  aria-invalid={Boolean(actionData?.fieldErrors?.email)}
                  aria-errormessage={
                    actionData?.fieldErrors?.email
                      ? "username-error"
                      : undefined
                  }
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="text-gray-500 dark:text-gray-300">
                      Recordarme
                    </label>
                  </div>
                </div>
                <a
                  href="/"
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  ¿Olvidaste la contraseña ?
                </a>
              </div>
              {actionError?.errorCode && (
                <p>
                  <em>Login failed: {actionError.errorMessage}</em>
                </p>
              )}
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Ingresar
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                ¿No tienes cuenta aún ?{" "}
                <a
                  href="/auth/signup"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Registrar
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
