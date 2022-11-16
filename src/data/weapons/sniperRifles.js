import defaultSniperRiflesProgress from '../defaults/progress/sniperRifles'

const base = ['MCPR-300', 'Signal 50', 'LA-B 330', 'SP-X 80']

const dlc = ['Victus XMR']

const comingSoon = []

export default [...base, ...dlc].map((weapon) => ({
	category: 'Sniper Rifles',
	name: weapon,
	dlc: dlc.includes(weapon),
	comingSoon: comingSoon.includes(weapon),
	progress: {
		...defaultSniperRiflesProgress[weapon],
		Gold: false,
		Platinum: false,
		Polyatomic: false,
	},
}))
