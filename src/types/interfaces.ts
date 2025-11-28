import type { ReactNode } from "react";

export interface GlobalContexType {
  theme: string;
  setTheme: (theme: string) => void;
}

export interface PropsChildren {
    children: ReactNode
}