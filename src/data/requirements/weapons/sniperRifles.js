import {
	classic, cliffside, dragon, foliage, fun, skulls, solidColours, sprayPaint, tiger
} from "../camo/_index";

const masteryChallenges = {
	'Gold': 'Get 3 kills without dying 10 times',
	'Platinum': 'Get 20 longshot kills',
	'Polyatomic': 'Get 20 headshot kills',
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
