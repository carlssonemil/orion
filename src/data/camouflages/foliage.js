import foliage from '../requirements/camouflages/foliage'
const base = Object.keys(foliage)

const dlc = []

export default [...base, ...dlc].map((camouflage) => ({
  category: 'Foliage',
  name: camouflage,
  dlc: dlc.includes(camouflage),
  isCompleted: false,
}))
