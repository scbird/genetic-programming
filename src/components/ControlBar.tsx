import { PlayArrow, RestartAlt, SkipNext } from '@mui/icons-material'
import { IconButton, Stack, Tooltip } from '@mui/material'
import React, { FC } from 'react'

export interface ControlBarProps {
  running: boolean
  onReset: () => any
  resetTooltip: string
  onStep: () => any
  stepTooltip: string
  onStart: () => any
  startTooltip: string
  onStop: () => any
  stopTooltip: string
}

export const ControlBar: FC<ControlBarProps> = ({
  running,
  onReset,
  resetTooltip,
  onStep,
  stepTooltip,
  onStart,
  startTooltip,
  onStop,
  stopTooltip
}) => {
  return (
    <Stack direction="row">
      <Tooltip title={resetTooltip}>
        <IconButton color="primary" sx={{ marginRight: 1 }} onClick={onReset}>
          <RestartAlt />
        </IconButton>
      </Tooltip>
      <Tooltip title={stepTooltip}>
        <IconButton color="primary" onClick={onStep}>
          <SkipNext />
        </IconButton>
      </Tooltip>
      <Tooltip title={running ? stopTooltip : startTooltip}>
        <IconButton
          color={running ? 'secondary' : 'primary'}
          onClick={running ? onStop : onStart}>
          <PlayArrow />
        </IconButton>
      </Tooltip>
    </Stack>
  )
}
