import { Link, useOutletContext } from "@remix-run/react";
import ProductsList from "~/components/ProductsList";
import type { ProductType } from "~/controllers.server/stores";


export default function StoreIndexRoute() {
  
  const { products, store } = useOutletContext<{ products: Array<ProductType>, store: string }>();
  return (
    <div className="flex flex-col gap-4">
      <ProductsList products={products} store={store} />
      <Link to="new-product" className="rounded-full p-2 m-auto bg-teal-500">
        Agregar Producto
      </Link>
    </div>
  );
}
