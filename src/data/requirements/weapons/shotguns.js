import {
	cliffside,
	digital,
	foliage,
	geometric,
	reptile,
	solidColors,
	sprayPaint,
	stripes,
	tiger,
	woodland,
	fun,
} from '../camouflages/_index'

const masteryChallenges = {
	Gold: {
		amount: 3,
		type: 'without_dying',
		times: 10,
	},
	Platinum: {
		amount: 20,
		type: 'longshot',
	},
	Polyatomic: {
		amount: 20,
		type: 'headshot',
	},
}

export default {
	'Lockwood 300': {
		'Mosswood': foliage['Mosswood'],
		'Jungle Cat': woodland['Jungle Cat'],
		'Red Cell': digital['Red Cell'],
		'Hunting Orange': solidColors['Hunting Orange'],
		...masteryChallenges,
	},

	'Expedite 12': {
		'Forest Shadow': sprayPaint['Forest Shadow'],
		'Tiger Stripes': tiger['Tiger Stripes'],
		'Snowed In': stripes['Snowed In'],
		'Violent Orchid': cliffside['Violent Orchid'],
		...masteryChallenges,
	},

	'Bryson 800': {
		'Mud Bath': stripes['Mud Bath'],
		'Bamboo': foliage['Bamboo'],
		'Ground Cover': stripes['Ground Cover'],
		'Aqua': solidColors['Aqua'],
		...masteryChallenges,
	},

	'Bryson 890': {
		'Snowstorm Digital': digital['Snowstorm Digital'],
		'Stone Guard': geometric['Stone Guard'],
		'Shedding': reptile['Shedding'],
		'Arctic Chill': woodland['Arctic Chill'],
		...masteryChallenges,
	},

	'KV Broadside': {
		'Unplumbed': solidColors['Unplumbed'],
		'Conflagration': digital['Conflagration'],
		'Ethereal Rampage': tiger['Ethereal Rampage'],
		'Riots Nest': fun['Riots Nest'],
		...masteryChallenges,
		'Platinum': {
			amount: 25,
			type: 'longshot',
		},
		'Polyatomic': {
			amount: 25,
			type: 'headshot',
		},
	},

	'MX Guardian': {
		'Wet Sands': stripes['Wet Sands'],
		'Connected Dots': digital['Connected Dots'],
		'Red Smoke': woodland['Red Smoke'],
		'Green Edges': geometric['Green Edges'],
		...masteryChallenges,
		'Platinum': {
			amount: 25,
			type: 'longshot',
		},
		'Polyatomic': {
			amount: 25,
			type: 'headshot',
		},
	},
}
