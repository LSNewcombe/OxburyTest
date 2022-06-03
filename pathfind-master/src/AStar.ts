import { Vector } from "./Vector.type";
import { Node } from "./Node.type"

export function CalculateShortestPath(grid: Node[][], startNode: Vector, targetNode: Vector): number {
  let currentNode = grid[startNode.y][startNode.x]

  if (currentNode.globalScore === 0)
    return 0

  let nodesNotTested: Node[] = []

  nodesNotTested.push(currentNode)

  while (nodesNotTested.length != 0) {

    //Sort untested nodes by the global goal, so lowest is first
    nodesNotTested.sort((a, b) => {
      return a.globalScore - b.globalScore
    })

    if (nodesNotTested.length === 0)
      break

    currentNode = nodesNotTested[0]
    grid[currentNode.position.y][currentNode.position.x].visited = true

    //Get the neighbours of the current node
    let nodeNeighbours = GetNodeNeighours(currentNode.position, grid)

    nodeNeighbours.forEach(nodeNeighbour => {

      if (nodeNeighbour.canNavigate && !nodeNeighbour.visited) {
        let distanceToNeighbour = currentNode.localScore + CalculateHeuristic(currentNode.position, nodeNeighbour.position)

        if (distanceToNeighbour < nodeNeighbour.localScore) {
          nodeNeighbour.parent = currentNode.position
          nodeNeighbour.localScore = distanceToNeighbour

          nodeNeighbour.globalScore = nodeNeighbour.localScore + CalculateHeuristic(nodeNeighbour.position, targetNode)
        }
        nodesNotTested.push(nodeNeighbour)

      }

    })

    nodesNotTested.splice(nodesNotTested.indexOf(currentNode), 1)

  }

  return CalculateDistanceOfPath(grid, targetNode)
}
export function CalculateHeuristic(currentPos: Vector, targetPos: Vector): number {
  return Math.abs((currentPos.x - targetPos.x) + (currentPos.y - targetPos.y))
}

function GetNodeNeighours(currentNodePos: Vector, grid: Node[][]): Node[] {
  let nodeNeighbours: Node[] = []

  if (currentNodePos.y > 0)
    nodeNeighbours.push(grid[currentNodePos.y - 1][currentNodePos.x])

  if (currentNodePos.y < grid.length - 1)
    nodeNeighbours.push(grid[currentNodePos.y + 1][currentNodePos.x])

  if (currentNodePos.x > 0)
    nodeNeighbours.push(grid[currentNodePos.y][currentNodePos.x - 1])

  if (currentNodePos.x < grid.length - 1)
    nodeNeighbours.push(grid[currentNodePos.y][currentNodePos.x + 1])

  return nodeNeighbours
}

function CalculateDistanceOfPath(grid: Node[][], targetNode: Vector): number {
  let currentNode = targetNode
  let parentNode = grid[currentNode.y][currentNode.x].parent
  let distance = 0

  while (parentNode) {
    currentNode = parentNode
    parentNode = grid[currentNode.y][currentNode.x].parent

    distance++
  }

  return distance
}