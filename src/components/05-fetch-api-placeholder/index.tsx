import { useEffect, useState, type FC } from "react";

const API = "https://jsonplaceholder.typicode.com/users";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const FetchApi = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fecthusers = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(API, { signal });

        if (!res.ok) {
          throw new Error(`Error HTTP ${res.status}`);
        }

        const data: User[] = await res.json();

        const filtered = data.filter((u) =>
          u.name.toLowerCase().includes(filter.toLowerCase().trim())
        );

        setUsers(filtered);
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message ?? "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fecthusers();
  }, [filter]);

  return (
    <div>
      <h1>Listado de usuarios</h1>

      <div className="group">
        <label>Search for user</label>
        <input
          name="search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Escribe un nombre..."
        />
      </div>

      {loading && <div>Cargando...</div>}
      {error && <div style={{ color: "red" }}>Hubo un error: {error}</div>}

      {!loading && !error && (
        <div>
          {!users.length ? (
            <div>No se encuentran coincidencias</div>
          ) : (
            users.map((u) => (
              <RenderUser
                key={u.id}
                id={u.id}
                name={u.name}
                email={u.email}
                phone={u.phone}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default FetchApi;

const RenderUser: FC<User> = ({ email, id, name, phone }) => {
  return (
    <div className="userCard">
      <h2>Nombre: {name}</h2>
      <h3>Correo: {email}</h3>
      <h3>Telefono: {phone}</h3>
      <p>id:{id}</p>
    </div>
  );
};
