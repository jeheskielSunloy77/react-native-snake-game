import React, { createContext, useState } from 'react'
import { useColorScheme } from 'react-native'
import { Theme } from '../types/types'

interface ThemeContext {
	theme: Theme
	toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContext>({} as ThemeContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const initialTheme = useColorScheme() as Theme
	const [theme, setTheme] = useState<Theme>(initialTheme)
	const toggleTheme = () =>
		setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export const useThemeContext = () => React.useContext(ThemeContext)
