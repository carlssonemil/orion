import campaign from './calling_cards/campaign'
import dmz from './calling_cards/dmz'
import multiplayer from './calling_cards/multiplayer'
import operator from './calling_cards/operator'
import prestige from './calling_cards/prestige'
import season from './calling_cards/season'
import twitch from './calling_cards/twitch'
import warzone from './calling_cards/warzone'

export default [
	...operator,
	...campaign,
	...multiplayer,
	...dmz,
	...warzone,
	...prestige,
	...twitch,
	...season,
]
