import {
	classic,
	cliffside,
	digital,
	dragon,
	fun,
	geometric,
	reptile,
	skulls,
	solidColors,
	sprayPaint,
	stripes,
	tiger,
	woodland,
	foliage,
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
	'M4': {
		'Scales': sprayPaint['Scales'],
		'Desert Hybrid': woodland['Desert Hybrid'],
		'Dark Leaves': dragon['Dark Leaves'],
		'New Urban': classic['New Urban'],
		...masteryChallenges,
	},

	'TAQ-56': {
		'Hidden Snake': woodland['Hidden Snake'],
		'Icepick': geometric['Icepick'],
		'Stonewall Digital': digital['Stonewall Digital'],
		'Back in Blue': classic['Back in Blue'],
		...masteryChallenges,
	},

	'Kastov 762': {
		'Urban Foliage': woodland['Urban Foliage'],
		"Rip N' Tear": sprayPaint["Rip N' Tear"],
		'Forest Ice': geometric['Forest Ice'],
		'Red Tiger': tiger['Red Tiger'],
		...masteryChallenges,
	},

	'Lachmann-556': {
		'Marshland': stripes['Marshland'],
		'Pine': solidColors['Pine'],
		'Dark Tiger Digital': digital['Dark Tiger Digital'],
		'Cthulhu': skulls['Cthulhu'],
		...masteryChallenges,
	},

	'STB 556': {
		'Sponge Tac': sprayPaint['Sponge Tac'],
		'Black Top': dragon['Black Top'],
		'Slate': solidColors['Slate'],
		'Neon Pink': dragon['Neon Pink'],
		...masteryChallenges,
	},

	'M16': {
		'Modern Woodland': woodland['Modern Woodland'],
		'Marsh Digital': digital['Marsh Digital'],
		'Dank Forest': tiger['Dank Forest'],
		'Intoxicate': tiger['Intoxicate'],
		...masteryChallenges,
	},

	'Kastov-74U': {
		'Ripple Effect': sprayPaint['Ripple Effect'],
		'Jungle Digital': digital['Jungle Digital'],
		'Canary Stone': geometric['Canary Stone'],
		'Chemical Reaction': cliffside['Chemical Reaction'],
		...masteryChallenges,
	},

	'Kastov 545': {
		'Snowdrift': woodland['Snowdrift'],
		'Mudslide': tiger['Mudslide'],
		'Savannah': stripes['Savannah'],
		'Petri Digital': digital['Petri Digital'],
		...masteryChallenges,
	},

	'M13B': {
		'Tarnished': sprayPaint['Tarnished'],
		'Field Ops': stripes['Field Ops'],
		'Projectile': fun['Projectile'],
		'Ice Cave': reptile['Ice Cave'],
		...masteryChallenges,
	},

	'Chimera': {
		'Charcoal': solidColors['Charcoal'],
		'Aztec': digital['Aztec'],
		'Diabolical': dragon['Diabolical'],
		'Snow Leopard': fun['Snow Leopard'],
		...masteryChallenges,
	},

	'ISO Hemlock': {
		'Gaseous': sprayPaint['Gaseous'],
		'Cloud Hopper': fun['Cloud Hopper'],
		'Lost Signal': fun['Lost Signal'],
		'Paths Of Light': stripes['Paths Of Light'],
		...masteryChallenges,
	},

	'Tempus Razorback': {
		'Snake Oil': sprayPaint['Snake Oil'],
		'Dark Croc': dragon['Dark Croc'],
		'Alien Waves': digital['Alien Waves'],
		'Sky Cover': stripes['Sky Cover'],
		...masteryChallenges,
	},
	'FR Avancer': {
		'Fibrous': foliage['Fibrous'],
		'Scattered Lines': geometric['Scattered Lines'],
		'Bioluminescent': fun['Bioluminescent'],
		'Postmortem': skulls['Postmortem'],
		...masteryChallenges,
	},

	'M13C': {
		'Cemented': woodland['Cemented'],
		'Poison Rivers': woodland['Poison Rivers'],
		'Demise': fun['Demise'],
		'Virulent Strain': fun['Virulent Strain'],
		...masteryChallenges,
	},

	'TR-76 Geist': {
		...masteryChallenges,
	},
}
