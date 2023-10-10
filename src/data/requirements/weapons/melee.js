import { solidColors, stripes, fun, woodland } from '../camouflages/_index'

const masteryChallenges = {
	Gold: {
		amount: 2,
		type: 'without_dying',
		times: 10,
	},
	Platinum: {
		amount: 2,
		type: 'time_limit',
		seconds: 10,
		times: 10,
	},
}

export default {
	'Combat Knife': {
		Scarlet: solidColors['Scarlet'],
		...masteryChallenges,
		Polyatomic: {
			amount: 20,
			type: 'behind',
		},
	},

	'Riot Shield': {
		'Urban Zebra': stripes['Urban Zebra'],
		...masteryChallenges,
		'Polyatomic': {
			amount: 10,
			type: 'behind',
		},
	},

	'Dual Kodachis': {
		'Rush Hour': fun['Rush Hour'],
		...masteryChallenges,
		'Polyatomic': {
			amount: 20,
			type: 'behind',
		},
	},

	'Tonfa': {
		Oxidation: fun['Oxidation'],
		...masteryChallenges,
		Platinum: {
			amount: 2,
			type: 'time_limit',
			seconds: 10,
			times: 15,
		},
		Polyatomic: {
			amount: 20,
			type: 'behind',
		},
	},

	'Pickaxe': {
		'Zany Zebra': stripes['Zany Zebra'],
		...masteryChallenges,
		'Platinum': {
			amount: 2,
			type: 'time_limit',
			seconds: 10,
			times: 15,
		},
		'Polyatomic': {
			amount: 20,
			type: 'behind',
		},
	},

	'Dual Kamas': {
		'Cyber Plateau': woodland['Cyber Plateau'],
		...masteryChallenges,
		'Platinum': {
			amount: 2,
			type: 'time_limit',
			seconds: 10,
			times: 15,
		},
		'Polyatomic': {
			amount: 20,
			type: 'behind',
		},
	},
}
