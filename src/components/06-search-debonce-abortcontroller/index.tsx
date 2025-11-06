import { useEffect, useRef, useState, type FC } from "react";

const API = "https://jsonplaceholder.typicode.com/users";

interface UserProps {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const SearchWithAbortController = () => {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const refFocus = useRef<HTMLInputElement | null>(null);
  const debounceRef = useRef<number | null>(null);

  // focus solo al montar
  useEffect(() => {
    refFocus.current?.focus();
  }, []);

  useEffect(() => {
    // controlador para cancelar el fetch
    const controller = new AbortController();
    const { signal } = controller;

    // limpiar timeout anterior
    if (debounceRef.current !== null) {
      clearTimeout(debounceRef.current);
    }

    // programar nuevo debounce
    debounceRef.current = window.setTimeout(() => {
      const fetchUsers = async () => {
        try {
          setLoading(true);
          setError(null);

          const res = await fetch(API, { signal });
          if (!res.ok) {
            throw new Error(`Error HTTP ${res.status}`);
          }
          const data: UserProps[] = await res.json();

          const filtered = data.filter((user) =>
            user.name.toLowerCase().includes(filter.toLowerCase().trim())
          );
          setUsers(filtered);
        } catch (err: any) {
          // si se abortó, no mostramos error
          if (err.name === "AbortError") return;
          setError(err.message ?? "Error desconocido");
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }, 500);

    // cleanup: cancela timeout y también el fetch
    return () => {
      if (debounceRef.current !== null) {
        clearTimeout(debounceRef.current);
      }
      controller.abort();
    };
  }, [filter]);

  return (
    <div>
      <h1>Buscador con debounce + AbortController</h1>
      <div>
        <label>Buscar Usuarios</label>
        <input
          name="search"
          ref={refFocus}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Escribe un nombre..."
        />
      </div>
      <div>
        <p>Listado de usuarios</p>
        {loading && <div>Cargando...</div>}
        {error && <div style={{ color: "red" }}>Hubo un error: {error}</div>}
        {!loading && !error && !users.length ? (
          <div>No hay coincidencias</div>
        ) : (
          users.map(({ email, id, name, phone }) => (
            <RenderUsers
              key={id}
              email={email}
              id={id}
              name={name}
              phone={phone}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchWithAbortController;

const RenderUsers: FC<UserProps> = ({ email, id, name, phone }) => {
  return (
    <div>
      <h1>identificacion: {id}</h1>
      <p>nombre: {name}</p>
      <p>email: {email}</p>
      <p>telefono: {phone}</p>
    </div>
  );
};
