import { Vector } from "./Vector.type"

export type Node = {
    localScore: number
    globalScore: number
    canNavigate: boolean
    visited: boolean
    position: Vector
    parent: Vector
}