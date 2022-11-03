import defaultMarksmanRiflesProgress from '../defaults/progress/weapons/marksmanRifles'

const base = ['EBR-14', 'SP-R 208', 'Lockwood MK2', 'LM-S', 'SA-B 50', 'TAQ-M']

const dlc = []

export default [...base, ...dlc].map((weapon) => ({
	category: 'Marksman Rifles',
	name: weapon,
	dlc: dlc.includes(weapon),
	progress: {
		...defaultMarksmanRiflesProgress[weapon],
		Gold: false,
		Platinum: false,
		Polyatomic: false,
	},
}))
