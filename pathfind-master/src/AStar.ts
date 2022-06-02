import { Vector } from "./Vector.type";
import {Node} from "./Node.type"

export function CalculateHeuristic(CurrentPos: Vector, TargetPos: Vector): number {
    return Math.abs((CurrentPos.x - TargetPos.x) + (CurrentPos.y - TargetPos.y))
  }

export function CalculateShortestPath(Grid: Node[][], P: Vector, Q:Vector): number {
    let currentNode = P
    let nodesNotTested: Vector[] = []

    nodesNotTested.push(currentNode)

    while(nodesNotTested.length!= 0 && currentNode != Q) {

      if(nodesNotTested.length === 0)
        break

      currentNode = nodesNotTested[0]
      Grid[currentNode.y][currentNode.x].visited = true
      
      //nodesNotTested.splice(nodesNotTested.indexOf(), 1)
      break;
    }

    return -1
  }
  