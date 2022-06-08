import { pathfind } from "../src/pathfind"
import { Vector } from "../src/Vector.type"

describe("Pathfind", () => {
  it("start and end the same", () => {
    const A = [
      [true, true, true, true, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
    ]
    const P: Vector = { X: 0, Y: 0 }
    const Q: Vector = { X: 0, Y: 0 }

    expect(pathfind(A, P, Q)).toBe(0)
  })

  it("example case", () => {
    const A = [
      [true, true, true, true, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
    ]
    const P: Vector = { X: 1, Y: 0 }
    const Q: Vector = { X: 2, Y: 3 }

    expect(pathfind(A, P, Q)).toBe(6)
  })

  it("Straight Line", () => {
    const A = [
      [true, true, true, true, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
    ]
    const P: Vector = { X: 0, Y: 0 }
    const Q: Vector = { X: 0, Y: 4 }

    expect(pathfind(A, P, Q)).toBe(4)
  })

  it("Test 4", () => {
    const A = [
      [true, true, true, true, true],
      [false, false, true, false, true],
      [true, true, true, true, true],
      [true, true, false, false, true],
      [true, true, true, true, true],
    ]
    const P: Vector = { X: 0, Y: 0 }
    const Q: Vector = { X: 3, Y: 4 }

    expect(pathfind(A, P, Q)).toBe(9)
  })

  it("Test 5", () => {
    const A = [
      [true, true, true, true, true],
      [false, false, true, false, true],
      [true, true, true, true, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
    ]
    const P: Vector = { X: 0, Y: 0 }
    const Q: Vector = { X: 4, Y: 4 }

    expect(pathfind(A, P, Q)).toBe(8)
  })
  it("Test 6", () => {
    const A = [
      [true, true, true, true, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
      [false, true, false, true, false],
      [true, true, true, true, true],
    ]
    const P: Vector = { X: 2, Y: 0 }
    const Q: Vector = { X: 4, Y: 4 }

    expect(pathfind(A, P, Q)).toBe(8)
  }),
  it("Empty Y Axis", () => {
    const A = []
    const P: Vector = { X: 2, Y: 0 }
    const Q: Vector = { X: 4, Y: 4 }

    expect(() => pathfind(A, P, Q)).toThrow("Array cannot be empty")
  }),
  it("Empty X Axis", () => {
    const A = [[]]
    const P: Vector = { X: 2, Y: 0 }
    const Q: Vector = { X: 4, Y: 4 }

    expect(() => pathfind(A, P, Q)).toThrow("Array cannot be empty")
  }),
  it("P is out of bounds", () => {
    const A = [
      [true, true, true, true, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
      [false, true, false, true, false],
      [true, true, true, true, true],
    ]
    const P: Vector = { X: -1, Y: -1 }
    const Q: Vector = { X: 4, Y: 4 }

    expect(() => pathfind(A, P, Q)).toThrow("Starting node should be 0 or higher")
  }),
  it("Q is out of bounds", () => {
    const A = [
      [true, true, true, true, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
      [false, true, false, true, false],
      [true, true, true, true, true],
    ]
    const P: Vector = { X: 2, Y: 0 }
    const Q: Vector = { X: -1, Y: -1 }

    expect(() => pathfind(A, P, Q)).toThrow("Target node should be 0 or higher")
  }),
  it("Large Grid", () => {
    const A = [
      [true, true, true, true, true, true, true, true, true, true],
      [true, false, false, false, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
      [false, true, false, true, false, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
      [true, false, false, false, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
      [false, true, false, true, false, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
    ]
    const P: Vector = { X: 2, Y: 0 }
    const Q: Vector = { X: 4, Y: 9 }

    expect(pathfind(A, P, Q)).toBe(13)
  }),
  it("Large Grid 2", () => {
    const A = [
      [true, true, true, true, true, true, true, true, true, true],
      [true, false, false, false, true, true, false, true, true, true],
      [true, true, true, true, true, false, false, true, true, true],
      [false, true, false, true, false, true, true, true, true, true],
      [true, true, true, true, false, true, false, false, false, false],
      [true, true, true, true, true, false, true, true, true, true],
      [true, false, false, false, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
      [false, true, false, true, false, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
    ]
    const P: Vector = { X: 5, Y: 4 }
    const Q: Vector = { X: 9, Y: 9 }

    expect(pathfind(A, P, Q)).toBe(25)
  })
})
