import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { FieldValue } from "firebase-admin/firestore";
import { auth } from "~/auth.server";
import type { AuthUser } from "~/auth.server/auth-types";
import { getProductId, getStoreId } from "~/controllers.server/stores";
import { db } from "~/firebase";
import type { AppError } from "~/util/error-type";

export const action: ActionFunction = async ({ request }) => {
  const user: AuthUser = await auth.user(request);
  const form = await request.formData();
  const store: any = form.get("store");
  const product: any = form.get("product");
  const _action: any = form.get("_action");

  if (!store || !product || !_action) {
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
  const productId = await getProductId(user.id, storeId, product);
  if (productId === "") {
    return json<AppError>(
      {
        status: "validationFailure",
        errorCode: "new-product/product-notfound",
        errorMessage: "No existe este producto",
      },
      { status: 400 }
    );
  }
  const docRef = db
    .collection("users")
    .doc(user.id)
    .collection("stores")
    .doc(storeId)
    .collection("products")
    .doc(productId);
  let res
  if (_action === 'add') {
    res = await docRef.update({
      stock: FieldValue.increment(1),
    });
  }
  if (_action === 'remove') {
    res = await docRef.update({
      stock: FieldValue.increment(-1),
    });
  }
  if (!res) {
    return json<AppError>(
      {
        status: "validationFailure",
        errorCode: "update-product/database-error",
        errorMessage: "No se logró actualizar el producto",
      },
      { status: 400 }
    );
  }
  return redirect(`/stores/${store}`);
};
