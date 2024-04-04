import React from 'react';
import { combineTheme } from '../theme/combineTheme';

const DEFAULT_THEME = 'dark'
const ThemePreferenceContext = React.createContext();

const useThemePreference = () => React.useContext(ThemePreferenceContext)

export const useTheme = () => {
  const { themePreference, setThemePreference } = useThemePreference()
  return {
    themePreference,
    setThemePreference,
    theme: combineTheme(themePreference)
  }
}

export const ThemePreferenceContextProvider = ({ children }) => {
  const [themePreference, setThemePreference] = React.useState(DEFAULT_THEME)

  return <ThemePreferenceContext.Provider value={{themePreference, setThemePreference}}>
    {children}
  </ThemePreferenceContext.Provider>
}


