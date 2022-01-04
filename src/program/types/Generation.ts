import { Creature } from './Creature'

export type GenerationCreature = Pick<
  Creature,
  'expression' | 'creaturesEaten' | 'plantsEaten'
>

export interface Generation {
  creatures: GenerationCreature[]
  totalScore: number
}
