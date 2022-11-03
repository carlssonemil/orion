import defaultHandgunsProgress from '../defaults/progress/weapons/handguns'

const base = ['P890', '.50 GS', 'X12', 'Basilisk', 'X13 Auto']

const dlc = []

export default [...base, ...dlc].map((weapon) => ({
	category: 'Handguns',
	name: weapon,
	dlc: dlc.includes(weapon),
	progress: {
		...defaultHandgunsProgress[weapon],
		Gold: false,
		Platinum: false,
		Polyatomic: false,
	},
}))
