import { solidColours, stripes } from "../camo";

const goldChallengeText = 'Get 2 kills without dying 10 times';
const platinumChallengeText = 'Get 2 kills within 10 seconds of each other 10 times';
const polyatomicChallengeText = null;
const masteryChallenges = {
	'Gold': goldChallengeText,
	'Platinum': platinumChallengeText,
	'Polyatomic': polyatomicChallengeText,
};

export default {
	'Combat Knife': {
		Crimson: solidColours.Crimson,
		...masteryChallenges
	},

	'Riot Shield': {
		'Urban Zebra': stripes["Urban Zebra"],
		...masteryChallenges
	},
}
