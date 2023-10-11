import classic from '../requirements/camouflages/classic'
const base = Object.keys(classic)

const dlc = []

export default [...base, ...dlc].map((camouflage) => ({
  category: 'Classic',
  name: camouflage,
  dlc: dlc.includes(camouflage),
  isCompleted: false,
}))
