import { describe, expect, it } from "vitest";
import { bookingOptions, isExternalHref } from "./booking";

const booking = {
  url: "https://agenda.test/sucursal/1",
  label: "Reservar",
  professionals: [{ name: "Ana", url: "https://agenda.test/sucursal/1/profesional/7" }],
};

describe("bookingOptions", () => {
  it("ofrece la agenda general y la de cada profesional", () => {
    expect(bookingOptions(booking)).toEqual([
      { label: "Cualquier profesional", src: booking.url },
      { label: "Ana", src: booking.professionals[0].url },
    ]);
  });

  it("no ofrece opciones sin profesionales", () => {
    expect(bookingOptions({ url: booking.url, label: "Reservar" })).toEqual([]);
  });
});

describe("isExternalHref", () => {
  it("distingue URLs absolutas de rutas internas", () => {
    expect(isExternalHref("https://agenda.test")).toBe(true);
    expect(isExternalHref("/#contacto")).toBe(false);
  });
});
