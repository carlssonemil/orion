import defaultSubmachineGunsProgress from '../defaults/progress/subMachineGuns'
import defaultMasteryCamouflages from '../defaults/progress/masteryCamouflages'

const weapons = [
	'VEL 46',
	'MX9',
	'Lachmann Sub',
	'Vaznev-9K',
	'FSS Hurricane',
	'Minibak',
	'BAS-P',
	'PDSW 528',
	'Fennec 45',
	'ISO 45',
]

const dlc = ['BAS-P', 'ISO 45']

const comingSoon = []

export default weapons.map((weapon) => ({
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
	masteryProgress: {
		...defaultMasteryCamouflages,
	},
}))
