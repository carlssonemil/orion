import {
	classic, cliffside, dragon, foliage, fun, skulls, solidColours, sprayPaint, tiger
} from "../camo";

const goldChallengeText = 'Get 3 kills without dying 10 times';
const platinumChallengeText = null;
const polyatomicChallengeText = null;
const masteryChallenges = {
	'Gold': goldChallengeText,
	'Platinum': platinumChallengeText,
	'Polyatomic': polyatomicChallengeText,
};

export default {
	'MCPR-300': {
		'Clay': solidColours.Clay,
		'Snow Grass': foliage["Snow Grass"],
		'Neon Shards': tiger["Neon Shards"],
		'Bloodied': fun.Bloodied,
		...masteryChallenges
	},

	'Signal 50': {
		'Gladiator': sprayPaint.Gladiator,
		'Unearthed': sprayPaint.Unearthed,
		'Earthbound': cliffside.Earthbound,
		'Spectrums': classic.Spectrums,
		...masteryChallenges
	},

	'LA-B 330': {
		'Shark Net': sprayPaint["Shark Net"],
		'Dirt': dragon.Dirt,
		'Leafless': foliage.Leafless,
		'Teal Tiger': tiger["Teal Tiger"],
		...masteryChallenges
	},

	'SP-X 80': {
		'Scratch': sprayPaint.Scratch,
		'Dry Field': foliage["Dry Field"],
		'Aspen': foliage.Aspen,
		'Lichyard': skulls.Lichyard,
		...masteryChallenges
	},
}
