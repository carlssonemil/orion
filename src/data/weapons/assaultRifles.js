import defaultAssaultRiflesProgress from '../defaults/progress/assaultRifles'

const weapons = [
	'M4',
	'TAQ-56',
	'Kastov 762',
	'Lachmann-556',
	'STB 556',
	'M16',
	'Kastov-74U',
	'Kastov 545',
	'M13B',
	'Chimera',
]

const dlc = ['M13B', 'Chimera']

const comingSoon = ['Chimera']

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
}))
