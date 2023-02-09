import defaultMeleeProgress from '../defaults/progress/melee'
import defaultMasteryCamouflages from '../defaults/progress/masteryCamouflages'

const weapons = ['Combat Knife', 'Riot Shield', 'Dual Kodachis']

const dlc = ['Dual Kodachis']

const comingSoon = []

export default weapons.map((weapon) => ({
	category: 'Melee',
	name: weapon,
	dlc: dlc.includes(weapon),
	comingSoon: comingSoon.includes(weapon),
	progress: {
		...defaultMeleeProgress[weapon],
		Gold: false,
		Platinum: false,
		Polyatomic: false,
	},
	masteryProgress: {
		...defaultMasteryCamouflages,
	},
}))
