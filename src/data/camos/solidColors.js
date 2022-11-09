import solidColors from '../requirements/camo/solidColors'
const base = Object.keys(solidColors)

const dlc = []

export default [...base, ...dlc].map((camo) => ({
	category: 'Solid Colors',
	name: camo,
	dlc: dlc.includes(camo),
	isCompleted: false
}))
