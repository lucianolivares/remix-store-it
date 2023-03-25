import { Form } from "@remix-run/react";
import type { ProductType } from "~/controllers.server/stores";

export default function ProductsList({
  products,
  store,
}: {
  products: Array<ProductType>;
  store: string;
}) {
  return (
    <ul className="grid grid-cols-1 gap-2 my-4 text-gray-200 mx-auto">
      {!products.length && (
        <h1 className="text-2xl m-auto">No tienes productos agregados</h1>
      )}
      {products.map((product) => (
        // Form dirrect to an url with productId which will update
        <li key={product.name} className="p-2 bg-gray-700 rounded-md">
          <Form
            method="post"
            action={`/stores/${store}/${product.name}`}
            className="grid grid-cols-3 p-2"
          >
            <div className="flex col-span-2 gap-1">
              <p>{product.name}</p>
              <button>
                <small
                  className={`${
                    product.minStock <= product.stock
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  [{product.minStock}]
                </small>
              </button>
            </div>
            <div className="flex flex-row gap-3 justify-center">
              <button type="submit" name="_action" value="remove">
                <svg
                  className="w-6 h-6 dark:text-red-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </button>
              <input
                name="store"
                id="store"
                value={store}
                type="hidden"
                className="bg-transparent w-fit"
              />
              <input
                name="product"
                id="product"
                value={product.name}
                type="hidden"
                className="bg-transparent w-fit"
              />
              <p>{product.stock}</p>
              {/* <input hidden name="productId" id */}
              <button type="submit" name="_action" value="add">
                <svg
                  className="w-6 h-6 dark:text-green-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </button>
            </div>
          </Form>
        </li>
      ))}
    </ul>
  );
}
