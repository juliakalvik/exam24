export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
    theme: {
      extend: {
        colors: {
          turq: "#2a9d8f",
        },
      },
    },
    plugins: ["daisyui", "@tailwindcss/forms"],
  };
  