import { digital, dragon, foliage, fun, geometric, reptile, solidColours, tiger, woodland } from "../camo";

const goldChallengeText = 'Get 3 kills without dying 5 times';
const platinumChallengeText = null;
const polyatomicChallengeText = null;
const masteryChallenges = {
	'Gold': goldChallengeText,
	'Platinum': platinumChallengeText,
	'Polyatomic': polyatomicChallengeText,
};

export default {
	'P890': {
		'Sand': solidColours.Sand,
		'Muddied': reptile.Muddied,
		'Blue Digital': digital["Blue Digital"],
		'Pixel Land': fun["Pixel Land"],
		...masteryChallenges
	},

	'.50 GS': {
		'Blades': geometric.Blades,
		'Foliage': dragon.Foliage,
		'Leopard': fun.Leopard,
		'8-Bit Static': fun["8-Bit Static"],
		...masteryChallenges
	},

	'X12': {
		'Bio Static Digital': digital["Bio Static Digital"],
		'Desert Wave': tiger["Desert Wave"],
		'Garter Snake': reptile["Garter Snake"],
		'Azul': solidColours.Azul,
		...masteryChallenges
	},

	'Basilisk': {
		'Outcrop': woodland.Outcrop,
		'Countryside': foliage.Countryside,
		'Dark Denim': solidColours["Dark Denim"],
		'Chrysolite': geometric.Chrysolite,
		...masteryChallenges
	},

	'X13 Auto': {
		'Void and Light': woodland["Void And Light"],
		'Asphalt Digital': digital["Asphalt Digital"],
		'Dark Echo': reptile["Dark Echo"],
		'Party Time': fun["Party Time"],
		...masteryChallenges
	},
}
