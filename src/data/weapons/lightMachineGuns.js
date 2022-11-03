import defaultLightMachineGunsProgress from '../defaults/progress/weapons/lightMachineGuns'

const base = ['Sakin MG38', 'HCR 56', '556 Icarus', 'Raal MG', 'RPK', 'Rapp H']

const dlc = []

export default [...base, ...dlc].map((weapon) => ({
	category: 'Light Machine Guns',
	name: weapon,
	dlc: dlc.includes(weapon),
	progress: {
		...defaultLightMachineGunsProgress[weapon],
		Gold: false,
		Platinum: false,
		Polyatomic: false,
	},
}))
