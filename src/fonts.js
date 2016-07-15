// Fallback here chooses system fonts first
const systemFontFallback = `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`;

function sizeForWidth(width) {
    if (width < 414) {
        return '12px';
    }
    return '14px';
}

export const fonts = {
    fixed: {
        cssImport: "@import url(https://fonts.googleapis.com/css?family=Source+Code+Pro:300,500);",
        weightMonochrome: 300,
        weightColor: 500,
        sizeForWidth: sizeForWidth,
        family: `"Source Code Pro", Consolas, "Liberation Mono", Menlo, Courier, monospace` // Font fallback chosen to keep presentation on places like GitHub where Content Security Policy prevents inline SRC
    },
    variable: {
        cssImport: "@import url(https://fonts.googleapis.com/css?family=Raleway:400,500);",
        weightMonochrome: 400,
        weightColor: 500,
        sizeForWidth: sizeForWidth,
        family: `"Raleway", "Trebuchet MS", ${systemFontFallback}`
    },
    brand: {
        cssImport: "@import url(https://fonts.googleapis.com/css?family=Electrolize);",
        weightMonochrome: 400,
        weightColor: 400,
        sizeForWidth: sizeForWidth,
        family: `"Electrolize", ${systemFontFallback}`
    }
}
