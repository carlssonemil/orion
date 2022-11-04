import {
	classic, cliffside, digital, dragon, foliage, fun, geometric, reptile, sprayPaint, stripes, tiger, woodland
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
	'EBR-14': {
		'Sandstorm Digital': digital["Sandstorm Digital"],
		'Moss': dragon.Moss,
		'Autumn Return': classic["Autumn Return"],
		'Sunlit Croc': tiger["Sunlit Croc"],
		...masteryChallenges
	},

	'SP-R 208': {
		'Dark Canopy': woodland["Dark Canopy"],
		'Desert Digital': digital["Desert Digital"],
		'Ferns': foliage.Ferns,
		'Crimson Streak': fun["Crimson Streak"],
		...masteryChallenges
	},

	'Lockwood MK2': {
		'Sand Viper': sprayPaint["Sand Viper"],
		'Desert Rain': cliffside["Desert Rain"],
		'Wild Zebra': stripes["Wild Zebra"],
		'Granite': geometric.Granite,
		...masteryChallenges
	},

	'LM-S': {
		'Commando Digital': digital["Commando Digital"],
		'Abominable': tiger.Abominable,
		'Autumnal': foliage.Autumnal,
		'Coral Snake': reptile["Coral Snake"],
		...masteryChallenges
	},

	'SA-B 50': {
		'Urban Digital': digital["Urban Digital"],
		'Bullsnake': reptile.Bullsnake,
		'Toxicity': reptile.Toxicity,
		'Splintered Asphalt': geometric["Splintered Asphalt"],
		...masteryChallenges
	},

	'TAQ-M': {
		'Dead Hive': sprayPaint["Dead Hive"],
		'Forest Water': woodland["Forest Water"],
		'Skin and Scales': reptile["Skin And Scales"],
		'Chemist Digital': digital["Chemist Digital"],
		...masteryChallenges
	},
}
