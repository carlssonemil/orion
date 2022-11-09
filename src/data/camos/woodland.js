import woodland from '../requirements/camo/woodland'
const base = Object.keys(woodland)

const dlc = []

export default [...base, ...dlc].map((camo) => ({
	category: 'Woodland',
	name: camo,
	dlc: dlc.includes(camo),
	isCompleted: false
}))
