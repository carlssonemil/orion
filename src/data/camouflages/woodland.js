import woodland from '../requirements/camouflages/woodland'
const base = Object.keys(woodland)

const dlc = []

export default [...base, ...dlc].map((camouflage) => ({
	category: 'Woodland',
	name: camouflage,
	dlc: dlc.includes(camouflage),
	isCompleted: false,
}))
