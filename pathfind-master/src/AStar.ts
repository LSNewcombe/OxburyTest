import { Vector } from "./Vector.type";
import {Node} from "./Node.type"

export function CalculateHeuristic(CurrentPos: Vector, TargetPos: Vector): number {
    return Math.abs((CurrentPos.x - TargetPos.x) + (CurrentPos.y - TargetPos.y))
  }

export function CalculateShortestPath(Grid: Node[][], P: Vector, Q:Vector): number {
    let currentNode = Grid[P.y][P.x]
    
    if(currentNode.globalScore === 0)
      return 0

    let currentNodePos = P
    let nodesNotTested: Node[] = []

    nodesNotTested.push(currentNode)

    while(nodesNotTested.length!= 0 && currentNodePos != Q) {

      //Sort untested nodes by the global goal, so lowest is first
      nodesNotTested.sort((a, b) => {
        return a.globalScore - b.globalScore
      })

      if(nodesNotTested.length === 0)
        break

      currentNode = nodesNotTested[0]
      Grid[currentNodePos.y][currentNodePos.x].visited = true

      //nodesNotTested.splice(nodesNotTested.indexOf(), 1)
      break;
    }

    return -1
  }
  
  