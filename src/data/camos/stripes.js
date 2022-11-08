import stripes from '../requirements/camo/stripes'
const base = Object.keys(stripes)

const dlc = []

export default [...base, ...dlc].map((camo) => ({
	category: 'Stripes',
	name: camo,
	dlc: dlc.includes(camo),
	isCompleted: false
}))
