import skulls from '../requirements/camouflages/skulls'
const base = Object.keys(skulls)

const dlc = []

export default [...base, ...dlc].map((camouflage) => ({
	category: 'Skulls',
	name: camouflage,
	dlc: dlc.includes(camouflage),
	isCompleted: false,
}))
