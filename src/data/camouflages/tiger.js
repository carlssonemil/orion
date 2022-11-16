import tiger from '../requirements/camouflages/tiger'
const base = Object.keys(tiger)

const dlc = []

export default [...base, ...dlc].map((camouflage) => ({
	category: 'Tiger',
	name: camouflage,
	dlc: dlc.includes(camouflage),
	isCompleted: false,
}))
