// Fallback here chooses system fonts first
const systemFontFallback = `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`;

// Import brand google fonts
export const importFixed = "@import url(https://fonts.googleapis.com/css?family=Source+Code+Pro:300,500);";
export const importVariable = "@import url(https://fonts.googleapis.com/css?family=Raleway:300,500);";
export const importBrand = "@import url(https://fonts.googleapis.com/css?family=Electrolize);";


export const familyFixedWidth = `"Source Code Pro", Consolas, "Liberation Mono", Menlo, Courier, monospace`;
export const familyVariableWidth = `"Raleway", "Trebuchet MS", ${systemFontFallback}`;
export const familyBrand = `"Electrolize", ${systemFontFallback}`;

export const weightMonochrome = 300;

export const weightColor = 500;

export function sizeForWidth(width) {
    if (width < 414) {
        return '12pt';
    }
    return '14pt';
}