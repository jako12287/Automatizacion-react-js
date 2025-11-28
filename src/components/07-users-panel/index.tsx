import { useState } from "react";
import { useUsers } from "../../hooks/useUser";

export default function UsersPanel() {
  const [filter, setFilter] = useState("");
  const { data, loading, error } = useUsers(filter);

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2>Usuarios del Sistema</h2>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Buscar usuario..."
        style={{ width: "100%", padding: 8, marginBottom: 16 }}
      />

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && data.length === 0 && <p>No hay resultados.</p>}

      {data.map((u) => (
        <div
          key={u.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>{u.name}</h3>
          <p>{u.email}</p>
          <p>{u.phone}</p>
        </div>
      ))}
    </div>
  );
}
