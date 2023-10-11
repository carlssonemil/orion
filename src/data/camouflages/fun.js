import fun from '../requirements/camouflages/fun'
const base = Object.keys(fun)

const dlc = []

export default [...base, ...dlc].map((camouflage) => ({
  category: 'Fun',
  name: camouflage,
  dlc: dlc.includes(camouflage),
  isCompleted: false,
}))
