import { useTheme, themes, themeNames } from '@/context/ThemeContext';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Check, Moon, Sun } from 'lucide-react';
import styles from './ThemeSwitcher.module.css';

const ThemeSwitcher = () => {
    const { currentTheme, setTheme, themeName } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const darkThemes = [
        { key: themes.neoNoir, name: themeNames[themes.neoNoir] },
        { key: themes.deepForest, name: themeNames[themes.deepForest] },
        { key: themes.midnightLavender, name: themeNames[themes.midnightLavender] },
        { key: themes.volcanicAsh, name: themeNames[themes.volcanicAsh] },
    ];

    const lightThemes = [
        { key: themes.softSand, name: themeNames[themes.softSand] },
        { key: themes.aquaBreeze, name: themeNames[themes.aquaBreeze] },
        { key: themes.pinkSalt, name: themeNames[themes.pinkSalt] },
        { key: themes.slateMint, name: themeNames[themes.slateMint] },
    ];

    const getThemeAccent = (themeKey) => {
        const colors = {
            [themes.neoNoir]: '#ff2a6d',
            [themes.deepForest]: '#a7c957',
            [themes.midnightLavender]: '#c77dff',
            [themes.volcanicAsh]: '#e85d04',
            [themes.softSand]: '#b9895c',
            [themes.aquaBreeze]: '#0096c7',
            [themes.pinkSalt]: '#ff6b6b',
            [themes.slateMint]: '#2dd4bf',
        };
        return colors[themeKey] || 'var(--primary-accent)';
    };

    const isDarkTheme = (themeKey) => {
        return darkThemes.some(t => t.key === themeKey);
    };

    return (
        <div className={styles.container} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                <span className={styles.triggerContent}>
                    {isDarkTheme(currentTheme) ? (
                        <Moon size={18} strokeWidth={1.5} />
                    ) : (
                        <Sun size={18} strokeWidth={1.5} />
                    )}
                    <span className={styles.currentTheme}>{themeName}</span>
                </span>
                {isOpen ? (
                    <ChevronUp size={18} strokeWidth={1.5} />
                ) : (
                    <ChevronDown size={18} strokeWidth={1.5} />
                )}
            </button>

            {isOpen && (
                <div className={styles.dropdown} role="listbox">
                    <div className={styles.group}>
                        <div className={styles.groupHeader}>
                            <Moon size={14} strokeWidth={1.5} />
                            <span>Dark</span>
                        </div>
                        {darkThemes.map((theme) => (
                            <button
                                key={theme.key}
                                onClick={() => {
                                    setTheme(theme.key);
                                    setIsOpen(false);
                                }}
                                className={`${styles.option} ${currentTheme === theme.key ? styles.activeOption : ''
                                    }`}
                                role="option"
                                aria-selected={currentTheme === theme.key}
                            >
                                <span className={styles.optionContent}>
                                    <span
                                        className={styles.colorDot}
                                        style={{ backgroundColor: getThemeAccent(theme.key) }}
                                    />
                                    <span>{theme.name}</span>
                                </span>
                                {currentTheme === theme.key && (
                                    <Check size={16} strokeWidth={2} className={styles.checkmark} />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.group}>
                        <div className={styles.groupHeader}>
                            <Sun size={14} strokeWidth={1.5} />
                            <span>Light</span>
                        </div>
                        {lightThemes.map((theme) => (
                            <button
                                key={theme.key}
                                onClick={() => {
                                    setTheme(theme.key);
                                    setIsOpen(false);
                                }}
                                className={`${styles.option} ${currentTheme === theme.key ? styles.activeOption : ''
                                    }`}
                                role="option"
                                aria-selected={currentTheme === theme.key}
                            >
                                <span className={styles.optionContent}>
                                    <span
                                        className={styles.colorDot}
                                        style={{ backgroundColor: getThemeAccent(theme.key) }}
                                    />
                                    <span>{theme.name}</span>
                                </span>
                                {currentTheme === theme.key && (
                                    <Check size={16} strokeWidth={2} className={styles.checkmark} />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ThemeSwitcher;