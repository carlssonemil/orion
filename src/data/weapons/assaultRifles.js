import defaultAssaultRiflesProgress from '../defaults/progress/assaultRifles'

const base = [
	'M4',
	'TAQ-56',
	'Kastov 762',
	'Lachmann-556',
	'STB 556',
	'M16',
	'Kastov-74U',
	'Kastov 545',
]

const dlc = []

export default [...base, ...dlc].map((weapon) => ({
	category: 'Assault Rifles',
	name: weapon,
	dlc: dlc.includes(weapon),
	progress: {
		...defaultAssaultRiflesProgress[weapon],
		Gold: false,
		Platinum: false,
		Polyatomic: false,
	},
}))
