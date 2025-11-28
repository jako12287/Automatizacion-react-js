import { useReducer, type PropsWithChildren } from "react";
import { botReducer, initialBotState } from "./bot.reducer";
import type { BotContextValue } from "./bot.types";
import { BotContext } from "./contextStore";

export function BotProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(botReducer, initialBotState);

  const value: BotContextValue = {
    dispatch,
    state,
  };

  return <BotContext.Provider value={value}>{children}</BotContext.Provider>;
}
