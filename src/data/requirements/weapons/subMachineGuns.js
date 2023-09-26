import {
	classic,
	cliffside,
	digital,
	dragon,
	foliage,
	fun,
	geometric,
	reptile,
	solidColors,
	sprayPaint,
	stripes,
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
		amount: 25,
		type: 'headshot',
	},
}

export default {
	'VEL 46': {
		'Arid Digital': digital['Arid Digital'],
		'Midnight Bay': woodland['Midnight Bay'],
		'Tagged': dragon['Tagged'],
		'Whiteout': solidColors['Whiteout'],
		...masteryChallenges,
	},

	'MX9': {
		'Concrete Jungle': woodland['Concrete Jungle'],
		'Forest Digital': digital['Forest Digital'],
		'Overgrown': tiger['Overgrown'],
		'Rainbow Tiger': fun['Rainbow Tiger'],
		...masteryChallenges,
	},

	'Lachmann Sub': {
		'Darkfall': sprayPaint['Darkfall'],
		'Arctic Digital': digital['Arctic Digital'],
		'Crime Scene': dragon['Crime Scene'],
		'Poison': geometric['Poison'],
		...masteryChallenges,
	},

	'Vaznev-9K': {
		'Snow Melt Digital': digital['Snow Melt Digital'],
		'Kill Brush': woodland['Kill Brush'],
		'Forest Rain': cliffside['Forest Rain'],
		'Omnihex': dragon['Omnihex'],
		...masteryChallenges,
	},

	'FSS Hurricane': {
		'Green Woods': woodland['Green Woods'],
		'Python': reptile['Python'],
		'Moon Shadow': dragon['Moon Shadow'],
		'Neon Loud': solidColors['Neon Loud'],
		...masteryChallenges,
	},

	'Minibak': {
		'Timber': stripes['Timber'],
		'Rattlesnake': reptile['Rattlesnake'],
		'Green Digital': digital['Green Digital'],
		'Stoked Flame': geometric['Stoked Flame'],
		...masteryChallenges,
	},

	'PDSW 528': {
		'Shadow Stalker': stripes['Shadow Stalker'],
		'Gecko': reptile['Gecko'],
		'Shale': geometric['Shale'],
		'Pinkish': solidColors['Pinkish'],
		...masteryChallenges,
	},

	'Fennec 45': {
		'Motley': geometric['Motley'],
		'Shadow Tiger': tiger['Shadow Tiger'],
		'Feral Beast': tiger['Feral Beast'],
		'80s Fever': classic['80s Fever'],
		...masteryChallenges,
	},

	'BAS-P': {
		'Grass Snake': sprayPaint['Grass Snake'],
		'Bark Digital': digital['Bark Digital'],
		'Urban Dusk': foliage['Urban Dusk'],
		'Dark Violet': fun['Dark Violet'],
		...masteryChallenges,
	},

	'ISO 45': {
		'Tunnels': sprayPaint['Tunnels'],
		'Ziggurat': geometric['Ziggurat'],
		'Dappled Shade': fun['Dappled Shade'],
		'Prismatic': fun['Prismatic'],
		...masteryChallenges,
	},

	'Lachmann Shroud': {
		'Mud Snake': sprayPaint['Mud Snake'],
		'Germinate': fun['Germinate'],
		'Acrid Drift': tiger['Acrid Drift'],
		'Goodnight Vibes': fun['Goodnight Vibes'],
		...masteryChallenges,
	},

	'ISO 9mm': {
		...masteryChallenges,
	},
}
