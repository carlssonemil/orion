import skulls from '../requirements/camo/skulls'
const base = Object.keys(skulls)

const dlc = []

export default [...base, ...dlc].map((camo) => ({
	category: 'Skulls',
	name: camo,
	dlc: dlc.includes(camo),
	isCompleted: false
}))
