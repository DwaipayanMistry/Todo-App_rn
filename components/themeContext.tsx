import { Colors } from "@/constant/colors";
import { createContext, useState } from "react";
import { Appearance } from "react-native";

export const ThemeContext = createContext({});
// @ts-ignore
export const ThemeProvider = ({ children }) => {
  const [colorSchema, setColorSchema] = useState(Appearance.getColorScheme());
  const theme = colorSchema === "dark" ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider value={{ colorSchema, setColorSchema, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
