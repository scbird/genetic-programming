import React, { FC } from 'react'
import { Creature as CreatureModel } from '../../model'
import { CreatureLabel } from './CreatureLabel'

export interface CreaturesListProps {
  creatures: readonly CreatureModel[]
  generation?: number
  onClick: (creature: CreatureModel) => any
}

export const CreaturesList: FC<CreaturesListProps> = ({
  creatures,
  generation,
  onClick
}) => {
  return (
    <>
      {creatures.map((creature) => (
        <div style={{ marginBottom: '0.1em' }} key={creature.id}>
          <CreatureLabel
            creature={creature}
            generation={generation}
            onClick={onClick}
          />
        </div>
      ))}
    </>
  )
}
