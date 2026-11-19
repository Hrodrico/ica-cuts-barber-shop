import { describe, expect, it } from "vitest";
import { activeSite } from "@/sites";
import { getProject, getProjects, getReviews } from "./data";

// Las aserciones se derivan del contenido activo para no escribir textos del negocio en el test.
const { content } = activeSite;

describe("getProjects", () => {
  it("devuelve todos los trabajos, del más reciente al más antiguo", async () => {
    const projects = await getProjects();
    const dates = projects.map((project) => project.date ?? "");

    expect(projects).toHaveLength(content.projects.length);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it("filtra los destacados", async () => {
    const featured = await getProjects({ featured: true });

    expect(featured.every((project) => project.featured)).toBe(true);
    expect(featured).toHaveLength(content.projects.filter((project) => project.featured).length);
  });

  it("no modifica el orden del contenido original", async () => {
    const original = content.projects.map((project) => project.slug);
    await getProjects();

    expect(content.projects.map((project) => project.slug)).toEqual(original);
  });
});

describe("getProject", () => {
  it("encuentra un trabajo por slug", async () => {
    for (const project of content.projects) {
      expect(await getProject(project.slug)).toMatchObject(project);
    }
  });

  it("devuelve undefined si el slug no existe", async () => {
    expect(await getProject("slug-que-no-existe")).toBeUndefined();
  });
});

describe("getReviews", () => {
  it("devuelve todas las reseñas sin filtro", async () => {
    expect(await getReviews()).toEqual(content.reviews);
  });

  it("con latest devuelve solo las N más recientes, de la más nueva a la más antigua", async () => {
    const latest = Math.max(1, content.reviews.length - 1);
    const reviews = await getReviews({ latest });
    const dates = reviews.map((review) => review.date ?? "");
    const newest = content.reviews.map((review) => review.date ?? "").sort().reverse();

    expect(reviews).toHaveLength(Math.min(latest, content.reviews.length));
    expect(dates).toEqual(newest.slice(0, reviews.length));
  });

  it("filtra por trabajo", async () => {
    for (const project of content.projects) {
      const reviews = await getReviews({ projectSlug: project.slug });
      expect(reviews.every((review) => review.projectSlug === project.slug)).toBe(true);
    }
  });
});
