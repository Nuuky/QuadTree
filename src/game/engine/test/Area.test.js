import Area from "../Area";

describe("Class Area", () => {
  const x = 10,
    y = 10,
    r = 8;
  let area;

  beforeEach(() => {
    area = new Area(x, y, r);
  });

  test("Area class exists", () => {
    expect(typeof Area).toBe("function");
  });

  test("new Area to have right pos and radius", () => {
    expect(area).toEqual({ x: x, y: y, r: r, rPow2: r * r });
  });

  test("area should move to {x: 0, y: 50} on update", () => {
    area.update(0, 50);
    expect(area).toEqual({ x: 0, y: 50, r: r, rPow2: r * r });
  });

  test("area should intersect rect", () => {
    const rect = {
      x: 5,
      y: 5,
      w: 20,
      h: 20
    };

    expect(area.intersects(rect)).toBeTruthy();
  });

  test("area should NOT intersect rect", () => {
    const rect = {
      x: 19,
      y: 10,
      w: 20,
      h: 20
    };

    expect(area.intersects(rect)).toBeFalsy();
  });

  test("area should contain point", () => {
    const point = {
      pos: {
        x: 15,
        y: 15
      }
    };
    expect(area.contains(point)).toBeTruthy();
  });

  test("area should NOT contain point", () => {
    const point = {
      pos: {
        x: 19,
        y: 10
      }
    };
    expect(area.contains(point)).toBeFalsy();
  });
});
