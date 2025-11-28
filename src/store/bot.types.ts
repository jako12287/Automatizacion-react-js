import type { Dispatch, ReactNode } from "react";

export interface Session {
  token: string;
  userName: string;
  userId: string;
}

export type Language = "es" | "en";

export interface BotConfig {
  aiEnabled: boolean;
  language: Language;
}

export interface BotState {
  session: Session | null;
  botOnline: boolean;
  config: BotConfig;
}

export interface PropsWithChildren {
    children: ReactNode
}

export interface BotContextValue {
  state: BotState;
  dispatch: Dispatch<BotAction>;
}

export type BotAction =
  |{ type: "LOGIN"; payload: Session }
  | { type: "LOGOUT" }
  | { type: "TOGGLE_BOT" }
  | { type: "SET_LANGUAGE"; payload: Language }
  | { type: "TOGGLE_AI" };

  
