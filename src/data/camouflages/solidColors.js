import solidColors from '../requirements/camouflages/solidColors'
const base = Object.keys(solidColors)

const dlc = []

export default [...base, ...dlc].map((camouflage) => ({
  category: 'Solid Colors',
  name: camouflage,
  dlc: dlc.includes(camouflage),
  isCompleted: false,
}))
