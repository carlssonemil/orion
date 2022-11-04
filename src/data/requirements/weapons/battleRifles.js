import { cliffside, digital, dragon, geometric, reptile, skulls, sprayPaint, stripes, tiger, woodland } from "../camo";

const goldChallengeText = 'Get 3 kills without dying 10 times';
const platinumChallengeText = null;
const polyatomicChallengeText = null;
const masteryChallenges = {
	'Gold': goldChallengeText,
	'Platinum': platinumChallengeText,
	'Polyatomic': polyatomicChallengeText,
};

export default {
	'Lachmann-762': {
		'Day Marsh': sprayPaint["Day Marsh"],
		'Desert Oil Digital': digital["Desert Oil Digital"],
		'Stalking Cat': stripes["Stalking Cat"],
		'Internal Flame': dragon["Internal Flame"],
		...masteryChallenges
	},

	'SO-14': {
		'Dune Stalker': woodland["Dune Stalker"],
		'Reptilian': dragon.Reptilian,
		'Heavy Command': reptile["Heavy Commando"],
		'Tendrils': stripes.Tendrils,
		...masteryChallenges
	},

	'TAQ-V': {
		'Dune Sea': geometric["Dune Sea"],
		'Faded Veil': tiger["Faded Veil"],
		'Anaconda': reptile.Anaconda,
		'Slime Time': cliffside["Slime Time"],
		...masteryChallenges
	},

	'FTAC Recon': {
		'Beached': stripes.Beached,
		'Torn Scales': reptile["Torn Scales"],
		'Desert Cat': tiger["Desert Cat"],
		'Haunting': skulls.Haunting,
		...masteryChallenges
	},
}
