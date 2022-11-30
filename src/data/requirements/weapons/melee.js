import { solidColors, stripes } from '../camouflages/_index'

const masteryChallenges = {
	Gold: '2 kills without dying 10 times',
	Platinum: '2 kills within 10 seconds of each other 10 times',
}

export default {
	'Combat Knife': {
		Scarlet: solidColors['Scarlet'],
		...masteryChallenges,
		Polyatomic: '20 kills from behind',
	},

	'Riot Shield': {
		'Urban Zebra': stripes['Urban Zebra'],
		...masteryChallenges,
		'Polyatomic': '10 kills from behind',
	},
}
