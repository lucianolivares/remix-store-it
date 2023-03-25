import { Link } from "@remix-run/react";
import type { StoreType } from "~/controllers.server/stores";

export default function StoresList({ stores }: { stores: Array<StoreType> }) {
  return (
    <ul className="flex flex-col mb-4 gap-2">
      {!stores.length && <h1>No has creado ninguna lista</h1>}
      {stores.map((store, index: any) => (
        <li key={index} className="dark:text-white self-center bg-gray-600 p-2">
          <Link to={store.name}>{store.name}</Link>
        </li>
      ))}
    </ul>
  );
}
