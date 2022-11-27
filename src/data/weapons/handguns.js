import defaultHandgunsProgress from '../defaults/progress/handguns'

const weapons = ['P890', '.50 GS', 'X12', 'Basilisk', 'X13 Auto']

const dlc = []

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
}))
