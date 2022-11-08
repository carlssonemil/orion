<template>
	<div class="container">
		<AlertComponent style="margin-bottom: 30px">
			This tracker is currently under development and more content will be added continuously during
			the coming weeks. Please report any bugs or issues by emailing me at
			<a href="mailto:hello@emilcarlsson.se">hello@emilcarlsson.se</a>, or opening issues on
			<a href="https://github.com/carlssonemil/orion/issues/new">GitHub</a>. Thanks and good luck
			with the grind! ✌
		</AlertComponent>
		<FiltersComponent />
		<CamosComponent :camos="filteredCamos" />
		<ProgressComponent />
	</div>
</template>

<script>
import { mapState } from 'pinia'
import { useStore } from '@/stores/store'
import { groupBy, filterObject } from '@/utils/utils'
import allCamos from '../data/camos'

import AlertComponent from '@/components/AlertComponent.vue'
import FiltersComponent from '@/components/FiltersComponent.vue'
import CamosComponent from '@/components/CamosComponent.vue'
import ProgressComponent from '@/components/ProgressComponent.vue'

export default {
	components: {
		AlertComponent,
		FiltersComponent,
		CamosComponent,
		ProgressComponent,
	},

	computed: {
		...mapState(useStore, ['camoRequirements', 'weapons', 'filters']),

		filteredCamos() {
			let filteredWeapons = this.weapons
			const { hideGold, hidePlatinum, hidePolyatomic, hideNonRequired, category } = this.filters

			if (hideNonRequired) {
				filteredWeapons = filteredWeapons.filter((weapon) => !weapon.dlc)
			}

			if (hideGold) {
				filteredWeapons = filteredWeapons.filter(
					(weapon) =>
						!Object.values(filterObject(weapon.progress, ['Platinum', 'Polyatomic'])).every(Boolean)
				)
			}

			if (hidePlatinum) {
				filteredWeapons = filteredWeapons.filter(
					(weapon) => !Object.values(filterObject(weapon.progress, ['Polyatomic'])).every(Boolean)
				)
			}

			if (hidePolyatomic) {
				filteredWeapons = filteredWeapons.filter(
					(weapon) => !Object.values(weapon.progress).every(Boolean)
				)
			}

			if (category && category !== 'null') {
				filteredWeapons = filteredWeapons.filter((weapon) => weapon.category === category)
			}
			let allCamoProgress = filteredWeapons.map((item) => item.progress)
			//Can filter by % mastery here

			// Flattens the object array
			allCamoProgress = allCamoProgress.reduce(function (acc, x) {
			for (var key in x) acc[key] = x[key]
				return acc
			}, {})

			let weaponNames = filteredWeapons.map((item) => item.name)

			var allCamoCategories = [
				'Spray Paint',
				'Woodland',
				'Digital',
				'Dragon',
				'Geometric',
				'Fun',
				'Foliage',
				'Skulls',
				'Tiger',
				'Stripes',
				'Reptile',
				'Solid Colors',
				'Classic',
				'Cliffside',
			]
			var filteredCamos = allCamos.filter(
				(camo) =>
					allCamoCategories.some((s) => s == camo.category) &&
					!weaponNames.some((s) => s == camo.weapon)
			)
			filteredCamos = filteredCamos.map((camo) => {
				camo.isCompleted = allCamoProgress[camo.name] ?? false
				return camo
			})

			var returnVal = groupBy(filteredCamos, (camo) => camo.category)
			return returnVal
		},
	},
}
</script>

<style lang="scss" scoped>
.container {
	text-align: center;
}

h1 {
	margin-top: 75px;
}

h2 {
	margin: 30px auto 0;
	max-width: 450px;
}
</style>
