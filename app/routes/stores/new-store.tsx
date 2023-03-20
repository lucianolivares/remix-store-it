import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useRef } from "react";
import { auth } from "~/auth.server";
import type { AuthUser } from "~/auth.server/auth-types";
import { db } from "~/firebase";
import type { AppError } from "~/util/error-type";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const user: AuthUser = await auth.user(request);
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
  const storePath = `stores.${store}`;
  const docRef = db.collection("users").doc(user.id);
  const res = await docRef.update({
    [storePath]: {},
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
    <div className="flex flex-col">
      <h1 className="text-gray-200 text-3xl m-auto">
        Agregar almacenamiento nuevo
      </h1>
      <Form method="post" className="m-auto">
        <div className="flex flex-col gap-4 m-4">
          <label className="m-auto text-gray-200">
            Nombre: <input type="text" name="store" id="store" ref={storeRef} />
          </label>
          <button
            type="submit"
            className="rounded-full p-2 bg-green-500 m-auto"
          >
            Agregar
          </button>
          {actionError?.errorCode && (
            <p>
              <em>Login failed: {actionError.errorMessage}</em>
            </p>
          )}
        </div>
      </Form>
    </div>
  );
}
