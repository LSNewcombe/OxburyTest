import { Vector } from "./Vector.type"
import {Node} from "./Node.type"
import { CalculateHeuristic } from "./AStar"

export function CreateGrid(BlockedNodes: boolean[][], startNode: Vector, targetNode: Vector): Node[][] {
    var grid: Node[][] = []
   
    for(let y = 0; y < 5; y++) {
      grid.push([])
      for(let x = 0; x < 5; x++) {
  
        if(y === startNode.y && x === startNode.x) {
          grid[y][x] = {
            canNavigate: CanNavigateNode(BlockedNodes, y, x),
            localScore: 0,
            globalScore: CalculateHeuristic(startNode, targetNode),
            visited: false,
            position: {x, y},
            parent: null
          }
  
        }
        else {
          grid[y][x] = {
            canNavigate: CanNavigateNode(BlockedNodes, y, x),
            localScore: Infinity,
            globalScore: Infinity,
            visited: false,
            position: {x, y},
            parent: null
          }
        }   
      }
    }
  
    return grid;
  }

function CanNavigateNode(BlockedNodes: boolean[][], Ypos: number, Xpos: number): boolean {
    return BlockedNodes[Ypos][Xpos]
  }