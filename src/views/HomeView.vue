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
			<FiltersComponent :options="filterOptions" :show-info="true">
				<template #info>
					<IconComponent
						name="question-circle"
						fill="white"
						v-tippy="{ placement: 'bottom' }"
						:content="'You only need to complete the number of base guns there are for each category to earn the Platinum camouflage challenge. For example, the Assault Rifles requires a total of 8 Gold camouflages to unlock the Platinum camouflage challenge for all weapons in that category. Press this icon to read more.'"
						@click="$router.push('/requirements')" />
					<div class="mobile">
						<IconComponent name="question-circle" fill="white"></IconComponent>
						<p>
							You only need to complete the number of base guns there are for each category to earn
							the Platinum camouflage challenge. For example, the Assault Rifles requires a total of
							8 Gold camouflages to unlock the Platinum camouflage challenge for all weapons in that
							category. Read more
							<router-link to="/requirements">here</router-link>.
						</p>
					</div>
				</template>
			</FiltersComponent>
			<LayoutToggleComponent />
		</div>

		<WeaponsComponent :weapons="filteredWeapons" />

		<ProgressComponent
			:progress="orionProgress"
			label="Orion progress"
			tooltip="Progress towards the Orion camouflage">
			<template #modal-header>Orion unlocked! 👏🥳</template>
			<template #modal-body>
				<p>
					Congratulations on finishing the Orion camouflage grind! It's been a long ride! You first
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
			]
		},

		filteredWeapons() {
			let filteredWeapons = this.weapons
			const { hideGold, hidePlatinum, hidePolyatomic, weaponCategory } = this.filters

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

		orionProgress() {
			// Set the amount of required weapons to complete the Orion camouflage
			const requiredWeapons = this.weapons.filter((weapon) => !weapon.dlc).length

			// Sort and filter out the weapons with the most progress
			const mostProgressedWeapons = this.weapons
				.map((weapon) => {
					let totalCamouflages = Object.keys(weapon.progress).length
					let completedCamouflages = Object.values(weapon.progress).reduce((a, b) => a + b, 0)

					return {
						...weapon,
						completed: Object.values(weapon.progress).reduce((a, b) => a + b, 0),
						completedPercentage: completedCamouflages / totalCamouflages,
					}
				})
				.sort((a, b) => b.completedPercentage - a.completedPercentage)
				.splice(0, requiredWeapons)

			// Count the amount of camouflages completed for the most progress weapons
			const totalCamouflagesCompleted = mostProgressedWeapons.reduce((a, b) => a + b.completed, 0)

			// Count the required amount of camouflages to complete the Orion camouflage
			const requiredCamouflages = mostProgressedWeapons.reduce((a, b) => {
				return a + Object.keys(b.progress).length
			}, 0)

			return roundToTwoDecimals((totalCamouflagesCompleted / requiredCamouflages) * 100)
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
