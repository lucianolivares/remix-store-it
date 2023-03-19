import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getData } from "~/util/data";
// import { auth } from "~/util/firebase";

// export const loader = async ({ params }: LoaderArgs) => {
//   // const user = auth.currentUser;
//   const { store } = params;
//   let products: Object;
//   if (user) {
//     const { result } = await getData({
//       collection: "users",
//       id: user.uid,
//     });
//     if (result) {
//       if (store) {
//         products = result[store];
//         return json({
//           products,
//           store,
//           user
//         });
//       }
//     }
//     return json({
//       products: {},
//       store,
//       user,
//     });
//   }
//   return redirect("/auth/login");
// };

export default function StoreIndexRoute() {
  // const data = useLoaderData<typeof loader>();
  // const products: Object = data.products;
  return (
    <ul className="grid grid-cols-1 gap-2 m-4">
      {/* {Object.keys(products).length > 0 ? (
        Object.entries(products).map(([key, value], i) => (
          <p key={i} className="text-gray-100">
            {key}: {value}
          </p>
        ))
      ) : (
        <p className="text-gray-100">No hay elementos</p>
      )}
      <Link to="new-product" className="rounded-full p-2 m-auto bg-amber-400">
        Agregar
      </Link> */}
    </ul>
  );
}
