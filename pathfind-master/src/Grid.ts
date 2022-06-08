import { Vector } from "./Vector.type"
import { Node } from "./Node.type"
import { CalculateHeuristic } from "./AStar"

export function CreateGrid(BlockedNodes: boolean[][], startNode: Vector, targetNode: Vector): Node[][] {
  var grid: Node[][] = []
  
  if(startNode.X < 0 || startNode.Y < 0)
    throw new Error("Starting node should be 0 or higher")
  
  if(targetNode.X < 0 || targetNode.Y < 0)
    throw new Error("Target node should be 0 or higher")

  if(BlockedNodes.length === 0|| BlockedNodes[startNode.Y].length === 0)
    throw new Error("Array cannot be empty")

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