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
	Gold: '3 kills without dying 10 times',
	Platinum: '25 longshot kills',
	Polyatomic: '20 headshot kills',
}

export default {
	'MCPR-300': {
		'Clay': solidColors['Clay'],
		'Snow Grass': foliage['Snow Grass'],
		'Neon Shards': tiger['Neon Shards'],
		'Bloodied': fun['Bloodied'],
		...masteryChallenges,
		'Platinum': '20 longshot kills',
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
		'Polyatomic': '25 headshot kills',
	},

	'SP-X 80': {
		'Scratch': sprayPaint['Scratch'],
		'Dry Field': foliage['Dry Field'],
		'Aspen': foliage['Aspen'],
		'Lichyard': skulls['Lichyard'],
		...masteryChallenges,
		'Polyatomic': '25 headshot kills',
	},

	'Victus XMR': {
		'Snowy Nights': reptile['Snowy Nights'],
		'Burned Edges': dragon['Burned Edges'],
		'Tangographical': woodland['Tangographical'],
		'Coral Reef': fun['Coral Reef'],
		...masteryChallenges,
		'Polyatomic': '25 headshot kills',
	},
}
