


export default function NewProductRoute() {
  return (
    <div className="flex flex-col gap-4 text-gray-200">
      <p className="m-auto">Agregar Producto:</p>
      <form method="post" className="flex flex-col">
        <div className="flex flex-col m-auto gap-4">
          <label>
            Nombre: <input type="text" name="name" className="text-gray-800"/>
          </label>
          <label >
            Stock Necesario: <input type="text" name="name" />
          </label>
          <label>
            Stock: <input type="text" name="name" />
          </label>
          <button type="submit" className="rounded-full p-2 bg-green-500">
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
}
