import { Link } from "@remix-run/react";
import type { StoreType } from "~/controllers.server/stores";

export default function StoresList({ stores }: { stores: Array<StoreType> }) {
  return (
    <ul className="grid grid-cols-1 gap-2 m-4 text-gray-100 mx-auto">
      {!stores.length && <h1>No has creado ninguna lista</h1>}
      {stores.map((store, index: any) => (
        <li key={index} className="flex justify-center px-4 py-2 bg-gray-700 rounded-md">
          <Link to={store.name}>{store.name}</Link>
        </li>
      ))}
    </ul>
  );
}
