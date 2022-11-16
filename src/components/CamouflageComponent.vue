<template>
	<div :class="['camouflage-wrapper', { favorite: isFavorite }]">
		<div
			:class="['camouflage', `camouflage-layout-${layout}`]"
			@click="handleToggleCompleted(camouflage)"
			:content="requirementTooltip(camouflage)"
			v-tippy="{ placement: 'bottom' }">
			<div :class="['inner', this.isCompleted ? 'completed' : '']">
				<img
					:src="imageUrl(camouflage.name)"
					:alt="camouflage.name"
					onerror="javascript:this.src='/base-gradient.svg'" />
				<IconComponent class="complete" name="check" fill="#10ac84" size="30" />
				<IconComponent class="remove" name="times" fill="#ee5253" size="30" />
				<div class="info">
					<span class="name">{{ camouflage.name }}</span>
					<span class="requirement">{{ requirementTooltip(camouflage) }}</span>
				</div>
			</div>
		</div>

		<IconComponent
			class="favorite-icon"
			name="star"
			:fill="isFavorite ? '#feca57' : 'gray'"
			icon-style="solid"
			size="25"
			@click="toggleFavorite({ type: 'camouflages', name: camouflage.name })"
			v-tippy="{ content: `${isFavorite ? 'Remove from' : 'Add to'} favorites` }" />
	</div>
</template>

<script>
import { useStore } from '@/stores/store'
import { convertToKebabCase } from '@/utils/utils'
import { mapActions, mapState } from 'pinia'

const store = useStore()

export default {
	data() {
		return {
			isCompleted: this.camouflage.isCompleted,
		}
	},

	props: {
		camouflage: {
			type: Object,
			required: true,
		},
	},

	computed: {
		...mapState(useStore, ['camouflageRequirements', 'preferences']),

		layout() {
			return this.preferences.layout
		},

		isFavorite() {
			return store.isFavorite('camouflages', this.camouflage.name)
		},
	},

	methods: {
		convertToKebabCase,
		...mapActions(useStore, [
			'toggleCamouflageCompleted',
			'toggleGoldCamouflageCompleted',
			'toggleFavorite',
		]),

		imageUrl(camouflageName) {
			if (camouflageName === 'Gold') {
				return new URL('/gold-gradient.svg', import.meta.url)
			} else if (camouflageName === 'Platinum') {
				return new URL('/platinum-gradient.svg', import.meta.url)
			} else if (camouflageName === 'Polyatomic') {
				return new URL('/polyatomic-gradient.svg', import.meta.url)
			}

			return new URL(
				`../assets/camouflages/${convertToKebabCase(camouflageName)}.png`,
				import.meta.url
			)
		},

		requirementTooltip(camouflage) {
			const requirement = this.camouflageRequirements[camouflage.category][camouflage.name]
			return `Get the ${requirement.weapon} to level ${requirement.level} - ${
				requirement.challenge || 'TBA'
			}`
		},

		handleToggleCompleted(camouflage) {
			const weaponName = this.camouflageRequirements[camouflage.category][camouflage.name].weapon
			this.toggleCamouflageCompleted(weaponName, camouflage.name, this.isCompleted)
			this.toggleIsCompleted()
		},

		toggleIsCompleted() {
			this.isCompleted = !this.isCompleted
		},
	},
}
</script>

<style lang="scss" scoped>
.camouflage-wrapper {
	position: relative;

	&.favorite .favorite-icon {
		opacity: 1 !important;
	}

	&:hover {
		.favorite-icon {
			opacity: 1;
		}
	}

	.favorite-icon {
		cursor: pointer;
		opacity: 0;
		position: absolute;
		right: 0;
		top: 0;
		transition: $transition;
		transform: translate(50%, -50%);
		z-index: 2;

		@media (max-width: $tablet) {
			opacity: 1 !important;
			transform: translate(50%, -50%) scale(1.25);
		}
	}

	.camouflage {
		user-select: none;

		&.camouflage-layout-grid > .inner {
			flex-direction: column;
			justify-content: center;

			&.completed > .info {
				opacity: 0.5;
			}

			img {
				height: 80px;
				object-fit: cover;
				position: relative;
				width: 100%;
				z-index: 1;
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

			.info {
				padding: 8px;

				.name {
					font-size: 14px;
				}
			}
		}

		&.camouflage-layout-list > .inner {
			$image-size: 100px;
			background: $elevation-1-color;
			flex-direction: row;

			&.completed > .info {
				opacity: 0.5;
			}

			img {
				height: $image-size;
				position: relative;
				width: $image-size;
				z-index: 1;
			}

			.icon-component {
				left: calc($image-size / 2);
				opacity: 0;
				position: absolute;
				transform: translate(-50%, -50%);
				transition: $transition;
				top: 50%;
				z-index: 2;
			}

			.info {
				padding: 0 20px;
				text-align: left;

				.name {
					font-weight: 500;
				}

				.requirement {
					display: block;
					font-size: 14px;
					line-height: 1.5;
					margin-top: 10px;
				}
			}
		}

		.inner {
			align-items: center;
			background: $elevation-2-color;
			border-radius: $border-radius;
			cursor: pointer;
			display: flex;
			height: 100%;
			overflow: hidden;
			position: relative;
			transition: $transition;
			width: 100%;

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

			.info {
				transition: opacity $transition;

				.requirement {
					display: none;
				}
			}

			p {
				font-size: 14px;
			}
		}
	}
}
</style>
