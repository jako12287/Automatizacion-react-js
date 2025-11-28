import type { BotAction, BotState } from "./bot.types";

export const initialBotState: BotState = {
  session: null,
  botOnline: false,
  config: {
    aiEnabled: true,
    language: "es",
  },
};

export function botReducer(state: BotState, action: BotAction): BotState {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        session: action.payload,
      };
    }

    case "LOGOUT": {
      return {
        ...state,
        session: null,
        botOnline: false,
      };
    }

    case "TOGGLE_BOT": {
      if (!state.session) {
        return state;
      }
      return {
        ...state,
        botOnline: !state.botOnline,
      };
    }

    case "SET_LANGUAGE": {
      return {
        ...state,
        config: {
          ...state.config,
          language: action.payload,
        },
      };
    }

    case "TOGGLE_AI": {
      return {
        ...state,
        config: {
          ...state.config,
          aiEnabled: !state.config.aiEnabled,
        },
      };
    }

    default: {
      return state;
    }
  }
}
