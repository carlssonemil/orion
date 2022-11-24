import { digital, foliage, woodland } from '../camouflages/_index'

const masteryChallenges = {
	Gold: 'Get 2 kills without dying 5 times',
	Platinum: 'Destroy 10 enemy streaks, equipment, or vehicles',
	Polyatomic: 'Get 15 double kills',
}

export default {
	'PILA': {
		'Dead Leaves': woodland['Dead Leaves'],
		...masteryChallenges,
		'Platinum': 'Destroy 15 enemy streaks, equipment, or vehicles',
	},

	'STRELA-P': {
		'Deep Jungle': foliage['Deep Jungle'],
		...masteryChallenges,
		'Platinum': 'Destroy 25 enemy streaks, equipment, or vehicles',
	},

	'JOKR': {
		'Azure Fray': woodland['Azure Fray'],
		...masteryChallenges,
		'Gold': 'Get 2 kills without dying 10 times',
	},

	'RPG-7': {
		'Jungle Digital': digital['Jungle Digital (RPG)'],
		...masteryChallenges,
	},
}
