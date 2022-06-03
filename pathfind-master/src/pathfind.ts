import { Vector } from "./Vector.type"
import {CreateGrid} from "./Grid"
import { CalculateShortestPath } from "./AStar"

export const pathfind = (A: boolean[][], P: Vector, Q: Vector): number => {
  var grid = CreateGrid(A, P, Q)
  var result = CalculateShortestPath(grid, P, Q)

  return result
}

