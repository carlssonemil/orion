<template>
	<div class="progress">
		<ModalComponent ref="modal">
			<template #header>Orion unlocked! 👏🥳</template>
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
		</ModalComponent>

		<transition name="slideup">
			<div v-show="showBars" class="bars">
				<div
					class="progress"
					v-tippy="{
						content: 'Progress towards the Orion camouflage',
						maxWidth: 500,
					}">
					<div class="bar" :style="{ width: orionProgress + '%' }"></div>
					<label>
						Orion progress: <span>{{ orionProgress }}%</span>
					</label>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import { mapState } from 'pinia'
import { useStore } from '@/stores/store'
import { daysBetweenDates, roundToTwoDecimals } from '@/utils/utils'
import Confetti from '@/utils/confetti'

export default {
	data() {
		return {
			showBars: false,
		}
	},

	computed: {
		...mapState(useStore, ['weapons', 'weaponCategories', 'beganGrind']),

		getBeganGrind() {
			return this.beganGrind ?? new Date();
		},

		daysSinceStart() {
			const days = daysBetweenDates(this.getBeganGrind, new Date())
			return days ? days : 1
		},

		orionProgress() {
			const progress = {}

			// Loop over each weapon category
			this.weaponCategories.forEach((category) => {
				const categoryWeapons = this.weapons.filter((weapon) => weapon.category === category)

				// Set the number of camouflages for each weapon category
				const camouflageMultiplier = ['Melee', 'Launchers'].includes(category) ? 4 : 7

				// Set the amount of required weapons to complete the Orion camouflage
				const requiredWeapons = categoryWeapons.filter((weapon) => !weapon.dlc).length

				// Set the amount of required camouflages to complete the Orion camouflage
				const requiredCamouflages = requiredWeapons * camouflageMultiplier

				// Sort and filter out the weapons with the most progress
				const mostProgressedWeapons = categoryWeapons
					.map((weapon) => {
						return {
							...weapon,
							camouflagesCompleted: Object.values(weapon.progress).reduce((a, b) => a + b, 0),
						}
					})
					.sort((a, b) => b.camouflagesCompleted - a.camouflagesCompleted)
					.splice(0, requiredWeapons)

				// Count the amount of camouflages completed for the most progressed weapons
				const totalCamouflagesCompleted = mostProgressedWeapons.reduce(
					(a, b) => a + b.camouflagesCompleted,
					0
				)

				// Set the progress for the category
				progress[category] =
					totalCamouflagesCompleted / requiredCamouflages > 1
						? 1
						: totalCamouflagesCompleted / requiredCamouflages
			})

			return roundToTwoDecimals(this.average(Object.values(progress)) * 100)
		},
	},

	watch: {
		orionProgress(value) {
			if (value >= 100) {
				this.handleCompleted()
			}
		},
	},

	mounted() {
		setTimeout(() => {
			this.showBars = true
		}, 500)
	},

	methods: {
		average(arr) {
			return arr.reduce((p, c) => p + c, 0) / arr.length
		},

		handleCompleted() {
			const DURATION = 10000
			const LENGTH = 120

			new Confetti({
				duration: DURATION,
				heigth: window.innerHeight,
				length: LENGTH,
				width: document.body.clientWidth,
			})

			this.$refs.modal.open()

			setTimeout(() => {
				let canvas = document.querySelector('canvas')
				canvas.parentNode.removeChild(canvas)
			}, DURATION)
		},
	},
}
</script>

<style lang="scss" scoped>
::v-deep .modal-header {
	background-image: $orion-gradient-alt;
}

.bars {
	bottom: 0;
	left: 0;
	overflow: hidden;
	position: fixed;
	user-select: none;
	width: 100%;
	z-index: 10;

	.progress {
		background: $elevation-4-color;
		display: block;
		height: 35px;
		position: relative;
		width: 100%;

		.bar {
			background-image: $orion-gradient-alt;
			display: block;
			height: 100%;
			transition: $transition;
		}

		label {
			font-size: 12px;
			left: 50%;
			position: absolute;
			transform: translate(-50%, -50%);
			top: 50%;
			white-space: nowrap;

			span {
				font-weight: 600;
			}
		}
	}
}
</style>
