import defaultMarksmanRiflesProgress from '../defaults/progress/marksmanRifles'
import defaultMasteryCamouflages from '../defaults/progress/masteryCamouflages'

const weapons = ['EBR-14', 'SP-R 208', 'Lockwood MK2', 'LM-S', 'SA-B 50', 'TAQ-M']

const dlc = []

const comingSoon = []

export default weapons.map((weapon) => ({
	category: 'Marksman Rifles',
	name: weapon,
	dlc: dlc.includes(weapon),
	comingSoon: comingSoon.includes(weapon),
	progress: {
		...defaultMarksmanRiflesProgress[weapon],
		Gold: false,
		Platinum: false,
		Polyatomic: false,
	},
	masteryProgress: {
		...defaultMasteryCamouflages,
	},
}))
