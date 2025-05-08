/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                jm: '"JetBrains Mono", monospace',
                st: '"Share Tech Mono", monospace',
                bj: '"Bai Jamjuree", sans-serif',
                be: 'BrigendsExpanded',
                pp: '"Poppins", sans-serif'
            }
        }
    },
    plugins: []
};
