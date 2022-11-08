import dragon from '../requirements/camo/dragon'
const base = Object.keys(dragon)

const dlc = []

export default [...base, ...dlc].map((camo) => ({
	category: 'Dragon',
	name: camo,
	dlc: dlc.includes(camo),
	isCompleted: false
}))
