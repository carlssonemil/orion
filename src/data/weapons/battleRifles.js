import defaultBattleRiflesProgress from '../defaults/progress/weapons/battleRifles'

const base = ['Lachmann-762', 'SO-14', 'TAQ-V', 'FTAC Recon']

const dlc = []

export default [...base, ...dlc].map((weapon) => ({
	category: 'Battle Rifles',
	name: weapon,
	dlc: dlc.includes(weapon),
	progress: {
		...defaultBattleRiflesProgress[weapon],
		Gold: false,
		Platinum: false,
		Polyatomic: false,
	},
}))
