import digital from '../requirements/camouflages/digital'
const base = Object.keys(digital)

const dlc = []

export default [...base, ...dlc].map((camouflage) => ({
	category: 'Digital',
	name: camouflage,
	dlc: dlc.includes(camouflage),
	isCompleted: false,
}))
