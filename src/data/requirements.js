import assaultRiflesRequiresments from './requirements/assaultRifles'
import battleRiflesRequirements from './requirements/battleRifles'
import subMachineGunsRequirements from './requirements/subMachineGuns'
import shotgunsRequirements from './requirements/shotguns'
import lightMachineGunsRequirements from './requirements/lightMachineGuns'
import marksmanRiflesRequirements from './requirements/marksmanRifles'
import sniperRiflesRequirements from './requirements/sniperRifles'
import handgunsRequirements from './requirements/handguns'
import launchersRequirements from './requirements/launchers'
import meleeRequirements from './requirements/melee'

export default {
	'Assault Rifles': {
		...assaultRiflesRequiresments,
	},
	'Battle Rifles': {
		...battleRiflesRequirements,
	},
	'Sub Machine Guns': {
		...subMachineGunsRequirements,
	},
	'Shotguns': {
		...shotgunsRequirements,
	},
	'Light Machine Guns': {
		...lightMachineGunsRequirements,
	},
	'Marksman Rifles': {
		...marksmanRiflesRequirements,
	},
	'Sniper Rifles': {
		...sniperRiflesRequirements,
	},
	'Handguns': {
		...handgunsRequirements,
	},
	'Launchers': {
		...launchersRequirements,
	},
	'Melee': {
		...meleeRequirements,
	},
}
