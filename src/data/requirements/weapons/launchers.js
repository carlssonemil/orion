import { digital, foliage, woodland } from '../camouflages/_index'

const masteryChallenges = {
	Gold: {
		amount: 2,
		type: 'without_dying',
		times: 5,
	},
	Platinum: {
		amount: 10,
		type: 'destroy_streaks_equipment_or_vehicles',
	},
	Polyatomic: {
		amount: 15,
		type: 'double',
	},
}

export default {
	'PILA': {
		'Dead Leaves': woodland['Dead Leaves'],
		...masteryChallenges,
		'Platinum': {
			amount: 15,
			type: 'destroy_streaks_equipment_or_vehicles',
		},
	},

	'STRELA-P': {
		'Deep Jungle': foliage['Deep Jungle'],
		...masteryChallenges,
		'Platinum': {
			amount: 25,
			type: 'destroy_streaks_equipment_or_vehicles',
		},
	},

	'JOKR': {
		'Azure Fray': woodland['Azure Fray'],
		...masteryChallenges,
		'Gold': {
			amount: 2,
			type: 'without_dying',
			times: 10,
		},
	},

	'RPG-7': {
		'Jungle Digital (RPG)': digital['Jungle Digital (RPG)'],
		...masteryChallenges,
	},
}
