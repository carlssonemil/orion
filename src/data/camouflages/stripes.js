import stripes from '../requirements/camouflages/stripes'
const base = Object.keys(stripes)

const dlc = []

export default [...base, ...dlc].map((camouflage) => ({
  category: 'Stripes',
  name: camouflage,
  dlc: dlc.includes(camouflage),
  isCompleted: false,
}))
