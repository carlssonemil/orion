import defaultSubmachineGunsProgress from '../defaults/progress/subMachineGuns'

const base = [
	'VEL 46',
	'MX9',
	'Lachmann Sub',
	'Vaznev-9K',
	'FSS Hurricane',
	'Minibak',
	'PDSW 528',
	'Fennec 45',
]

const dlc = ['BAS-P']

const comingSoon = ['BAS-P']

export default [...base, ...dlc].map((weapon) => ({
	category: 'Sub Machine Guns',
	name: weapon,
	dlc: dlc.includes(weapon),
	comingSoon: comingSoon.includes(weapon),
	progress: {
		...defaultSubmachineGunsProgress[weapon],
		Gold: false,
		Platinum: false,
		Polyatomic: false,
	},
}))
