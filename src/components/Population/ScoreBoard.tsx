import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCreatures, getCreatureScore, selectCreature } from '../../model'
import Title from '../Title'
import { CreatureLabel } from './CreatureLabel'

export const ScoreBoard: FC = () => {
  const dispatch = useDispatch()
  const creatures = [...useSelector(getCreatures)].sort((a, b) => {
    const aScore = getCreatureScore(a)
    const bScore = getCreatureScore(b)

    if (aScore !== bScore) {
      return bScore - aScore
    } else {
      return a.id - b.id
    }
  })

  return (
    <>
      <Title color="black">Scores</Title>
      {creatures.map((creature) => (
        <div
          style={{ marginBottom: '0.1em', cursor: 'pointer' }}
          onClick={() => dispatch(selectCreature(creature.id))}
          key={creature.id}>
          <CreatureLabel creature={creature} showDeadStatus />: score{' '}
          {getCreatureScore(creature)}
        </div>
      ))}
    </>
  )
}
