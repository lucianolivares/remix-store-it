import type { ActionFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { useRef } from "react";
import { auth } from "~/auth.server";
import { users } from "~/controllers.server";
import type { AppError } from "~/util/error-type";

export const action: ActionFunction = async ({ request }) => {
  try {
    const form = await request.formData();

    // TODO: implement proper form validation
    const email: any = form.get("email");
    const password: any = form.get("password");
    const confirm: any = form.get("confirm");

    // TODO: form validation
    if (!email || email.trim() === "") {
      return json<AppError>(
        {
          status: "validationFailure",
          errorCode: "signup/invalid-email",
          errorMessage: "Email field cannot be empty",
        },
        { status: 400 }
      );
    }

    if (
      !password ||
      !confirm ||
      password.trim() === "" ||
      password !== confirm
    ) {
      return json<AppError>(
        {
          status: "validationFailure",
          errorCode: "signup/invalid-password",
          errorMessage: "Password fields cannot be empty and must match",
        },
        { status: 400 }
      );
    }

    // TODO: CSRF check

    // Create the account
    const res = await (
      await auth.createAccount({ username: email, password })
    ).json();
    // Create the user in the database
    await users.create({
      id: res.user.uid,
      role: "guest",
      username: res.user.email,
      preferences: { theme: "dark" },
    });
    // Redirect to the home/login page
    return redirect("/auth");
  } catch (error) {
    console.error("signup/general", `Could not create the account - ${error}`);
    return json<AppError>(
      {
        status: "error",
        errorCode: "signup/general",
        errorMessage: "There was a problem creating the account",
      },
      { status: 500 }
    );
  }
};

export default function SignUp() {
  const actionError = useActionData();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);
  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          {/* <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" /> */}
          📦 Store It!
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Crear cuenta
            </h1>
            <Form className="space-y-4 md:space-y-6" method="post">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  ref={emailRef}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  ref={passwordRef}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm password
                </label>
                <input
                  type="confirm"
                  name="confirm"
                  id="confirm"
                  ref={confirmRef}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label className="font-light text-gray-500 dark:text-gray-300">
                    Acepto los{" "}
                    <Link
                      to="/"
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Crear cuenta
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Ya tienes una cuenta?{" "}
                <Link
                  to="/auth"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Ingresar Aqui
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
