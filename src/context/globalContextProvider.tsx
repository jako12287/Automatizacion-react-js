import { useState } from "react";
import type { GlobalContexType, PropsChildren } from "../types/interfaces";
import { GlobalContext } from "./globalContext";

export function GlobalProvider({ children }: PropsChildren) {
  const [theme, setTheme] = useState("light");

  const value: GlobalContexType = {
    theme,
    setTheme,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
