import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData, useOutletContext } from "@remix-run/react";
import { useRef } from "react";
import { auth } from "~/auth.server";
import type { AuthUser } from "~/auth.server/auth-types";
import { getProductId, getStoreId } from "~/controllers.server/stores";
import { db } from "~/firebase";
import type { AppError } from "~/util/error-type";

export const action: ActionFunction = async ({ request }) => {
  const user: AuthUser = await auth.user(request);
  const form = await request.formData();
  const store: any = form.get("store");
  const name: any = form.get("name");
  const stock: number = Number(form.get("stock"));
  const minStock: number = Number(form.get("minStock"));
  if (!store || !name || !stock || !minStock) {
    return json<AppError>(
      {
        status: "validationFailure",
        errorCode: "new-product/invalid-request",
        errorMessage: "Debes completar todos los campos",
      },
      { status: 400 }
    );
  }
  const storeId = await getStoreId(user.id, store);
  if (storeId === "") {
    return json<AppError>(
      {
        status: "validationFailure",
        errorCode: "new-product/store-notfound",
        errorMessage: "No existe esta store",
      },
      { status: 400 }
    );
  }
  const productId = await getProductId(user.id, storeId, name);
  if (productId !== "") {
    return json<AppError>(
      {
        status: "validationFailure",
        errorCode: "new-product/product-exist",
        errorMessage: "Ya existe este producto",
      },
      { status: 400 }
    );
  }
  const colRef = db
    .collection("users")
    .doc(user.id)
    .collection("stores")
    .doc(storeId)
    .collection("products");
  const res = await colRef.add({
    name,
    stock,
    minStock,
  });
  if (!res) {
    return json<AppError>(
      {
        status: "validationFailure",
        errorCode: "new-product/database-error",
        errorMessage: "No se logró crear el producto",
      },
      { status: 400 }
    );
  }
  return redirect(`/stores/${store}`);
};

export default function NewProductRoute() {
  const {store} = useOutletContext<{store: string}>();
  const actionData = useActionData();
  const storeRef = useRef(null);
  const nameRef = useRef(null);
  const stockRef = useRef(null);
  const minStockRef = useRef(null);

  return (
    <div className="flex flex-col gap-4 text-gray-200">
      <p className="m-auto">Agregar Nuevo Producto</p>
      <Form method="post" className="flex flex-col text-gray-800">
        <input
          type="hidden"
          name="store"
          id="store"
          ref={storeRef}
          value={store}
        />
        <div className="flex flex-col m-auto gap-4">
          <label className="text-gray-200 m-auto">
            Nombre:
            <input
              type="text"
              name="name"
              id="name"
              ref={nameRef}
              className="text-gray-800"
            />
          </label>
          <label className="text-gray-200 m-auto">
            Stock Actual:
            <input type="number" name="stock" id="stock" ref={stockRef} />
          </label>
          <label className="text-gray-200 m-auto">
            Stock Minimo:
            <input
              type="number"
              name="minStock"
              id="minStock"
              ref={minStockRef}
            />
          </label>
          <button type="submit" className="rounded-full p-2 bg-green-500">
            Agregar
          </button>
        </div>
      </Form>
      {actionData?.errorCode && (
        <p className="text-gray-200 m-auto">
          <em>Error al agregar producto: {actionData.errorMessage}</em>
        </p>
      )}
    </div>
  );
}
