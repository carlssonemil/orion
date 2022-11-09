import classic from '../requirements/camo/classic'
const base = Object.keys(classic)

const dlc = []

export default [...base, ...dlc].map((camo) => ({
	category: 'Classic',
	name: camo,
	dlc: dlc.includes(camo),
	isCompleted: false
}))
