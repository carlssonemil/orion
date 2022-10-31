import defaultMeleeProgress from '../defaults/progress/melee'

const base = ['Combat Knife', 'Riot Shield']

const dlc = []

export default [...base, ...dlc].map((weapon) => ({
	category: 'Melee',
	name: weapon,
	dlc: dlc.includes(weapon),
	progress: {
		...defaultMeleeProgress[weapon],
		Gold: false,
		Polyatomic: false,
	},
}))
