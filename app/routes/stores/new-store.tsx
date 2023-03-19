import type { ActionFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
// import { addData } from "~/util/data";
// import { auth } from "~/util/firebase";
import { badRequest } from "~/util/request.server";

// export const action: ActionFunction = async ({ request }) => {
//   const form = await request.formData()
//   const user = auth.currentUser
//   const name = form.get('name')
//   if (
//     typeof name !== "string"
//   ) {
//     return badRequest(
//       {
//         fieldErrors: null,
//         fields: null,
//         formError: `Form not submitted correctly.`,
//       }
//     )
//   }
//   const { error } = await addData({
//     collection: "users",
//     id: user?.uid,
//     data: {[name]: {}},
//   });
//   if (error) {
//     return badRequest(
//       {
//         fieldErrors: null,
//         fields: null,
//         formError: `Form not submitted correctly.`,
//       }
//     )
//   }
//   return redirect('/stores')
// }

export default function NewStoreRoute() {
  return (
    <div className="flex flex-col">
      <h1 className="text-gray-200 text-3xl m-auto">Agregar almacenamiento nuevo</h1>
      <form method="post" className="m-auto">
        <div className="flex flex-col gap-4 m-4">
          <label className="m-auto text-gray-200">
            Nombre: <input type="text" name="name" />
          </label>
          <button type="submit" className="rounded-full p-2 bg-green-500 m-auto">
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
}
