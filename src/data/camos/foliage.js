import foliage from '../requirements/camo/foliage'
const base = Object.keys(foliage)

const dlc = []

export default [...base, ...dlc].map((camo) => ({
	category: 'Foliage',
	name: camo,
	dlc: dlc.includes(camo),
	isCompleted: false
}))
