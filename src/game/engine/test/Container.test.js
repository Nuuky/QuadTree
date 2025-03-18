import Container from "../Container";
import {random} from "../../utils"

describe("Class Container", () => {
  const x = 10,
    y = 10,
    w = 10,
    h = 10;
  let container;

  beforeEach(() => {
    container = new Container(x, y, w, h);
  });

  test("Container class exists", () => {
    expect(typeof Container).toBe("function");
  });

  test("new Container to have right props", () => {
    expect(container).toEqual({ x: x, y: y, w: w, h: h });
  });

  test("container should intersect area", () => {
    const area = {
      x: 5,
      y: 5,
      r: 10
    };

    expect(container.intersects(area)).toBeTruthy();
  });

  test("container should NOT intersect area", () => {
    const area = {
      x: 31,
      y: 5,
      r: 10
    };

    expect(container.intersects(area)).toBeFalsy();
  });

  test("container should contain point", () => {
    const point = {
      pos: {
        x: 15,
        y: 15
      }
    };
    expect(container.contains(point)).toBeTruthy();
  });

  test("container should NOT contain point", () => {
    const point = {
      pos: {
        x: 21,
        y: 10
      }
    };
    expect(container.contains(point)).toBeFalsy();
  });

  describe("Container with multiple points", () => {
    let container;

    beforeEach(() => {
      container = new Container(0, 0, 150, 150);
    });

    test("should pass the test", () => {
      const points = []
      for (let i = 0; i < 100; i++) {
        const p = {
          pos: {
            x: random(0, 100),
            y: random(0, 100),
          }
        }
        points.push(p)
      }

      const results = []
      points.forEach(p => {
        results.push(container.contains(p))
      })
      const allTrue = !results.some(r => !r)
      expect(allTrue).toBeTruthy()
    })
    
  })
});
