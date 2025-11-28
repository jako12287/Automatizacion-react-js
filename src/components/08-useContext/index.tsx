import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/globalContext";

const ContextUse = () => {
  const ctx = useContext(GlobalContext);

  useEffect(() => {
    console.log(ctx?.theme);
  }, [ctx]);

  if (!ctx) {
    throw new Error("Debes usar ThemeSwitcher dentro de GlobalProvider");
  }

  return (
    <div
      style={{
        backgroundColor: `${ctx.theme === "dark" ? "black" : "white"}`,
        color: `${ctx.theme !== "dark" ? "black" : "white"}`,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "all",
        transitionDuration: "7s",
        transitionBehavior:"revert"
      }}
    >
      CONTEXT
      <button
        onClick={() => ctx.setTheme(ctx.theme === "light" ? "dark" : "light")}
      >
        Cambiar tema
      </button>
    </div>
  );
};
export default ContextUse;
