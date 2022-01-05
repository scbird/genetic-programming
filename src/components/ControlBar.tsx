import { PlayArrow, RestartAlt, SkipNext } from '@mui/icons-material'
import { IconButton, Stack } from '@mui/material'
import React, { FC } from 'react'

export interface ControlBarProps {
  running: boolean
  onReset: () => any
  onStep: () => any
  onStart: () => any
  onStop: () => any
}

export const ControlBar: FC<ControlBarProps> = ({
  running,
  onReset,
  onStep,
  onStart,
  onStop
}) => {
  return (
    <Stack direction="row">
      <IconButton color="primary" sx={{ marginRight: 1 }} onClick={onReset}>
        <RestartAlt />
      </IconButton>
      <IconButton color="primary" onClick={onStep}>
        <SkipNext />
      </IconButton>
      <IconButton
        color={running ? 'secondary' : 'primary'}
        onClick={running ? onStop : onStart}>
        <PlayArrow />
      </IconButton>
    </Stack>
  )
}
