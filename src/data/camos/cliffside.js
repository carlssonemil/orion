import cliffside from '../requirements/camo/cliffside'
const base = Object.keys(cliffside)

const dlc = []

export default [...base, ...dlc].map((camo) => ({
	category: 'Cliffside',
	name: camo,
	dlc: dlc.includes(camo),
	isCompleted: false
}))
