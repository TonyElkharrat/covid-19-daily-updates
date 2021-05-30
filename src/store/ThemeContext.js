import React, { createContext, useReducer } from "react";

export const ThemeContext = createContext();

const initialState = {
  darkMode: false,
};

const themeReducer = (state, action) => {
  switch (action.type) {
    case "LIGHTMODE":
      return { darkMode: false };
    case "DARKMODE":
      return { darkMode: true };
    default:
      return state;
  }
};

export function ThemeProvider(props) {
  const [state, setDarkMode] = useReducer(themeReducer, initialState);

  return (
    <ThemeContext.Provider value={{ state, setDarkMode }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
