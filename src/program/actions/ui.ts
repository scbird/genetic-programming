import { AnyAction } from 'redux'

export const UI_PAUSE_SET = 'UI_PAUSE_SET'
export const UI_SELECT_CREATURE = 'UI_SELECT_CREATURE'

export function pauseUi(): AnyAction {
  return setUiPaused(true)
}

export function unPauseUi(): AnyAction {
  return setUiPaused(false)
}

export function selectCreature(creatureId: number | undefined): AnyAction {
  return { type: UI_SELECT_CREATURE, payload: creatureId }
}

function setUiPaused(paused: boolean): AnyAction {
  return { type: UI_PAUSE_SET, payload: paused }
}
