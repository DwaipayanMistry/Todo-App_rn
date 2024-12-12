const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';
export interface Theme {
    text: string;
    background: string;
    headerBackground: string;
    tint: string;
    icon: string;
    tabIconDefault: string;
    tabIconSelected: string;
}
export const Colors = {
    light: {
        text: '#11181C',
        background: '#fff',
        headerBackground: '#fff',
        tint: tintColorLight,
        icon: '#687076',
        tabIconDefault: '#687076',
        tabIconSelected: tintColorLight,
    },
    dark: {
        text: '#ECEDEE',
        background: '#2B2B2B',
        headerBackground: '#2B2B2B',

        tint: tintColorDark,
        icon: '#9BA1A6',
        tabIconDefault: '#9BA1A6',
        tabIconSelected: tintColorDark,
    },
};
