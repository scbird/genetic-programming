import { Box } from '@mui/material'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { getGenerationScores, setGeneration } from '../../model'

export const Chart: FC = () => {
  const dispatch = useDispatch()
  const data = useSelector(getGenerationScores).map((score, generation) => ({
    name: generation,
    Score: score
  }))

  return (
    <Box sx={{ height: '200px' }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          onClick={({ activeLabel }: { activeLabel: number }) => {
            // Ignore clicks on the "auto" column that the bar
            // generates when there's only one generation
            if (data[activeLabel]) {
              dispatch(setGeneration(activeLabel))
            }
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            label={{ value: 'Generation', position: 'insideBottom', dy: 10 }}
            height={40}
          />
          <YAxis
            label={{
              value: 'Combined score',
              angle: -90,
              position: 'center',
              dx: -35
            }}
            width={80}
          />
          <Tooltip
            separator=": "
            formatter={(value: number) => [value, 'Combined score']}
            labelFormatter={(label) => `Generation ${label}`}
          />
          <Bar dataKey="Score" fill="#8884d8" isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}
