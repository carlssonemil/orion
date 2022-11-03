import defaultSniperRiflesProgress from '../defaults/progress/weapons/sniperRifles'

const base = ['MCPR-300', 'Signal 50', 'LA-B 330', 'SP-X 80']

const dlc = []

export default [...base, ...dlc].map((weapon) => ({
	category: 'Sniper Rifles',
	name: weapon,
	dlc: dlc.includes(weapon),
	progress: {
		...defaultSniperRiflesProgress[weapon],
		Gold: false,
		Platinum: false,
		Polyatomic: false,
	},
}))
