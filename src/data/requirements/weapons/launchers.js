import { digital, foliage, woodland } from '../camouflages/_index'

export default {
	'PILA': {
		'Dead Leaves': woodland['Dead Leaves'],
		'Gold': '2 kills without dying 5 times',
		'Platinum': 'Destroy 15 enemy streaks, equipment, or vehicles',
		'Polyatomic': '15 double kills',
	},

	'STRELA-P': {
		'Deep Jungle': foliage['Deep Jungle'],
		'Gold': '2 kills without dying 5 times',
		'Platinum': 'Destroy 25 enemy streaks, equipment, or vehicles',
		'Polyatomic': '15 double kills',
	},

	'JOKR': {
		'Azure Fray': woodland['Azure Fray'],
		'Gold': '2 kills without dying 10 times',
		'Platinum': 'Destroy 10 enemy streaks, equipment, or vehicles',
		'Polyatomic': '15 double kills',
	},

	'RPG-7': {
		'Jungle Digital': digital['Jungle Digital (RPG)'],
		'Gold': '2 kills without dying 5 times',
		'Platinum': 'Destroy 10 enemy streaks, equipment, or vehicles',
		'Polyatomic': '15 double kills',
	},
}
