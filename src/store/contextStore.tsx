import { createContext } from "react";
import type { BotContextValue } from "./bot.types";

export const BotContext = createContext<BotContextValue | null>(null);
