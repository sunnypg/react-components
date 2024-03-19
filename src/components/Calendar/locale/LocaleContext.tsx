import { createContext } from "react";

export interface localeContextType {
  locale: string;
}

const localeContext = createContext<localeContextType>({
  locale: "zh-CN",
});

export default localeContext