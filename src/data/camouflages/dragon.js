import dragon from '../requirements/camouflages/dragon'
const base = Object.keys(dragon)

const dlc = []

export default [...base, ...dlc].map((camouflage) => ({
  category: 'Dragon',
  name: camouflage,
  dlc: dlc.includes(camouflage),
  isCompleted: false,
}))
