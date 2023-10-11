import sprayPaint from '../requirements/camouflages/sprayPaint'
const base = Object.keys(sprayPaint)

const dlc = []

export default [...base, ...dlc].map((camouflage) => ({
  category: 'Spray Paint',
  name: camouflage,
  dlc: dlc.includes(camouflage),
  isCompleted: false,
}))
