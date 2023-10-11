import defaultBattleRiflesProgress from '../defaults/progress/battleRifles'
import defaultMasteryCamouflages from '../defaults/progress/masteryCamouflages'

const weapons = ['Lachmann-762', 'SO-14', 'TAQ-V', 'FTAC Recon', 'Cronen Squall']

const dlc = ['Cronen Squall']

const comingSoon = []

export default weapons.map((weapon) => ({
  category: 'Battle Rifles',
  name: weapon,
  dlc: dlc.includes(weapon),
  comingSoon: comingSoon.includes(weapon),
  progress: {
    ...defaultBattleRiflesProgress[weapon],
    Gold: false,
    Platinum: false,
    Polyatomic: false,
  },
  masteryProgress: {
    ...defaultMasteryCamouflages,
  },
}))
