import defaultSubmachineGunsProgress from '../defaults/progress/subMachineGuns'

const base = [
	'VEL 46',
	'MX9',
	'Lachmann Sub',
	'Vaznek-9K',
	'FSS Hurricane',
	'Minibak',
	'PDSW 528',
	'Fennec 45',
]

const dlc = []

export default [...base, ...dlc].map((weapon) => ({
	category: 'Sub Machine Guns',
	name: weapon,
	dlc: dlc.includes(weapon),
	progress: {
		...defaultSubmachineGunsProgress[weapon],
		Gold: false,
		Polyatomic: false,
	},
}))
