import { Box } from '@mui/material'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar
} from 'recharts'
import { getGenerationScores } from '../../program/selectors'

export const Chart: FC = () => {
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
            console.log(activeLabel)
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
          <Bar dataKey="Score" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}
