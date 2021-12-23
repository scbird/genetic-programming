import { Point } from '../types'

export interface HasLocation {
  location: Point
}

export function getNearestTo<T extends HasLocation>(
  from: HasLocation,
  to: readonly T[]
): T {
  let nearestIdx = 0
  let nearestDistance = getDistanceSquared(from.location, to[0].location)

  for (let i = 1; i < to.length; i++) {
    const distance = getDistanceSquared(from.location, to[i].location)

    if (distance < nearestDistance) {
      nearestIdx = i
      nearestDistance = distance
    }
  }

  return to[nearestIdx]
}

export function getDistance(from: HasLocation, to: HasLocation): number {
  return Math.sqrt(getDistanceSquared(from.location, to.location))
}

export function getHeading(from: HasLocation, to: HasLocation): number {
  const theta = Math.atan2(
    to.location.x - from.location.x,
    from.location.y - to.location.y
  )

  if (theta < 0.0) {
    return theta + Math.PI * 2
  } else {
    return theta
  }
}

export function normalizeHeading(heading: number) {
  if (heading < -Math.PI) {
    return heading + Math.PI * 2
  } else if (heading >= Math.PI) {
    return heading - Math.PI * 2
  } else {
    return heading
  }
}

/**
 * Returns the relative angle between two headings. Returned number will be in the range
 * of [-PI, PI)
 */
export function getRelativeAngle(heading1: number, heading2: number): number {
  return normalizeHeading(heading1 - heading2)
}

function getDistanceSquared(from: Point, to: Point): number {
  const xDelta = from.x - to.x
  const yDelta = from.y - to.y

  return xDelta * xDelta + yDelta * yDelta
}
