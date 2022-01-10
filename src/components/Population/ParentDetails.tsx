import { Box, Tooltip, Typography } from '@mui/material'
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
      <Tooltip
        title="This creature was randomly generated - it has no parent"
        placement="top">
        <Typography>
          Parent: <b>(None)</b>
        </Typography>
      </Tooltip>
    )
  } else {
    const fromText =
      parent.expression === creature.expression ? 'Survived' : 'Parent'
    const fromTooltip =
      parent.expression === creature.expression
        ? `This creature's score in the previous generation was one of the best, so it survived through to this generation`
        : `This creature's code has been randomly changed in some way from its parent's`

    return (
      <Typography>
        <Tooltip title={fromTooltip} placement="top">
          <span>{fromText}</span>
        </Tooltip>
        :
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
