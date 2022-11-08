<template>
	<div class="camo">
		<div
			:key="camo.name"
			:class="['camouflage']"
			@click="handleToggleCompleted(camo)"
			:content="requirementTooltip(camo)"
			v-tippy="{ placement: 'bottom' }">
			<div :class="['inner', this.isCompleted ? 'completed' : '']">
				<img
				:src="imageUrl(camo.name)"
				:alt="camo.name"
				onerror="javascript:this.src='/base-gradient.svg'" />
				<IconComponent class="complete" name="check" fill="#10ac84" />
				<IconComponent class="remove" name="times" fill="#ee5253" />
				<span>
					{{ camo.name }}
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import { useStore } from '@/stores/store'
import { convertToKebabCase } from '@/utils/utils'
import { mapActions, mapState } from 'pinia'

export default {
	data() {
		return {
			isCompleted: this.camo.isCompleted,
		}
	},
	props: {
		camo: {
			type: Object,
			required: true,
		},
	},
	computed: {
		...mapState(useStore, ['camoRequirements']),
	},

	methods: {
		convertToKebabCase,
		...mapActions(useStore, ['toggleCamouflageCompleted', 'toggleGoldCamouflageCompleted']),

		imageUrl(camoName) {
			if (camoName === 'Gold') {
				return new URL('/gold-gradient.svg', import.meta.url)
			} else if (camoName === 'Platinum') {
				return new URL('/platinum-gradient.svg', import.meta.url)
			} else if (camoName === 'Polyatomic') {
				return new URL('/polyatomic-gradient.svg', import.meta.url)
			}

			return new URL(`../assets/camouflages/${convertToKebabCase(camoName)}.png`, import.meta.url)
		},

		imageExists(camoName) {
			const url = this.imageUrl(camoName)
			const img = new Image()
			img.src = url
			return img.height !== 0
		},

		requirementTooltip(camo) {
			const requirement = this.camoRequirements[camo.category][camo.name]
			return `Get the ${requirement.weapon} to level ${requirement.level} - ${
				requirement.challenge || 'TBA'
			}`
		},

		handleToggleCompleted(camo) {
			const weaponName = this.camoRequirements[camo.category][camo.name].weapon
			this.toggleCamouflageCompleted(weaponName, camo.name, this.isCompleted)
			this.toggleIsCompleted()
		},
		toggleIsCompleted() {
			this.isCompleted = !this.isCompleted
		},
	},
}
</script>

<style lang="scss" scoped>
.camo {
	position: relative;

	.name {
		$padding: 25px;
		align-items: center;
		background: $elevation-3-color;
		border-radius: $border-radius;
		display: flex;
		font-weight: 600;
		justify-content: center;
		padding: $padding 0;
		position: relative;
		transition: $transition;
		user-select: none;

		@media (max-width: $tablet) {
			font-size: 18px;
			padding: #{$padding * 2} $padding;
		}
	}

	.camouflage {
		user-select: none;

		.inner {
			align-items: center;
			background: $elevation-2-color;
			border-radius: $border-radius;
			cursor: pointer;
			display: flex;
			height: 100%;
			justify-content: center;
			overflow: hidden;
			position: relative;
			transition: $transition;
			width: 100%;
			flex-direction: column;

			span {
				padding: 10px;
			}

			&:hover {
				@media (min-width: $tablet) {
					img,
					p {
						opacity: 0.25;
					}

					.icon-component.complete {
						opacity: 1;
					}
				}
			}

			&.completed {
				&:hover {
					@media (min-width: $tablet) {
						.icon-component.complete {
							opacity: 0;
						}
						.icon-component.remove {
							opacity: 1;
						}
					}
				}

				img,
				p {
					opacity: 0.25;
				}

				.icon-component {
					&.complete {
						opacity: 1;
					}

					&.remove {
						opacity: 0;
					}
				}
			}

			&.disabled {
				cursor: not-allowed;

				&:hover {
					img,
					p {
						opacity: 1;
					}

					.icon-component {
						opacity: 0;
					}
				}
			}

			.icon-component {
				left: 50%;
				opacity: 0;
				position: absolute;
				transform: translate(-50%, -50%);
				transition: $transition;
				top: 35%;
				z-index: 2;
			}

			img {
				height: 80px;
				object-fit: cover;
				position: relative;
				width: 100%;
				z-index: 1;
			}

			p {
				font-size: 14px;
			}
		}
	}
}
</style>
