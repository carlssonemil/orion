import sprayPaint from '../requirements/camo/sprayPaint'
const base = Object.keys(sprayPaint)

const dlc = []

export default [...base, ...dlc].map((camo) => ({
	category: 'Spray Paint',
	name: camo,
	dlc: dlc.includes(camo),
	isCompleted: false
}))
