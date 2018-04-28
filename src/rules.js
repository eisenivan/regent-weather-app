import { or, not, and } from 'regent'

export const coldEnoughForCoatRightNow = { left: '@temp', fn: 'lessThan', right: 65 }
export const coldEnoughForCoatInFuture = { left: '@temp_min', fn: 'lessThan', right: 65 }
export const highChanceOfRain = { left: '@precipitation_chance', fn: 'greaterThan', right: 50 }
export const windy = { left: '@wind_speed', fn: 'greaterThan', right: 12 }
export const notWindy = not(windy)
export const cloudy = { left: ['Partly Cloudy', 'Cloudy'], fn: 'includes', right: '@weather' }

export const shouldWearACoat = or(coldEnoughForCoatInFuture, coldEnoughForCoatRightNow, highChanceOfRain)
export const shouldBringAnUmbrella = and(highChanceOfRain, notWindy)
export const shouldBringSunglasses = not(cloudy)
