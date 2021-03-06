import React, { CSSProperties, FC } from 'react'
import { Creature as CreatureModel } from '../../model'
import hsl from 'hsl-to-hex'

const NUM_COLORS = 30

export interface CreatureProps {
  creature: CreatureModel
  width?: CSSProperties['width']
}

export const Creature: FC<CreatureProps> = ({ creature, width = '1em' }) => {
  const isDead = creature.diedAt !== null

  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 1000 1000"
      style={{
        transform: `translate(0%, -10%) rotate(${creature.heading}rad)`,
        filter: `opacity(${isDead ? 0.25 : 1})`,
        width
      }}>
      <metadata>Svg Vector Icons : http://www.onlinewebfonts.com/icon</metadata>
      <g>
        <g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
          <path
            d="M5144.6,4994.7C2898.1,4750.4,1112.4,3026.9,789.8,791.9c-53-361.7-53-1011.5,0-1359.4C955.7-1685,1476.4-2689.7,2282.9-3447.7c1449.3-1366.4,3543.8-1723.5,5359.5-914.8c495.4,221.2,1002.3,564.5,1364,924c172.8,172.8,202.8,214.3,225.8,315.7c20.7,89.9,20.7,142.9,0,230.4c-25.4,108.3-85.3,172.8-1470.1,1559.9L6319.7,112.2l1442.4,1447c1419.4,1419.4,1444.7,1447,1472.4,1564.5c23,99.1,20.7,140.5-9.2,241.9c-27.6,101.4-64.5,152.1-202.8,285.7c-366.3,357.1-776.5,642.9-1251.2,873.3c-460.8,225.8-898.6,364-1389.4,440.1C6103.1,5008.5,5418.8,5024.6,5144.6,4994.7z M5250.6,2990.1c343.3-175.1,502.3-631.3,336.4-970.1c-129.1-265-347.9-410.1-638.3-428.6c-232.7-11.5-403.2,50.7-559.9,207.4c-161.3,161.3-212,285.7-212,525.3c0,168.2,9.2,214.3,64.5,327.2C4421.1,3017.7,4888.9,3176.7,5250.6,2990.1z"
            fill={getColor(creature)}
          />
        </g>
      </g>
    </svg>
  )
}

function getColor(creature: CreatureModel): string {
  return hsl(getHue(creature), 50, 40)
}

function getHue(creature: CreatureModel): number {
  return (NUM_COLORS * creature.id) % 360
}
