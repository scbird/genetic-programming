import { Box, Stack } from '@mui/material'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCreature } from '../../program/actions'
import { getCreatures, getCreatureScore } from '../../program/selectors'
import Title from '../Title'
import { Creature } from './Creature'

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
      <Box style={{ maxHeight: '500px', overflow: 'auto' }}>
        {creatures.map((creature) => {
          return (
            <Stack
              direction="row"
              alignItems="center"
              key={creature.id}
              onClick={() => dispatch(selectCreature(creature.id))}
              style={{ marginBottom: '0.5em', cursor: 'pointer' }}>
              <Box style={{ position: 'relative', top: '0.15em' }}>
                <Creature creature={{ ...creature, heading: 0 }} width="1em" />
              </Box>
              <span style={{ paddingLeft: '0.5em' }}>
                Creature {creature.id}: score {getCreatureScore(creature)}
              </span>
            </Stack>
          )
        })}
      </Box>
    </>
  )
}
