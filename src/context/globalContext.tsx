import { createContext } from "react";
import type { GlobalContexType } from "../types/interfaces";

export const GlobalContext = createContext<GlobalContexType | null>(null);
