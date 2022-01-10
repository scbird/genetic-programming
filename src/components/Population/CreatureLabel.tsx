import React, { FC } from 'react'
import { Creature as CreatureModel } from '../../model'
import { Creature } from './Creature'

export interface CreatureLabelProps {
  creature: CreatureModel
  generation?: number
  onClick?: (creature: CreatureModel) => any
  showDeadStatus?: boolean
}

export const CreatureLabel: FC<CreatureLabelProps> = ({
  creature,
  generation,
  onClick,
  showDeadStatus
}) => (
  <span
    onClick={() => onClick && onClick(creature)}
    style={{ cursor: onClick && 'pointer' }}>
    <span style={{ position: 'relative', top: '0.2em', paddingRight: '0.3em' }}>
      <Creature
        creature={{
          ...creature,
          heading: 0,
          diedAt: showDeadStatus ? creature.diedAt : null
        }}
      />
    </span>
    Creature {creature.id}
    {generation !== undefined && ` (generation ${generation})`}
    {showDeadStatus && creature.diedAt !== null && ' (dead)'}
  </span>
)
