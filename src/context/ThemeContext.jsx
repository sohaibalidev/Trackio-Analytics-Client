import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
    neoNoir: 'neo-noir',
    deepForest: 'deep-forest',
    midnightLavender: 'midnight-lavender',
    volcanicAsh: 'volcanic-ash',

    softSand: 'soft-sand',
    aquaBreeze: 'aqua-breeze',
    pinkSalt: 'pink-salt',
    slateMint: 'slate-mint',
};

export const themeNames = {
    [themes.neoNoir]: 'Neo Noir',
    [themes.deepForest]: 'Deep Forest',
    [themes.midnightLavender]: 'Midnight Lavender',
    [themes.volcanicAsh]: 'Volcanic Ash',
    [themes.softSand]: 'Soft Sand',
    [themes.aquaBreeze]: 'Aqua Breeze',
    [themes.pinkSalt]: 'Pink Salt',
    [themes.slateMint]: 'Slate & Mint',
};

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState(() => {
        const savedTheme = localStorage.getItem('app-theme');
        return savedTheme || themes.neoNoir;
    });

    useEffect(() => {
        const root = document.documentElement;

        root.classList.remove(
            themes.neoNoir,
            themes.deepForest,
            themes.midnightLavender,
            themes.volcanicAsh,
            themes.softSand,
            themes.aquaBreeze,
            themes.pinkSalt,
            themes.slateMint
        );

        root.classList.add(currentTheme);

        localStorage.setItem('app-theme', currentTheme);
    }, [currentTheme]);

    const setTheme = (themeKey) => {
        if (Object.values(themes).includes(themeKey)) {
            setCurrentTheme(themeKey);
        }
    };

    const toggleDarkLight = () => {
        const darkThemes = [
            themes.neoNoir,
            themes.deepForest,
            themes.midnightLavender,
            themes.volcanicAsh
        ];
        const lightThemes = [
            themes.softSand,
            themes.aquaBreeze,
            themes.pinkSalt,
            themes.slateMint
        ];

        if (darkThemes.includes(currentTheme)) {
            const index = darkThemes.indexOf(currentTheme);
            setCurrentTheme(lightThemes[index % lightThemes.length]);
        } else {
            const index = lightThemes.indexOf(currentTheme);
            setCurrentTheme(darkThemes[index % darkThemes.length]);
        }
    };

    const isDark = () => {
        const darkThemes = [
            themes.neoNoir,
            themes.deepForest,
            themes.midnightLavender,
            themes.volcanicAsh
        ];
        return darkThemes.includes(currentTheme);
    };

    const value = {
        currentTheme,
        setTheme,
        toggleDarkLight,
        isDark: isDark(),
        themeName: themeNames[currentTheme],
        themes,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};