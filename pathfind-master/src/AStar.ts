import { Vector } from "./Vector.type";
import { Node } from "./Node.type"

export function CalculateShortestPath(grid: Node[][], startNode: Vector, targetNode: Vector): number {
  let currentNode = grid[startNode.Y][startNode.X]

  if (currentNode.GlobalScore === 0)
    return 0

  let nodesNotTested: Node[] = []

  nodesNotTested.push(currentNode)

  //If we have reached the target node then the loop ends as the shortest path has been found and we no longer need to test the remaining nodes
  while (nodesNotTested.length != 0 && currentNode.Position.X != targetNode.X || currentNode.Position.Y != targetNode.Y) {

    //Sort untested nodes by the global goal, so lowest is first
    nodesNotTested.sort((a, b) => {
      return a.GlobalScore - b.GlobalScore
    })

    if (nodesNotTested.length === 0)
      break

    currentNode = nodesNotTested[0]
    //Only test a node once
    grid[currentNode.Position.Y][currentNode.Position.X].Visited = true

    //Get the neighbours of the current node
    let nodeNeighbours = GetNodeNeighours(currentNode.Position, grid)

    nodeNeighbours.forEach(nodeNeighbour => {

      if (nodeNeighbour.CanNavigate && !nodeNeighbour.Visited) {
        //Calculate the distance to the neighbour
        let distanceToNeighbour = currentNode.LocalScore + CalculateHeuristic(currentNode.Position, nodeNeighbour.Position)

        //If the distance is lower than the current local score of the neighbour then we have found a shorter path to this node
        if (distanceToNeighbour < nodeNeighbour.LocalScore) {
          //Update the parent of the neighbour to be the current node we are testing
          nodeNeighbour.Parent = currentNode.Position

          //Update the neighbours local score with the lower distance
          nodeNeighbour.LocalScore = distanceToNeighbour

          //Update the neighbours global score with the distance of the neighbour to the target
          nodeNeighbour.GlobalScore = nodeNeighbour.LocalScore + CalculateHeuristic(nodeNeighbour.Position, targetNode)
        }
        nodesNotTested.push(nodeNeighbour)

      }

    })

    nodesNotTested.splice(nodesNotTested.indexOf(currentNode), 1)

  }

  return CalculateDistanceOfPath(grid, targetNode)
}

export function CalculateHeuristic(currentPos: Vector, targetPos: Vector): number {
  return Math.abs((currentPos.X - targetPos.X) + (currentPos.Y - targetPos.Y))
}

function GetNodeNeighours(currentNodePos: Vector, grid: Node[][]): Node[] {
  let nodeNeighbours: Node[] = []

  if (currentNodePos.Y > 0)
    nodeNeighbours.push(grid[currentNodePos.Y - 1][currentNodePos.X])

  if (currentNodePos.Y < grid.length - 1)
    nodeNeighbours.push(grid[currentNodePos.Y + 1][currentNodePos.X])

  if (currentNodePos.X > 0)
    nodeNeighbours.push(grid[currentNodePos.Y][currentNodePos.X - 1])

  if (currentNodePos.X < grid.length - 1)
    nodeNeighbours.push(grid[currentNodePos.Y][currentNodePos.X + 1])

  return nodeNeighbours
}

function CalculateDistanceOfPath(grid: Node[][], targetNode: Vector): number {
  let currentNode = targetNode
  let parentNode = grid[currentNode.Y][currentNode.X].Parent
  let distance = 0

  //While there is a parent node we work backwards from the target node to the starting node and increment the total distance taken.
  //As the starting node has no parent node it will always be null
  while (parentNode) {
    currentNode = parentNode
    parentNode = grid[currentNode.Y][currentNode.X].Parent

    distance++
  }

  return distance
}