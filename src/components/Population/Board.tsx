import { useTheme } from '@mui/material'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import {
  getBoardSize,
  getCreatures,
  getGenerationCreatures,
  getGenerationPlants,
  getPlants,
  isTraining
} from '../../program/selectors'
import { BoardState } from '../../program/types'
import { Creature } from './Creature'

export const Board: FC = () => {
  const theme = useTheme()
  // If we're training, only update the view each generation
  const plants = useSelector((state: BoardState) => {
    if (isTraining(state)) {
      return getGenerationPlants(state)
    } else {
      return getPlants(state)
    }
  })
  const creatures = useSelector((state: BoardState) => {
    if (isTraining(state)) {
      return getGenerationCreatures(state)
    } else {
      return getCreatures(state)
    }
  })
  const size = useSelector(getBoardSize)

  return (
    <div
      style={{
        width: '600px',
        height: '600px',
        border: `1px solid ${theme.palette.grey['400']}`,
        position: 'relative',
        overflow: 'hidden'
      }}>
      {plants.map((plant) => {
        const isDead = plant.diedAt !== null

        return (
          <div
            key={plant.id}
            style={{
              position: 'absolute',
              top: `${(100 * plant.location.y) / size.height}%`,
              left: `${(100 * plant.location.x) / size.width}%`,
              transform: 'translate(-50%, -50%)',
              filter: `grayscale(${isDead ? 1 : 0.5}) opacity(${
                isDead ? 0.5 : 0.8
              })`
            }}>
            🌻
          </div>
        )
      })}
      {creatures.map((creature) => {
        return (
          <div
            key={creature.id}
            style={{
              position: 'absolute',
              top: `${(100 * creature.location.y) / size.height}%`,
              left: `${(100 * creature.location.x) / size.width}%`,
              transform: 'translate(-50%, -50%)',
              width: '1em',
              height: '1em'
            }}>
            <Creature creature={creature} />
          </div>
        )
      })}
    </div>
  )
}
