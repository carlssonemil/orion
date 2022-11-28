import defaultLaunchersProgress from '../defaults/progress/launchers'
import defaultMasteryCamouflages from '../defaults/progress/masteryCamouflages'

const weapons = ['PILA', 'STRELA-P', 'JOKR', 'RPG-7']

const dlc = []

const comingSoon = []

export default weapons.map((weapon) => ({
	category: 'Launchers',
	name: weapon,
	dlc: dlc.includes(weapon),
	comingSoon: comingSoon.includes(weapon),
	progress: {
		...defaultLaunchersProgress[weapon],
		Gold: false,
		Platinum: false,
		Polyatomic: false,
	},
	masteryProgress: {
		...defaultMasteryCamouflages,
	},
}))
