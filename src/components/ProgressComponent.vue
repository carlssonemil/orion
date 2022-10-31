<template>
	<div class="progress">
		<ModalComponent ref="modal">
			<template #header>Orion unlocked! 👏🥳</template>
			<p>
				Congratulations on finishing the Orion camouflage grind! It's been a long ride! You first
				started tracking your grind here
				<b>{{ daysSinceStart }} days ago</b> on
				{{ new Date(beganGrind).toLocaleDateString('en-US') }}.
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
		...mapState(useStore, ['weapons', 'categories', 'beganGrind']),

		daysSinceStart() {
			return daysBetweenDates(this.beganGrind, new Date())
		},

		orionProgress() {
			const progress = {}

			this.categories.forEach((category) => {
				const categoryWeapons = this.weapons.filter((weapon) => weapon.category === category)
				const required = categoryWeapons.filter((weapon) => !weapon.dlc).length
				const completed = categoryWeapons.reduce(
					(a, weapon) => a + Object.values(weapon.progress).every(Boolean),
					0
				)
				progress[category] = completed / required > 1 ? 1 : completed / required
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
