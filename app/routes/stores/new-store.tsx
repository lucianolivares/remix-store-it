import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useRef } from "react";
import { auth } from "~/auth.server";
import type { AuthUser } from "~/auth.server/auth-types";
import { getStoreId } from "~/controllers.server/stores";
import { db } from "~/firebase";
import type { AppError } from "~/util/error-type";

export const action: ActionFunction = async ({ request }) => {
  const user: AuthUser = await auth.user(request);
  const form = await request.formData();
  const store: any = form.get("store");
  if (!store) {
    return json<AppError>(
      {
        status: "validationFailure",
        errorCode: "new-store/invalid-name",
        errorMessage: "El nombre no puede estar vacio",
      },
      { status: 400 }
    );
  }
  // Crear un documento store validando que no exista uno con ese nombre
  // si no existe se crea el nuevo documento y vuelve a la pantalla anterior
  const storeId = await getStoreId(user.id, store);
  if (storeId !== "") {
    return json<AppError>(
      {
        status: "validationFailure",
        errorCode: "new-store/name-used",
        errorMessage: "Ya existe esta store",
      },
      { status: 400 }
    );
  }
  const colRef = db.collection("users").doc(user.id).collection("stores");
  const res = await colRef.add({
    name: store,
  });
  if (!res) {
    return json<AppError>(
      {
        status: "validationFailure",
        errorCode: "new-store/database-error",
        errorMessage: "No se logró crear la store",
      },
      { status: 400 }
    );
  }

  return redirect("/stores");
};

export default function NewStoreRoute() {
  const actionError = useActionData();
  const storeRef = useRef(null);
  return (
    <div className="flex flex-col gap-4 text-gray-200 w-full max-w-sm mx-auto">
      <h1 className="text-center pt-8 mb-4 text-4xl font-bold tracking-tight leading-none dark:text-gray-100">
        Agregar almacenamiento
      </h1>
      <Form method="post" className="w-full max-w-sm text-gray-800">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-100 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Nombre:
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="text"
              name="store"
              id="store"
              ref={storeRef}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
            />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              type="submit"
              className="shadow bg-teal-500 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            >
              Agregar
            </button>
          </div>
        </div>
      </Form>
      {actionError?.errorCode && (
        <p>
          <em>Crear almacenamiento fallo: {actionError.errorMessage}</em>
        </p>
      )}
    </div>
  );
}
