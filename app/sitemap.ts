import { MetadataRoute } from 'next';
import { db } from "@/src/prisma/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const projects = await db.orm.public.Project.all();
  const blogs = await db.orm.public.BlogPost.where({ published: true }).all();

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
  }));

  const blogUrls = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(),
  }));

  const routes = [
    '',
    '/about',
    '/projects',
    '/skills',
    '/experience',
    '/resume',
    '/contact',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...routes, ...projectUrls, ...blogUrls];
}
