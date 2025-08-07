import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
	const projects = await getCollection('projects');
	
	const pages = [
		'',
		'es/',
		'en/',
		'es/about',
		'en/about',
		'es/contact',
		'en/contact',
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	${pages
		.map((page) => {
			const path = page;
			const route = path === '' ? '' : path;
			return `
	<url>
		<loc>${site}${route}</loc>
		<lastmod>${new Date().toISOString()}</lastmod>
		<changefreq>weekly</changefreq>
		<priority>0.8</priority>
	</url>`;
		})
		.join('')}
	${projects
		.map((project) => {
			return `
	<url>
		<loc>${site}es/projects/${project.slug}</loc>
		<lastmod>${new Date().toISOString()}</lastmod>
		<changefreq>monthly</changefreq>
		<priority>0.6</priority>
	</url>`;
		})
		.join('')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
		},
	});
};
