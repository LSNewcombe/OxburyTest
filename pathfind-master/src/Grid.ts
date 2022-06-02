import { Vector } from "./Vector.type"
import {Node} from "./Node.type"
import { CalculateHeuristic } from "./AStar"

export function CreateGrid(BlockedNodes: boolean[][], P: Vector, Q: Vector): Node[][] {
    var grid: Node[][] = []
  
  
    for(let y = 0; y < 5; y++) {
      grid.push([])
      for(let x = 0; x < 5; x++) {
  
        if(y === P.y && x === P.x) {
          grid[y][x] = {
            canNavigate: CanNavigateNode(BlockedNodes, y, x),
            localScore: 0,
            globalScore: CalculateHeuristic(P, Q),
            visited: false
          }
  
        }
        else {
          grid[y][x] = {
            canNavigate: CanNavigateNode(BlockedNodes, y, x),
            localScore: Infinity,
            globalScore: Infinity,
            visited: false
          }
        }   
      }
    }
  
    return grid;
  }

function CanNavigateNode(BlockedNodes: boolean[][], Ypos: number, Xpos: number): boolean {
    return BlockedNodes[Ypos][Xpos]
  }