import ViteReactPlugin from "@vitejs/plugin-react";

export default {
  plugins: [ViteReactPlugin()],
  optimizeDeps: {
    include: ["@mui/material"],
  },
};
