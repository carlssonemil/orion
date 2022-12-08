import {
	classic,
	cliffside,
	dragon,
	foliage,
	fun,
	reptile,
	skulls,
	solidColors,
	sprayPaint,
	tiger,
	woodland,
} from '../camouflages/_index'

const masteryChallenges = {
	Gold: {
		amount: 3,
		type: 'without_dying',
		times: 10,
	},
	Platinum: {
		amount: 25,
		type: 'longshot',
	},
	Polyatomic: {
		amount: 20,
		type: 'headshot',
	},
}

export default {
	'MCPR-300': {
		'Clay': solidColors['Clay'],
		'Snow Grass': foliage['Snow Grass'],
		'Neon Shards': tiger['Neon Shards'],
		'Bloodied': fun['Bloodied'],
		...masteryChallenges,
		'Platinum': {
			amount: 20,
			type: 'longshot',
		},
	},

	'Signal 50': {
		Gladiator: sprayPaint['Gladiator'],
		Unearthed: sprayPaint['Unearthed'],
		Earthbound: cliffside['Earthbound'],
		Spectrums: classic['Spectrums'],
		...masteryChallenges,
	},

	'LA-B 330': {
		'Shark Net': sprayPaint['Shark Net'],
		'Dirt': dragon['Dirt'],
		'Leafless': foliage['Leafless'],
		'Teal Tiger': tiger['Teal Tiger'],
		...masteryChallenges,
		'Polyatomic': {
			amount: 25,
			type: 'headshot',
		},
	},

	'SP-X 80': {
		'Scratch': sprayPaint['Scratch'],
		'Dry Field': foliage['Dry Field'],
		'Aspen': foliage['Aspen'],
		'Lichyard': skulls['Lichyard'],
		...masteryChallenges,
		'Polyatomic': {
			amount: 25,
			type: 'headshot',
		},
	},

	'Victus XMR': {
		'Snowy Nights': reptile['Snowy Nights'],
		'Burned Edges': dragon['Burned Edges'],
		'Tangographical': woodland['Tangographical'],
		'Coral Reef': fun['Coral Reef'],
		...masteryChallenges,
		'Polyatomic': {
			amount: 25,
			type: 'headshot',
		},
	},
}
