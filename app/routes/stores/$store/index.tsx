import { Link, useOutletContext } from "@remix-run/react";
import ProductsList from "~/components/ProductsList";
import type { ProductType } from "~/controllers.server/stores";


export default function StoreIndexRoute() {
  
  const { products, store } = useOutletContext<{ products: Array<ProductType>, store: string }>();
  return (
    <div className="flex flex-col gap-4">
      <ProductsList products={products} store={store} />
      <Link to="new-product" className="mx-auto shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
        Agregar Producto
      </Link>
    </div>
  );
}
