<template>
	<div>
		<transition-group name="fade" tag="div" class="container">
			<div
				v-for="(category, title, index) in camos"
				:key="title"
				:data-index="index"
				class="category">
				<!-- TODO: Add double-click functionality -->
				<h2>
					<span>
						{{ title }}
					</span>
					<!-- <span v-tippy content="Required for Platinum camouflage">
						{{ categoryProgress(title) }}
					</span> -->
				</h2>

				<transition-group name="fade" tag="div" class="camos">
					<CamoComponent
						v-for="camo in category"
						:key="camo.name"
						:camo="camo" />
				</transition-group>
			</div>
		</transition-group>

		<div v-if="Object.keys(camos).length === 0" class="finished-placeholder">
			<p>You have completed all camouflage challenges 👏</p>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'pinia'
import { useStore } from '@/stores/store'
import { filterObject } from '@/utils/utils'
import CamoComponent from '@/components/CamoComponent.vue'

export default {
	components: {
		CamoComponent,
	},

	props: {
		camos: {
			type: Object,
			required: true,
		},
	},

	computed: {

	},

	methods: {
		...mapActions(useStore, ['toggleCategoryCompleted']),

		categoryProgress(title) {
			const categoryWeapons = this.camos[title]
			const required = categoryWeapons.filter((weapon) => !weapon.dlc).length
			const completed = categoryWeapons.reduce(
				(a, weapon) =>
					a + Object.values(filterObject(weapon.progress, ['Polyatomic'])).every(Boolean),
				0
			)

			return completed > required
				? `${required}/${required}`
				: `${Math.floor(completed)}/${required}`
		},

		categoryCompleted(category) {
			const required = category.filter((weapon) => !weapon.dlc).length
			const completed = category.reduce(
				(a, weapon) =>
					a + Object.values(filterObject(weapon.progress, ['Polyatomic'])).every(Boolean),
				0
			)

			return completed >= required
		},
	},
}
</script>

<style lang="scss" scoped>
.container {
	width: 100%;

	.category {
		cursor: default;

		+ .category {
			margin-top: 75px;

			@media (max-width: $tablet) {
				margin-top: 100px;
			}
		}

		h2 {
			align-items: center;
			display: inline-flex;
			justify-content: space-between;
			font-size: 24px;
			font-weight: 600;
			margin-bottom: 25px;
			width: 100%;

			span:last-child {
				color: $elevation-9-color;
				font-size: 18px;
				margin-left: 10px;
			}

			@media (max-width: $tablet) {
				margin-bottom: 35px;
			}
		}

		.camos {
			display: grid;
			gap: 30px;
			grid-template-columns: repeat(5, 1fr);
			width: 100%;

			@media (max-width: $tablet) {
				grid-template-columns: 1fr;
			}
		}
	}
}

.finished-placeholder {
	color: darken(white, 50%);
	margin-top: 10vh;
	text-align: center;
	width: 100%;

	p {
		font-size: 22px;
		line-height: 1.7;

		@media (max-width: $tablet) {
			font-size: 24px;
		}
	}
}
</style>
