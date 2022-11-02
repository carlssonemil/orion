import defaultLaunchersProgress from '../defaults/progress/launchers'

const base = ['PILA', 'STRELA-P', 'JOKR', 'RPG-7']

const dlc = []

export default [...base, ...dlc].map((weapon) => ({
	category: 'Launchers',
	name: weapon,
	dlc: dlc.includes(weapon),
	progress: {
		...defaultLaunchersProgress[weapon],
		Gold: false,
		Platinum: false,
		Polyatomic: false,
	},
}))
