import {
	classic, cliffside, digital, dragon, fun, geometric, reptile, solidColours, sprayPaint, stripes, tiger, woodland
} from "../camo/_index";

const masteryChallenges = {
	'Gold': 'Get 3 kills without dying 10 times',
	'Platinum': 'Get 25 longshot kills',
	'Polyatomic': 'Get 25 headshot kills',
};

export default {
	'VEL 46': {
		'Arid Digital': digital["Arid Digital"],
		'Midnight Bay': woodland["Midnight Bay"],
		'Tagged': dragon.Tagged,
		'Whiteout': solidColours.Whiteout,
		...masteryChallenges
	},

	'MX9': {
		'Concrete Jungle': woodland["Concrete Jungle"],
		'Forest Digital': digital["Forest Digital"],
		'Overgrown': tiger.Overgrown,
		'Rainbow Tiger': fun["Rainbow Tiger"],
		...masteryChallenges
	},

	'Lachmann Sub': {
		'Darkfall': sprayPaint.Darkfall,
		'Arctic Digital': digital["Arctic Digital"],
		'Crime Scene': dragon["Crime Scene"],
		'Poison': geometric.Poison,
		...masteryChallenges
	},

	'Vaznev-9K': {
		'Snow Melt Digital': digital["Snow Melt Digital"],
		'Kill Brush': woodland["Kill Brush"],
		'Forest Rain': cliffside["Forest Rain"],
		'Omnihex': dragon.Omnihex,
		...masteryChallenges
	},

	'FSS Hurricane': {
		'Green Woods': woodland["Green Woods"],
		'Python': reptile.Python,
		'Moon Shadow': dragon["Moon Shadow"],
		'Neon Loud': solidColours["Neon Loud"],
		...masteryChallenges
	},

	'Minibak': {
		'Timber': stripes.Timber,
		'Rattlesnake': reptile.Rattlesnake,
		'Green Digital': digital["Green Digital"],
		'Skyfire': geometric.Skyfire,
		...masteryChallenges
	},

	'PDSW 528': {
		'Shadow Stalker': stripes["Shadow Stalker"],
		'Gecko': reptile.Gecko,
		'Shale': geometric.Shale,
		'Power Pink': solidColours["Power Pink"],
		...masteryChallenges
	},

	'Fennec 45': {
		'Motley': geometric.Motley,
		'Eclipse': tiger.Eclipse,
		'Feral Beast': tiger["Feral Beast"],
		'2087': classic[2087],
		...masteryChallenges
	},
}
