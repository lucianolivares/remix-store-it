


export default function NewProductRoute() {
  return (
    <div className="flex flex-col">
      <p>Agregar Producto:</p>
      <form method="post">
        <div>
          <label>
            Nombre: <input type="text" name="name" />
          </label>
          <label>
            Cantidad: <input type="text" name="name" />
          </label>
          <label>
            Stock: <input type="text" name="name" />
          </label>
        </div>
        <div>
          <button type="submit" className="rounded-full p-2 bg-green-500">
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
}
