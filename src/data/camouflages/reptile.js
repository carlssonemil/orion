import reptile from '../requirements/camouflages/reptile'
const base = Object.keys(reptile)

const dlc = []

export default [...base, ...dlc].map((camouflage) => ({
  category: 'Reptile',
  name: camouflage,
  dlc: dlc.includes(camouflage),
  isCompleted: false,
}))
