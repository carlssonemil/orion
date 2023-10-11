import assaultRiflesRequiresments from './requirements/weapons/assaultRifles'
import battleRiflesRequirements from './requirements/weapons/battleRifles'
import handgunsRequirements from './requirements/weapons/handguns'
import launchersRequirements from './requirements/weapons/launchers'
import lightMachineGunsRequirements from './requirements/weapons/lightMachineGuns'
import marksmanRiflesRequirements from './requirements/weapons/marksmanRifles'
import meleeRequirements from './requirements/weapons/melee'
import shotgunsRequirements from './requirements/weapons/shotguns'
import sniperRiflesRequirements from './requirements/weapons/sniperRifles'
import subMachineGunsRequirements from './requirements/weapons/subMachineGuns'

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
