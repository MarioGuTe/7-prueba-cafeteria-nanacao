const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("Obteniendo un 200 tipo de dato", async () => {
    const { statusCode: status, body: cafes } = await request(server)
      .get("/cafes")
      .send();
    expect(status).toBe(200);
    expect(cafes).toBeInstanceOf(Array);
  });

  it("Obteniendo un 404 al intentar eliminar un café", async () => {
    const jwt = "token";
    const cafeId = 2462347;
    const { statusCode: status } = await request(server)
      .delete(`/productos/${cafeId}`)
      .set("Authorization", jwt)
      .send();

    expect(status).toBe(404);
  });
  it("Obteniendo un 201 cuando se agrega un nuevo café", async () => {
    const id = Math.floor(Math.random() * 999);
    const cafe = { id, nombre: "Nuevo cafe" };
    const { statusCode: status } = await request(server)
      .post("/cafes")
      .send(cafe);
    expect(status).toBe(201);
  });
  it("Obteniendo un status code 400 al intentar actualizar un café", async () => {
    const idInexistente = 9.9;
    const cafe = { id: 7, nombre: "frapuccino" };
    const { statusCode: status } = await request(server)
      .put(`/cafes/${idInexistente}`)
      .send(cafe);
    expect(status).toBe(400);
  });
});
