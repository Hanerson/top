/** @type {import('tailwindcss').Config}
module.exports = {
    content: [
        "./index.html",
        "./src/!**!/!*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        color: "#333",
                        h1: { color: "#000", fontWeight: "700" },
                        h2: { color: "#111", fontWeight: "600" },
                        h3: { color: "#222", fontWeight: "600" },
                        strong: { color: "#000" },
                    },
                }
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};*/
/** @type {import('tailwindcss').Config} */
module.exports =  {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}