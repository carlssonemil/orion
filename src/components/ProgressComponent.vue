<template>
	<div class="progress">
		<ModalComponent ref="modal">
			<template #header>
				<slot name="modal-header" />
			</template>

			<slot name="modal-body" />
		</ModalComponent>

		<transition name="slideup">
			<div v-show="showBars" class="bars">
				<div
					class="progress"
					v-tippy="{
						content: tooltip,
						maxWidth: 500,
					}">
					<div class="bar" :style="{ width: progress + '%' }"></div>
					<label>
						{{ label }}: <span>{{ progress }}%</span>
					</label>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import Confetti from '@/utils/confetti'

export default {
	props: {
		progress: {
			type: Number,
			required: true,
		},

		label: {
			type: String,
			required: true,
		},

		tooltip: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			showBars: false,
		}
	},

	watch: {
		progress(value) {
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
