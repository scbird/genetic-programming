import { Box, Tooltip, Typography, useTheme } from '@mui/material'
import React, { FC } from 'react'
import {
  Creature as CreatureModel,
  CREATURE_SCORE,
  getCreatureScore,
  PLANT_SCORE
} from '../../model'
import { ChildrenDetails } from './ChildrenDetails'
import { HighlightedExpression } from './HighlightedExpression'
import { ParentDetails } from './ParentDetails'

export interface CreatureDetailsProps {
  creature: CreatureModel
}

export const CreatureDetails: FC<CreatureDetailsProps> = ({ creature }) => {
  const theme = useTheme()

  return (
    <>
      <Box mb={2}>
        <Typography>
          Plants eaten: <b>{creature.plantsEaten}</b>
        </Typography>
        <Typography>
          Creatures eaten: <b>{creature.creaturesEaten}</b>
        </Typography>
        <Typography>
          <Tooltip
            title={`Score = ${PLANT_SCORE} * plants eaten + ${CREATURE_SCORE} * creatures eaten`}>
            <span>
              Score: <b>{getCreatureScore(creature)}</b>
            </span>
          </Tooltip>
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography>Code:</Typography>
        <Box
          border={`1px solid ${theme.palette.grey['400']}`}
          style={{ padding: '0.3em', maxHeight: '25em', overflow: 'auto' }}>
          <Typography>
            <HighlightedExpression expression={creature.expression} />
          </Typography>
        </Box>
      </Box>
      <Box mb={2}>
        <ParentDetails creature={creature} />
        <ChildrenDetails creature={creature} />
      </Box>
    </>
  )
}
