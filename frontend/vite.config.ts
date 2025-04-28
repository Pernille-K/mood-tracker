import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
			registerType: "autoUpdate",
			includeAssets: [
				"favicon-assets/favicon.ico", 
				"favicon-assets/apple-touch-icon.png",
				"favicon-assets/pwa-192x192.png", 
				"favicon-assets/pwa-512x512.png",
				"favicon-assets/pwa-maskable-192x192.png",
				"favicon-assets/pwa-maskable-512x512.png",
			],
			manifest: {
				name: "Moodtracker",
				short_name: "Moody",
				start_url: "/",
				scope: "/",
				icons: [
					{
						src: "favicon-assets/pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "favicon-assets/pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "favicon-assets/pwa-maskable-192x192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "maskable",
					},
					{
						src: "favicon-assets/pwa-maskable-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],
				display: "standalone",
				background_color: "#FFFFFF",
				theme_color: "#ff91d4",
				description: "An app to track mood and corrolated things to your mood to show stats!",
			},
	server: {
		proxy: {
			"/api": "http://localhost:3000/",
		},
		host: true,
	},
});
