const request = require("supertest");
const { app, invalidateCdnCache } = require("../src/app");

describe("StreamPeru backend", () => {
  test("GET /health responde 200", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
  });

  test("GET /catalog devuelve el catalogo completo", async () => {
    const res = await request(app).get("/catalog");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(3);
  });

  test("GET /catalog/:id devuelve 404 si no existe", async () => {
    const res = await request(app).get("/catalog/999");
    expect(res.statusCode).toBe(404);
  });

  test("invalidateCdnCache devuelve las rutas invalidadas", () => {
    const result = invalidateCdnCache(["/catalog", "/catalog/1"]);
    expect(result.invalidated).toEqual(["/catalog", "/catalog/1"]);
    expect(result.requestId).toMatch(/^cdn-inv-/);
  });
});
