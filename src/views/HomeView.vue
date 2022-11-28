<template>
	<div class="container">
		<AlertComponent style="margin-bottom: 30px">
			This tracker is currently under development and more content will be added continuously during
			the coming weeks. Please report any bugs or issues by emailing me at
			<a href="mailto:hello@emilcarlsson.se">hello@emilcarlsson.se</a>, or opening issues on
			<a href="https://github.com/carlssonemil/orion/issues/new">GitHub</a>. Thanks and good luck
			with the grind! ✌
		</AlertComponent>
		<div class="filter-container">
			<FiltersComponent :options="filterOptions" :show-info="true" />
			<LayoutToggleComponent />
		</div>
		<WeaponsComponent :weapons="filteredWeapons" />
		<ProgressComponent />
	</div>
</template>

<script>
import { mapState } from 'pinia'
import { useStore } from '@/stores/store'
import { groupBy } from '@/utils/utils'

import AlertComponent from '@/components/AlertComponent.vue'
import FiltersComponent from '@/components/FiltersComponent.vue'
import WeaponsComponent from '@/components/WeaponsComponent.vue'
import ProgressComponent from '@/components/ProgressComponent.vue'
import LayoutToggleComponent from '@/components/LayoutToggleComponent.vue'

export default {
	components: {
		AlertComponent,
		FiltersComponent,
		WeaponsComponent,
		ProgressComponent,
		LayoutToggleComponent,
	},

	computed: {
		...mapState(useStore, ['weapons', 'filters', 'weaponCategories']),

		filterOptions() {
			return [
				{
					label: 'Category',
					key: 'weaponCategory',
					type: 'select',
					options: this.weaponCategories,
				},
				{
					label: 'Hide Gold',
					key: 'hideGold',
					type: 'checkbox',
				},
				{
					label: 'Hide Platinum',
					key: 'hidePlatinum',
					type: 'checkbox',
				},
				{
					label: 'Hide Polyatomic',
					key: 'hidePolyatomic',
					type: 'checkbox',
				},
			]
		},

		filteredWeapons() {
			let filteredWeapons = this.weapons
			const { hideGold, hidePlatinum, hidePolyatomic, hideNonRequired, weaponCategory } =
				this.filters

			if (hideNonRequired) {
				filteredWeapons = filteredWeapons.filter((weapon) => !weapon.dlc)
			}

			if (hideGold) {
				filteredWeapons = filteredWeapons.filter((weapon) => !weapon.progress['Gold'])
			}

			if (hidePlatinum) {
				filteredWeapons = filteredWeapons.filter((weapon) => !weapon.progress['Platinum'])
			}

			if (hidePolyatomic) {
				filteredWeapons = filteredWeapons.filter((weapon) => !weapon.progress['Polyatomic'])
			}

			if (weaponCategory && weaponCategory !== 'null') {
				filteredWeapons = filteredWeapons.filter((weapon) => weapon.category === weaponCategory)
			}

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

.filter-container {
	align-items: center;
	display: flex;
	width: 100%;

	@media (max-width: $tablet) {
		flex-direction: column;

		::v-deep .filters-component {
			margin-bottom: 20px;
			margin-right: 0;
			width: 100%;
		}
	}
}

::v-deep .filters-component {
	flex-grow: 1;
	margin-right: 15px;
}
</style>
