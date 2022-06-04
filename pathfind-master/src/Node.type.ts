import { Vector } from "./Vector.type"

export type Node = {
    LocalScore: number
    GlobalScore: number
    CanNavigate: boolean
    Visited: boolean
    Position: Vector
    Parent: Vector
}