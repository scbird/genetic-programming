import { Box } from '@mui/material'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar
} from 'recharts'
import { setGeneration } from '../../program/actions'
import { getGenerationScores } from '../../program/selectors'

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
            dispatch(setGeneration(activeLabel))
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            label={{ value: 'Generation', position: 'insideBottom', dy: 10 }}
            height={40}
          />
          <YAxis
            label={{
              value: 'Total score',
              angle: -90,
              position: 'center',
              dx: -35
            }}
            width={80}
          />
          <Tooltip
            separator=": "
            formatter={(value: number) => [value, 'Total score']}
            labelFormatter={(label) => `Generation ${label}`}
          />
          <Bar dataKey="Score" fill="#8884d8" isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}
