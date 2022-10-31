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
		<WeaponsComponent :weapons="filteredWeapons" />
		<ProgressComponent />
	</div>
</template>

<script>
import { mapState } from 'pinia'
import { useStore } from '@/stores/store'
import { groupBy, filterObject } from '@/utils/utils'

import AlertComponent from '@/components/AlertComponent.vue'
import FiltersComponent from '@/components/FiltersComponent.vue'
import WeaponsComponent from '@/components/WeaponsComponent.vue'
import ProgressComponent from '@/components/ProgressComponent.vue'

export default {
	components: {
		AlertComponent,
		FiltersComponent,
		WeaponsComponent,
		ProgressComponent,
	},

	computed: {
		...mapState(useStore, ['weapons', 'filters']),

		filteredWeapons() {
			let filteredWeapons = this.weapons
			const { hideGold, hideCompleted, hideNonRequired, category } = this.filters

			if (hideNonRequired) filteredWeapons = filteredWeapons.filter((weapon) => !weapon.dlc)
			if (hideGold)
				filteredWeapons = filteredWeapons.filter(
					(weapon) => !Object.values(filterObject(weapon.progress, ['Polyatomic'])).every(Boolean)
				)
			if (hideCompleted)
				filteredWeapons = filteredWeapons.filter(
					(weapon) => !Object.values(weapon.progress).every(Boolean)
				)
			if (category && category !== 'null')
				filteredWeapons = filteredWeapons.filter((weapon) => weapon.category === category)

			return groupBy(filteredWeapons, (weapon) => weapon.category)
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
