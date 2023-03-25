import { Link, useOutletContext } from "@remix-run/react";

type ProductType = {
  name: string;
  stock: string;
  minStock: string;
};

export default function StoreIndexRoute() {
  const { products } = useOutletContext<{ products: Array<ProductType> }>();
  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-2 text-gray-200">
        {!products.length && (
          <h1 className="text-2xl m-auto">No tienes productos agregados</h1>
        )}
        {products.map((product) => (
          // Form dirrect to an url with productId which will update
          <div key={product.name} className="flex gap-4 m-auto">
            <p>
              {product.name}[{product.minStock}]{" "}
            </p>
            <button type="submit" className="rounded bg-red-500 p-1">
              Remove
            </button>
            <strong>{product.stock}</strong>
            {/* <input hidden name="productId" id */}
            <button type="submit" className="rounded bg-green-500 p-1">
              Add
            </button>
          </div>
        ))}
      </ul>
      <Link to="new-product" className="rounded-full p-2 m-auto bg-amber-400">
        Agregar Producto
      </Link>
    </div>
  );
}
