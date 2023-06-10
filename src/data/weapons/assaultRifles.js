import defaultAssaultRiflesProgress from '../defaults/progress/assaultRifles'
import defaultMasteryCamouflages from '../defaults/progress/masteryCamouflages'

const weapons = [
	'M4',
	'TAQ-56',
	'Kastov 762',
	'Lachmann-556',
	'STB 556',
	'M16',
	'Kastov-74U',
	'Kastov 545',
	'Chimera',
	'M13B',
	'ISO Hemlock',
	'Tempus Razorback',
]

const dlc = ['M13B', 'Chimera', 'ISO Hemlock', 'Tempus Razorback']

const comingSoon = []

export default weapons.map((weapon) => ({
	category: 'Assault Rifles',
	name: weapon,
	dlc: dlc.includes(weapon),
	comingSoon: comingSoon.includes(weapon),
	progress: {
		...defaultAssaultRiflesProgress[weapon],
		Gold: false,
		Platinum: false,
		Polyatomic: false,
	},
	masteryProgress: {
		...defaultMasteryCamouflages,
	},
}))
