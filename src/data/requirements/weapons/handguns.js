import {
	digital,
	dragon,
	foliage,
	fun,
	geometric,
	reptile,
	solidColors,
	sprayPaint,
	tiger,
	woodland,
} from '../camouflages/_index'

const masteryChallenges = {
	Gold: {
		amount: 3,
		type: 'without_dying',
		times: 5,
	},
	Platinum: {
		amount: 15,
		type: 'longshot',
	},
	Polyatomic: {
		amount: 20,
		type: 'headshot',
	},
}

export default {
	'P890': {
		'Sand': solidColors['Sand'],
		'Muddied': reptile['Muddied'],
		'Blue Digital': digital['Blue Digital'],
		'Pixel Coast': fun['Pixel Coast'],
		...masteryChallenges,
	},

	'.50 GS': {
		'Blades': geometric['Blades'],
		'Foliage': dragon['Foliage'],
		'Leopard': fun['Leopard'],
		'8-Bit Static': fun['8-Bit Static'],
		...masteryChallenges,
	},

	'X12': {
		'Bio Static Digital': digital['Bio Static Digital'],
		'Desert Wave': tiger['Desert Wave'],
		'Garter Snake': reptile['Garter Snake'],
		'Azul': solidColors['Azul'],
		...masteryChallenges,
	},

	'Basilisk': {
		Outcrop: woodland['Outcrop'],
		Countryside: foliage['Countryside'],
		Navy: solidColors['Navy'],
		Chrysolite: geometric['Chrysolite'],
		...masteryChallenges,
	},

	'X13 Auto': {
		'Void and Light': woodland['Void and Light'],
		'Asphalt Digital': digital['Asphalt Digital'],
		'Dark Echo': reptile['Dark Echo'],
		'Party Time': fun['Party Time'],
		...masteryChallenges,
	},

	'FTAC Siege': {
		'Sandpaper': sprayPaint['Sandpaper'],
		'Velvet Midnight': tiger['Velvet Midnight'],
		'Painted Pig': fun['Painted Pig'],
		'Fuzzy Spectrum': fun['Fuzzy Spectrum'],
		...masteryChallenges,
	},

	'GS Magna': {
		'Digital Wilds': digital['Digital Wilds'],
		'Rhyolitic': fun['Rhyolitic'],
		'Cracking Onyx': dragon['Cracking Onyx'],
		'Rad Reverb': fun['Rad Reverb'],
		...masteryChallenges,
	},

	'9mm Daemon': {
		'Deserted': sprayPaint['Deserted'],
		'Hunter': woodland['Hunter'],
		'Fractal Lapse': geometric['Fractal Lapse'],
		'Crosshatch': fun['Crosshatch'],
		...masteryChallenges,
	},
}
