import defaultLightMachineGunsProgress from '../defaults/progress/lightMachineGuns'
import defaultMasteryCamouflages from '../defaults/progress/masteryCamouflages'

const weapons = ['Sakin MG38', 'HCR 56', '556 Icarus', 'Raal MG', 'RPK', 'Rapp H']

const dlc = []

const comingSoon = []

export default weapons.map((weapon) => ({
	category: 'Light Machine Guns',
	name: weapon,
	dlc: dlc.includes(weapon),
	comingSoon: comingSoon.includes(weapon),
	progress: {
		...defaultLightMachineGunsProgress[weapon],
		Gold: false,
		Platinum: false,
		Polyatomic: false,
	},
	masteryProgress: {
		...defaultMasteryCamouflages,
	},
}))
