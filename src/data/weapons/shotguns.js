import defaultShotgunsProgress from '../defaults/progress/shotguns'

const base = ['Lockwood 300', 'Expedite 12', 'Bryson 800', 'Bryson 890']

const dlc = []

export default [...base, ...dlc].map((weapon) => ({
	category: 'Shotguns',
	name: weapon,
	dlc: dlc.includes(weapon),
	progress: {
		...defaultShotgunsProgress[weapon],
		Gold: false,
		Platinum: false,
		Polyatomic: false,
	},
}))
