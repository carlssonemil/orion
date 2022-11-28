<template>
	<div class="container">
		<div class="filter-container">
			<FiltersComponent :options="filterOptions" />
			<LayoutToggleComponent />
		</div>

		<WeaponsComponent :weapons="filteredWeapons" :mastery="true" />

		<ProgressComponent
			:progress="masteryProgress"
			label="Mastery progress"
			tooltip="Progress towards completing all mastery challenges">
			<template #modal-header>Mastery challenges completed 👏🥳</template>
			<template #modal-body>
				<p>
					Congratulations on finishing all mastery challenges! That's quite the feat! You first
					started tracking your grind here
					<b>{{ daysSinceStart }} days ago</b> on
					{{ new Date(getBeganGrind).toLocaleDateString('en-US') }}.
				</p>
				<p style="margin-top: 15px; font-size: 14px; color: #aaa">
					If you liked this tracker, show your appreciation by spreading the word about it and if
					you're feeling generous please consider
					<a href="https://www.buymeacoffee.com/emilcarlsson" target="_blank">buying me a beer</a>
					as a thanks. Hope I see you on the battlefield! Cheers! 🍺
				</p>
			</template>
		</ProgressComponent>
	</div>
</template>

<script>
import { mapState } from 'pinia'
import { useStore } from '@/stores/store'
import { groupBy, daysBetweenDates, roundToTwoDecimals } from '@/utils/utils'

import FiltersComponent from '@/components/FiltersComponent.vue'
import WeaponsComponent from '@/components/WeaponsComponent.vue'
import ProgressComponent from '@/components/ProgressComponent.vue'
import LayoutToggleComponent from '@/components/LayoutToggleComponent.vue'

export default {
	components: {
		FiltersComponent,
		WeaponsComponent,
		ProgressComponent,
		LayoutToggleComponent,
	},

	computed: {
		...mapState(useStore, ['weapons', 'filters', 'weaponCategories', 'beganGrind']),

		getBeganGrind() {
			return this.beganGrind ?? new Date()
		},

		daysSinceStart() {
			const days = daysBetweenDates(this.getBeganGrind, new Date())
			return days ? days : 1
		},

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
				{
					label: 'Hide Orion',
					key: 'hideOrion',
					type: 'checkbox',
				},
			]
		},

		filteredWeapons() {
			let filteredWeapons = this.weapons
			const { hideGold, hidePlatinum, hidePolyatomic, hideOrion, weaponCategory } = this.filters

			if (hideGold) {
				filteredWeapons = filteredWeapons.filter((weapon) => !weapon.masteryProgress['Gold'])
			}

			if (hidePlatinum) {
				filteredWeapons = filteredWeapons.filter((weapon) => !weapon.masteryProgress['Platinum'])
			}

			if (hidePolyatomic) {
				filteredWeapons = filteredWeapons.filter((weapon) => !weapon.masteryProgress['Polyatomic'])
			}

			if (hideOrion) {
				filteredWeapons = filteredWeapons.filter((weapon) => !weapon.masteryProgress['Orion'])
			}

			if (weaponCategory && weaponCategory !== 'null') {
				filteredWeapons = filteredWeapons.filter((weapon) => weapon.category === weaponCategory)
			}

			return groupBy(filteredWeapons, (weapon) => weapon.category)
		},

		masteryProgress() {
			const total = this.weapons.length * 4
			const completed = this.weapons.reduce(
				(acc, weapon) => acc + Object.values(weapon.masteryProgress).reduce((a, b) => a + b, 0),
				0
			)

			return roundToTwoDecimals((completed / total) * 100)
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
