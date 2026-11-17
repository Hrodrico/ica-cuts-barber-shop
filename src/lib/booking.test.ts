import { describe, expect, it } from "vitest";
import { bookingHref, bookingPath, findProfessional, isExternalHref, professionalPath } from "./booking";

const booking = {
  url: "https://agenda.test/sucursal/1",
  label: "Reservar",
  professionals: [{ slug: "ana", name: "Ana", url: "https://agenda.test/sucursal/1/profesional/7" }],
};

describe("bookingHref", () => {
  it("lleva a la agenda externa si no va embebida", () => {
    expect(bookingHref(booking)).toBe(booking.url);
  });

  it("lleva a la página interna si va embebida", () => {
    expect(bookingHref({ ...booking, embed: true })).toBe(bookingPath);
  });
});

describe("professionalPath", () => {
  it("cuelga de la ruta de reservas", () => {
    expect(professionalPath("ana")).toBe("/reservar/ana");
  });
});

describe("findProfessional", () => {
  it("encuentra al profesional por slug", () => {
    expect(findProfessional(booking, "ana")?.name).toBe("Ana");
  });

  it("devuelve undefined si no existe o no hay profesionales", () => {
    expect(findProfessional(booking, "otro")).toBeUndefined();
    expect(findProfessional({ url: booking.url, label: "Reservar" }, "ana")).toBeUndefined();
  });
});

describe("isExternalHref", () => {
  it("distingue URLs absolutas de rutas internas", () => {
    expect(isExternalHref("https://agenda.test")).toBe(true);
    expect(isExternalHref("/reservar")).toBe(false);
  });
});
