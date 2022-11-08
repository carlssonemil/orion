import fun from '../requirements/camo/fun'
const base = Object.keys(fun)

const dlc = []

export default [...base, ...dlc].map((camo) => ({
	category: 'Fun',
	name: camo,
	dlc: dlc.includes(camo),
	isCompleted: false
}))
