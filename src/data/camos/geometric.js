import geometric from '../requirements/camo/geometric'
const base = Object.keys(geometric)

const dlc = []

export default [...base, ...dlc].map((camo) => ({
	category: 'Geometric',
	name: camo,
	dlc: dlc.includes(camo),
	isCompleted: false
}))
