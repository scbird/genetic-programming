import { Box, Typography, useTheme } from '@mui/material'
import React, { FC } from 'react'
import { Creature as CreatureModel, getCreatureScore } from '../../model'
import { HighlightedExpression } from './HighlightedExpression'

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
          Score: <b>{getCreatureScore(creature)}</b>
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
    </>
  )
}
