import {
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
	'Lachmann-762': {
		'Day Marsh': sprayPaint['Day Marsh'],
		'Desert Oil Digital': digital['Desert Oil Digital'],
		'Stalking Cat': stripes['Stalking Cat'],
		'Internal Flame': dragon['Internal Flame'],
		...masteryChallenges,
	},

	'SO-14': {
		'Dune Stalker': woodland['Dune Stalker'],
		'Reptilian': dragon['Reptilian'],
		'Heavy Commando': reptile['Heavy Commando'],
		'Tendrils': stripes['Tendrils'],
		...masteryChallenges,
	},

	'TAQ-V': {
		'Dune Sea': geometric['Dune Sea'],
		'Faded Veil': tiger['Faded Veil'],
		'Anaconda': reptile['Anaconda'],
		'Slime Time': cliffside['Slime Time'],
		...masteryChallenges,
	},

	'FTAC Recon': {
		'Beached': stripes['Beached'],
		'Torn Scales': reptile['Torn Scales'],
		'Desert Cat': tiger['Desert Cat'],
		'Haunting': skulls['Haunting'],
		...masteryChallenges,
	},
	'Cronen Squall': {
		'Vapor Storm': sprayPaint['Vapor Storm'],
		'Ghastly Green': solidColors['Ghastly Green'],
		'Stone Ridge': geometric['Stone Ridge'],
		'Intergalactic': fun['Intergalactic'],
		...masteryChallenges,
	},
}
