import digital from '../requirements/camo/digital'
const base = Object.keys(digital)

const dlc = []

export default [...base, ...dlc].map((camo) => ({
	category: 'Digital',
	name: camo,
	dlc: dlc.includes(camo),
	isCompleted: false
}))
