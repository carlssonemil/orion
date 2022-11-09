<template>
	<div>
		<transition-group name="fade" tag="div" class="container">
			<div
				v-for="(category, title, index) in camouflages"
				:key="title"
				:data-index="index"
				class="category">
				<!-- TODO: Add double-click functionality -->
				<h2>
					<span>
						{{ title }}
					</span>
					<span v-tippy content="Camouflage progress for category">
						{{ categoryProgress(title) }}
					</span>
				</h2>

				<transition-group name="fade" tag="div" class="camouflages">
					<CamoComponent v-for="camouflage in category" :key="camouflage.name" :camouflage="camouflage" />
				</transition-group>
			</div>
		</transition-group>

		<div v-if="Object.keys(camouflages).length === 0" class="finished-placeholder">
			<p>You have completed all camouflage challenges 👏</p>
		</div>
	</div>
</template>

<script>
import { mapState } from 'pinia'
import { useStore } from '@/stores/store'
// import allCamos from '../data/camouflages'
import CamoComponent from '@/components/CamoComponent.vue'

export default {
	components: {
		CamoComponent,
	},

	props: {
		camouflages: {
			type: Object,
			required: true,
		},
	},

	computed: {
		...mapState(useStore, ['weapons']),
	},

	methods: {
		categoryProgress(categoryTitle) {
			let completed = 0
			const categoryCamos = this.camouflages[categoryTitle].map((catCamo) => catCamo.name)
			const totalCamos = categoryCamos.length
			// get all completed camouflages in category
			let allCamoProgress = this.getAllCamoProgress()

			categoryCamos.forEach((camouflage) => {
				// Reference camouflage by name to get current state. Id would be better here
				if (allCamoProgress[camouflage]) completed++
			})

			return `${completed}/${totalCamos}`
		},
		getAllCamoProgress() {
			return this.weapons
				.map((item) => item.progress)
				.reduce(function (acc, x) {
					for (var key in x) acc[key] = x[key]
					return acc
				}, {})
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

		.camouflages {
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
