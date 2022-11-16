import geometric from '../requirements/camouflages/geometric'
const base = Object.keys(geometric)

const dlc = []

export default [...base, ...dlc].map((camouflage) => ({
	category: 'Geometric',
	name: camouflage,
	dlc: dlc.includes(camouflage),
	isCompleted: false,
}))
