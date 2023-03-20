import { Link, useOutletContext } from "@remix-run/react";

export default function StoreIndexRoute() {
  const products: object = useOutletContext();
  const productNames = Object.keys(products) || [];
  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-2 text-gray-200">
        {!productNames.length && <h1>"Debes crear una lista"</h1>}
        {Object.entries(products).map(([product, info], index) => (
          <p key={index} className="m-auto">
            {product}[{info.needed}] <strong>{info.stock}</strong>
          </p>
        ))}
      </ul>
      <Link to="new-product" className="rounded-full p-2 m-auto bg-amber-400">
        Agregar Producto
      </Link>
    </div>
  );
}
