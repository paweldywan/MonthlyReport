import { createContext } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';

export const ThemeContext = createContext<{
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
}>({
    mode: 'system',
    setMode: () => {}
});

export type { ThemeMode };
