import { Node } from '../types'

export interface Mutator {
  (root: Node, mutationRate: number): Node
}
