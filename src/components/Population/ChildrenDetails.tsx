import { Box, Tooltip, Typography } from '@mui/material'
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
    const survivedAs = children.filter(
      ({ expression, parentId }) =>
        expression === creature.expression && creature.id === parentId
    )
    const evolvedTo = children.filter((child) => !survivedAs.includes(child))

    return (
      <>
        {survivedAs.length > 0 && (
          <>
            <Typography>
              <Tooltip
                placement="top"
                title={`This creature's score was one of the best, so it lives on to the next generation`}>
                <span>Survives as:</span>
              </Tooltip>
            </Typography>
            <Box ml={2} mb={1} fontWeight="bold">
              <CreaturesList
                onClick={creatureSelected}
                creatures={survivedAs}
                generation={nextGeneration}
              />
            </Box>
          </>
        )}
        {evolvedTo.length > 0 && (
          <>
            <Typography>
              <Tooltip
                placement="top"
                title={`The code of these creatures is all based on this creature's code, but each has some random changes`}>
                <span>Children:</span>
              </Tooltip>
            </Typography>
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
