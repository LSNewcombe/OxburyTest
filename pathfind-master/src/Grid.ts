import { Vector } from "./Vector.type"
import { Node } from "./Node.type"
import { CalculateHeuristic } from "./AStar"

export function CreateGrid(BlockedNodes: boolean[][], startNode: Vector, targetNode: Vector): Node[][] {
  var grid: Node[][] = []

  for (let y = 0; y < BlockedNodes.length; y++) {
    grid.push([])
    for (let x = 0; x < BlockedNodes.length; x++) {

      if (y === startNode.Y && x === startNode.X) {
        grid[y][x] = {
          CanNavigate: CanNavigateNode(BlockedNodes, y, x),
          LocalScore: 0,
          GlobalScore: CalculateHeuristic(startNode, targetNode),
          Visited: false,
          Position: { X: x, Y: y },
          Parent: null
        }

      }
      else {
        grid[y][x] = {
          CanNavigate: CanNavigateNode(BlockedNodes, y, x),
          LocalScore: Infinity,
          GlobalScore: Infinity,
          Visited: false,
          Position: { X: x, Y: y },
          Parent: null
        }
      }
    }
  }

  return grid;
}

function CanNavigateNode(BlockedNodes: boolean[][], Ypos: number, Xpos: number): boolean {
  return BlockedNodes[Ypos][Xpos]
}