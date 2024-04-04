import baseTheme from './baseTheme.json'
import darkTheme from './darkTheme.json'
import lightTheme from './lightTheme.json'

export const combineTheme = (preference) => {
  const themeMap = {
    dark: darkTheme,
    light: lightTheme,
  }

  const combinedTheme = {
    ...baseTheme,
    ...themeMap[preference],
  }

  return combinedTheme
}
