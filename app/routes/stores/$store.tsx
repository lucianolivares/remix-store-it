import type { LoaderArgs} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getData } from "~/util/data";
// import { auth } from "~/util/firebase";

// export const loader = async ({ params }: LoaderArgs) => {
//   // const user = auth.currentUser
//   const {store} = params
//   if (user) {
//     const {result} = await getData({
//       collection: "users",
//       id: user.uid,
//     })
//     if (result) {
//       if (store ) {
//         return json({
//           store: store,
//           user: user
//         });
//       }
//     }
//     return json({
//       store: store,
//       user: user
//     })
//   }
//   return redirect('/auth/login')
// };

export default function StoreRoute() {
  // const data = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col">
      {/* <h1 className="text-center pt-8 mb-4 text-4xl font-extrabold tracking-tight leading-none dark:text-white">{data.store}</h1> */}
      Store
      <Outlet />
    </div>
  );
}
