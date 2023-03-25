import { Form } from "@remix-run/react";
import type { ProductType } from "~/controllers.server/stores";

export default function ProductsList({
  products, store
}: {
  products: Array<ProductType>,
  store: string;
}) {
  return (
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
          <Form method="post" action={`/stores/${store}/${product.name}`} className="flex gap-2">
            <button type="submit" name='_action' value='remove' className="rounded bg-red-500 p-1">
              Remove
            </button>
            <input name='store' id='store' value={store} type="hidden" className="bg-transparent w-fit"/>
            <input name='product' id='product' value={product.name} type="hidden" className="bg-transparent w-fit"/>
            <p>{product.stock}</p>
            {/* <input hidden name="productId" id */}
            <button type="submit" name="_action" value='add' className="rounded bg-green-500 p-1">
              Add
            </button>
          </Form>
        </div>
      ))}
    </ul>
  );
}
