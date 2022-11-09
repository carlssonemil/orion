import tiger from '../requirements/camo/tiger'
const base = Object.keys(tiger)

const dlc = []

export default [...base, ...dlc].map((camo) => ({
	category: 'Tiger',
	name: camo,
	dlc: dlc.includes(camo),
	isCompleted: false
}))
