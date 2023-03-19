import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { auth } from "~/auth.server";

export const loader: LoaderFunction = async ({request}) => {
  const user = await auth.user(request)
  if (!user) {
    return redirect('/auth/login')
  }
  return await auth.user(request);
};

export default function StoresIndexRoute() {
  const user = useLoaderData() || { username: 'foo', id: 'bar', name: 'baz', role: 'shazam' };;

  return (
    <div>
      <h1 className="text-center pt-8 mb-4 text-4xl font-bold tracking-tight leading-none dark:text-white">
        Stores de {user.name} 📚
      </h1>
      <main className="flex flex-col">
        {/* <ul className="flex flex-col mb-4 gap-2">
          {!lists.length && <h1>"Debes crear una lista"</h1>}
          {lists.map((list, index) => (
            <li key={index} className="dark:text-white self-center bg-gray-700 p-2">
              <Link to={list}>{list.toString()}</Link>
            </li>
          ))}
        </ul> */}
          <Link className='rounded-full m-auto p-4 bg-teal-500' to='new-store' >Nuevo Store</Link>
      </main>
    </div>
  );
}
