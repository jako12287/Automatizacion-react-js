import { useBotStore } from "../../store/useBotContext";

export function BotControlPanel() {
  const { state, dispatch } = useBotStore();
  const { session, botOnline, config } = state;

  const handleLoginMock = () => {
    dispatch({
      type: "LOGIN",
      payload: {
        token: "fake-token-123",
        userName: "Johan Dev",
        userId: "user-1",
      },
    });
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <section>
      <h2>Panel del Bot</h2>

      <div>
        <p>
          Sesión:{" "}
          {session ? `${session.userName} (${session.userId})` : "No iniciada"}
        </p>
        <button onClick={handleLoginMock} disabled={!!session}>
          Login mock
        </button>
        <button onClick={handleLogout} disabled={!session}>
          Logout
        </button>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <p>Estado del bot: {botOnline ? "ONLINE" : "OFFLINE"}</p>
        <button
          onClick={() => dispatch({ type: "TOGGLE_BOT" })}
          disabled={!session}
        >
          {botOnline ? "Apagar bot" : "Encender bot"}
        </button>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <p>Idioma: {config.language}</p>
        <button
          onClick={() =>
            dispatch({
              type: "SET_LANGUAGE",
              payload: config.language === "es" ? "en" : "es",
            })
          }
        >
          Cambiar idioma
        </button>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <p>IA: {config.aiEnabled ? "Activada" : "Desactivada"}</p>
        <button onClick={() => dispatch({ type: "TOGGLE_AI" })}>
          {config.aiEnabled ? "Desactivar IA" : "Activar IA"}
        </button>
      </div>
    </section>
  );
}
