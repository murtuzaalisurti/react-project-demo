import { Theme, createTheme } from "@mui/material";
import { ReactNode, createContext, useMemo, useState } from "react";
import { customThemeObj } from "../theme/custom";

export type Ttheme = "light" | "dark"

export interface IThemeContext {
    themeMode: Ttheme,
    setThemeMode: () => void,
    MUITheme: Theme
}

const initialContextValue: IThemeContext = {
    themeMode: "light",
    setThemeMode: () => { },
    MUITheme: createTheme()
}

const getContext = () => {
    const [themeMode, setTheme] = useState<Ttheme>(initialContextValue.themeMode)
    const MUITheme = createTheme(customThemeObj(themeMode))

    const setThemeMode = () => {
        setTheme((prev: Ttheme) => {
            return prev === "light" ? "dark" : "light"
        });
    }

    return { themeMode, setThemeMode, MUITheme }
}

export const ThemeContext = createContext(initialContextValue)

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
    const themeContext = getContext();
    return (
        <ThemeContext.Provider value={themeContext}>
            {children}
        </ThemeContext.Provider>
    )
}

