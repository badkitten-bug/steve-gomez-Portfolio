import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	integrations: [react(), tailwind(), mdx()],
	site: 'https://kittensg.netlify.app',
	base: '/',
	build: {
		assets: 'assets',
	},
	vite: {
		build: {
			rollupOptions: {
				output: {
					manualChunks: {
						vendor: ['react', 'react-dom'],
					},
				},
			},
		},
	},
});
