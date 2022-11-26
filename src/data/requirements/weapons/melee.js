import { solidColors, stripes } from '../camouflages/_index'

const masteryChallenges = {
	Gold: 'Get 2 kills without dying 10 times',
	Platinum: 'Get 2 kills within 10 seconds of each other 10 times',
}

export default {
	'Combat Knife': {
		'Crimson': solidColors['Crimson'],
		...masteryChallenges,
		'Polyatomic': 'Get 20 kills from behind',
	},

	'Riot Shield': {
		'Urban Zebra': stripes['Urban Zebra'],
		...masteryChallenges,
		'Polyatomic': 'Get 10 kills from behind',
	},
}
