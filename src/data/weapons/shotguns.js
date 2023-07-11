import defaultShotgunsProgress from '../defaults/progress/shotguns'
import defaultMasteryCamouflages from '../defaults/progress/masteryCamouflages'

const weapons = ['Lockwood 300', 'Expedite 12', 'Bryson 800', 'Bryson 890', 'KV Broadside', 'MX Guardian']

const dlc = ['KV Broadside', 'MX Guardian']

const comingSoon = []

export default weapons.map((weapon) => ({
	category: 'Shotguns',
	name: weapon,
	dlc: dlc.includes(weapon),
	comingSoon: comingSoon.includes(weapon),
	progress: {
		...defaultShotgunsProgress[weapon],
		Gold: false,
		Platinum: false,
		Polyatomic: false,
	},
	masteryProgress: {
		...defaultMasteryCamouflages,
	},
}))
