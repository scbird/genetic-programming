import { useTheme } from '@mui/material'
import React, { CSSProperties, FC, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BoardState,
  Creature as CreatureModel,
  getBoardSize,
  getCreatures,
  getPlants,
  getSelectedCreatureId,
  isTraining,
  Plant,
  selectCreature
} from '../../model'
import { Creature } from './Creature'

const SELECTION_SIZE_EM = 2
const OBJECT_SIZE_EM = 1
const PADDING_EM = (SELECTION_SIZE_EM - OBJECT_SIZE_EM) / 2

export interface BoardProps {
  width?: number
}

export const Board: FC<BoardProps> = ({ width = 600 }) => {
  const theme = useTheme()
  const lastShownPlants = useRef<readonly Plant[]>()
  const lastShownCreatures = useRef<readonly CreatureModel[]>()
  const training = useSelector(isTraining)
  const dispatch = useDispatch()

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
  const selectedCreatureId = useSelector(getSelectedCreatureId)

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${(width / size.width) * size.height}px`,
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
        {creatures[selectedCreatureId!] && (
          <div
            style={{
              ...getBaseStyle(creatures[selectedCreatureId!]),
              borderRadius: '100px',
              width: `${SELECTION_SIZE_EM}em`,
              height: `${SELECTION_SIZE_EM}em`,
              backgroundColor: theme.palette.primary.light,
              opacity: 0.6
            }}
          />
        )}
        {plants.map((plant) => {
          const isDead = plant.diedAt !== null

          return (
            <div
              key={plant.id}
              style={{
                ...getBaseStyle(plant),
                filter: `grayscale(${isDead ? 1 : 0.5}) opacity(${
                  isDead ? 0.5 : 0.8
                })`,
                fontSize: `${OBJECT_SIZE_EM}em`
              }}>
              🌻
            </div>
          )
        })}
        {/*
        This is a sibling to the creature divs so that it doesn't receive events if the
        user clicks on a creature
        */}
        <div
          style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
          onClick={() => dispatch(selectCreature(undefined))}
        />
        {creatures.map((creature) => {
          return (
            <div
              key={creature.id}
              style={{
                ...getBaseStyle(creature),
                width: `${SELECTION_SIZE_EM}em`,
                height: `${SELECTION_SIZE_EM}em`,
                padding: `${PADDING_EM}em`,
                cursor: 'pointer'
              }}
              onClick={() => dispatch(selectCreature(creature.id))}>
              <Creature creature={creature} />
            </div>
          )
        })}
      </div>
    </div>
  )

  function getBaseStyle(object: CreatureModel | Plant): CSSProperties {
    return {
      position: 'absolute',
      top: `${(100 * object.location.y) / size.height}%`,
      left: `${(100 * object.location.x) / size.width}%`,
      transform: 'translate(-50%, -50%)'
    }
  }
}
