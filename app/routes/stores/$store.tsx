import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { auth } from "~/auth.server";
import type { AuthUser } from "~/auth.server/auth-types";
import { getProducts, getStoreId } from "~/controllers.server/stores";


export const loader: LoaderFunction = async ({ request, params }) => {
  const user: AuthUser = await auth.user(request);
  const store = params.store || ''
  if ( !store ) {
    return redirect('/stores')
  }
  // Si no es una ID valida quizas mostrar mensaje
  const storeId = await getStoreId(user.id, store)
  if (storeId === '' ) {
    return redirect('/stores')
  }
  const products = await getProducts(user.id, storeId)
  return {
    user: user,
    store: params.store,
    products
  };
};


export default function StoreRoute() {
  const { store, products } = useLoaderData();
  return (
    <div className="flex flex-col">
      <h1 className="text-center pt-8 mb-4 text-4xl font-extrabold tracking-tight leading-none dark:text-white">
        {store}
      </h1>

      <Outlet context={{products: products, store: store}}/>
    </div>
  );
}
