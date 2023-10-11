import defaultHandgunsProgress from '../defaults/progress/handguns'
import defaultMasteryCamouflages from '../defaults/progress/masteryCamouflages'

const weapons = [
  'P890',
  '.50 GS',
  'X12',
  'Basilisk',
  'X13 Auto',
  'FTAC Siege',
  'GS Magna',
  '9mm Daemon',
]

const dlc = ['FTAC Siege', 'GS Magna', '9mm Daemon']

const comingSoon = []

export default weapons.map((weapon) => ({
  category: 'Handguns',
  name: weapon,
  dlc: dlc.includes(weapon),
  comingSoon: comingSoon.includes(weapon),
  progress: {
    ...defaultHandgunsProgress[weapon],
    Gold: false,
    Platinum: false,
    Polyatomic: false,
  },
  masteryProgress: {
    ...defaultMasteryCamouflages,
  },
}))
