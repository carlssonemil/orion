import reptile from '../requirements/camo/reptile'
const base = Object.keys(reptile)

const dlc = []

export default [...base, ...dlc].map((camo) => ({
	category: 'Reptile',
	name: camo,
	dlc: dlc.includes(camo),
	isCompleted: false
}))
