import { Box, Typography } from '@mui/material'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BoardState,
  Creature as CreatureModel,
  getChildren,
  getGeneration,
  selectCreature,
  setGeneration
} from '../../model'
import { CreaturesList } from './CreaturesList'

export interface ChildrenDetailsProps {
  creature: CreatureModel
}

export const ChildrenDetails: FC<ChildrenDetailsProps> = ({ creature }) => {
  const dispatch = useDispatch()
  const children = useSelector<BoardState, CreatureModel[]>((state) =>
    getChildren(state, creature)
  )
  const nextGeneration = useSelector(getGeneration) + 1

  if (!children) {
    return (
      <Typography>
        <b>No children</b>
      </Typography>
    )
  } else {
    const copiedTo = children.filter(
      ({ expression }) => expression === creature.expression
    )
    const evolvedTo = children.filter(
      ({ expression }) => expression !== creature.expression
    )

    return (
      <>
        {copiedTo.length > 0 && (
          <>
            <Typography>Copied to:</Typography>
            <Box ml={2} mb={1} fontWeight="bold">
              <CreaturesList
                onClick={creatureSelected}
                creatures={copiedTo}
                generation={nextGeneration}
              />
            </Box>
          </>
        )}
        {evolvedTo.length > 0 && (
          <>
            <Typography>Evolved to:</Typography>
            <Box ml={2} mb={1} fontWeight="bold">
              <CreaturesList
                onClick={creatureSelected}
                creatures={evolvedTo}
                generation={nextGeneration}
              />
            </Box>
          </>
        )}
      </>
    )
  }

  function creatureSelected(creature: CreatureModel) {
    dispatch(setGeneration(nextGeneration))
    dispatch(selectCreature(creature.id))
  }
}
