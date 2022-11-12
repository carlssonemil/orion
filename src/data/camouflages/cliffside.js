import cliffside from '../requirements/camouflages/cliffside'
const base = Object.keys(cliffside)

const dlc = []

export default [...base, ...dlc].map((camouflage) => ({
	category: 'Cliffside',
	name: camouflage,
	dlc: dlc.includes(camouflage),
	isCompleted: false,
}))
