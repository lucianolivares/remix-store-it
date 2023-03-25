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
  const { store } = useOutletContext<{ store: string }>();
  const actionData = useActionData();
  const storeRef = useRef(null);
  const nameRef = useRef(null);
  const stockRef = useRef(null);
  const minStockRef = useRef(null);

  return (
    <div className="flex flex-col gap-4 text-gray-100 w-full max-w-sm mx-auto">
      <p className="mx-auto">Agregar nuevo producto</p>
      <Form method="post" className="w-full max-w-sm text-gray-800">
        <input
          type="hidden"
          name="store"
          id="store"
          ref={storeRef}
          value={store}
        />

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-100 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Nombre:
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="text"
              name="name"
              id="name"
              ref={nameRef}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-100 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Stock Actual:
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="number"
              name="stock"
              id="stock"
              ref={stockRef}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-100 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Stock Minimo:
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="number"
              name="minStock"
              id="minStock"
              ref={minStockRef}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              type="submit"
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            >
              Agregar
            </button>
          </div>
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
