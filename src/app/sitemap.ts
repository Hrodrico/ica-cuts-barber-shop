import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getProjects } from "@/lib/data";
import { bookingPath, professionalPath } from "@/lib/booking";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [{ url: site.url, priority: 1 }];

  const { booking } = site.contact;
  if (booking?.embed) {
    entries.push(
      { url: `${site.url}${bookingPath}`, priority: 0.9 },
      ...(booking.professionals ?? []).map((professional) => ({
        url: `${site.url}${professionalPath(professional.slug)}`,
        priority: 0.7,
      })),
    );
  }

  if (site.sections.projects) {
    const projects = await getProjects();
    entries.push(
      { url: `${site.url}/trabajos`, priority: 0.8 },
      ...projects.map((project) => ({
        url: `${site.url}/trabajos/${project.slug}`,
        lastModified: project.date,
        priority: 0.6,
      })),
    );
  }

  return entries;
}
