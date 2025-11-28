import { useContext } from "react";
import { BotContext } from "./contextStore";

export function useBotStore() {
  const ctx = useContext(BotContext);
  if (!ctx) throw new Error("useBotStore debe usarse dentro de <BotProvider>");

  return ctx;
}