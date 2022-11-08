const base = ['Urban Renewal', 'Autumn Return', 'Back in Blue', 'Hexed', 'Spectrums', '2087']

const dlc = []

export default [...base, ...dlc].map((camo) => ({
	category: 'Classic',
	name: camo,
	dlc: dlc.includes(camo),
	isCompleted: false
}))
