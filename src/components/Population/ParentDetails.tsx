import { Box, Typography } from '@mui/material'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BoardState,
  Creature as CreatureModel,
  getGeneration,
  getParent,
  selectCreature,
  setGeneration
} from '../../model'
import { CreaturesList } from './CreaturesList'

export interface ParentDetailsProps {
  creature: CreatureModel
}

export const ParentDetails: FC<ParentDetailsProps> = ({ creature }) => {
  const dispatch = useDispatch()
  const parent = useSelector<BoardState, CreatureModel | undefined>((state) =>
    getParent(state, creature)
  )
  const lastGeneration = useSelector(getGeneration) - 1

  if (!parent) {
    return (
      <Typography>
        Parent: <b>(None)</b>
      </Typography>
    )
  } else {
    const fromText =
      parent.expression === creature.expression ? 'Copied from' : 'Evolved from'

    return (
      <Typography>
        {fromText}:
        <Box ml={2} mb={1} fontWeight="bold">
          <CreaturesList
            creatures={[parent]}
            generation={lastGeneration}
            onClick={() => {
              dispatch(setGeneration(lastGeneration))
              dispatch(selectCreature(parent.id))
            }}
          />
        </Box>
      </Typography>
    )
  }
}
