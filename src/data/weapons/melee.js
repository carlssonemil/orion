import defaultMeleeProgress from '../defaults/progress/melee'

const weapons = ['Combat Knife', 'Riot Shield']

const dlc = []

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
}))
