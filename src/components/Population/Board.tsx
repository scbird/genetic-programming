import { useTheme } from '@mui/material'
import React, { FC, useRef } from 'react'
import { useSelector } from 'react-redux'
import {
  getBoardSize,
  getCreatures,
  getPlants,
  isTraining
} from '../../program/selectors'
import {
  BoardState,
  Creature as CreatureModel,
  Plant
} from '../../program/types'
import { Creature } from './Creature'

export const Board: FC = () => {
  const theme = useTheme()
  const lastShownPlants = useRef<readonly Plant[]>()
  const lastShownCreatures = useRef<readonly CreatureModel[]>()
  const training = useSelector(isTraining)

  // If we're training, only update the view each generation
  const plants = useSelector((state: BoardState) => {
    if (!isTraining(state) || !lastShownPlants.current) {
      lastShownPlants.current = getPlants(state)
    }

    return lastShownPlants.current
  })
  const creatures = useSelector((state: BoardState) => {
    if (!isTraining(state) || !lastShownCreatures.current) {
      lastShownCreatures.current = getCreatures(state)
    }

    return lastShownCreatures.current
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
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          filter: training ? `grayscale(0.8) opacity(0.3)` : undefined
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
    </div>
  )
}
