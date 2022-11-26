<template>
	<div :class="['weapon', { 'coming-soon': weapon.comingSoon }]">
		<div
			:class="[
				'name', `${layout === 'grid' ? 'grid' : 'list'}`,
				{
					gold: goldCompleted,
					platinum: platinumCompleted,
					polyatomic: polyatomicCompleted,
				},
			]"
			@dblclick="toggleWeaponCompleted(weapon, completed)"
			v-tippy="{ content: `Double-click to ${completed ? 'reset' : 'complete'} weapon` }">
			{{ weapon.name }}
		</div>

		<div
			v-if="!weapon.comingSoon"
			class="progress"
			:style="{
				'grid-template-rows': `${ layout === 'list' ?  'repeat(' + Object.keys(camouflages).length + ', 1fr)' : ''}`,
				'grid-template-columns': `${layout === 'grid' ? 'repeat(' + Object.keys(camouflages).length + ', 1fr)' : ''}`,
			}">
			<div
				v-for="camouflage in camouflages"
				:key="camouflage.name"
				:class="['camouflage', `weapon-layout-${layout}`]"
				@click="toggleCamouflageCompleted(weapon.name, camouflage.name, camouflage.completed)"
				:content="requirementTooltip(weapon, camouflage.name)"
				v-tippy="{ placement: 'bottom' }">
				<div :class="['inner', { completed: camouflage.completed }]">
					<img
						:src="imageUrl(camouflage.name)"
						:alt="camouflage.name"
						onerror="javascript:this.src='/base-gradient.svg'" />
					<IconComponent class="complete" name="check" fill="#10ac84" />
					<IconComponent class="remove" name="times" fill="#ee5253" />
					<div v-if="layout === 'list'" class="info">
						<span class="requirement">{{ requirementListText(weapon, camouflage.name) }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { useStore } from '@/stores/store'
import { convertToKebabCase } from '@/utils/utils'
import { mapActions, mapState } from 'pinia'

export default {
	props: {
		weapon: {
			type: Object,
			required: true,
		},

		polyatomicUnlocked: {
			type: Boolean,
			required: true,
		},
	},

	computed: {
		...mapState(useStore, ['weaponRequirements', 'preferences']),

		layout() {
			return this.preferences.layout
		},

		camouflages() {
			// This is a bit of a hack to get the camouflages to be in the correct order
			// TODO: Find a better way to do this
			const requirements = this.weaponRequirements[this.weapon.category][this.weapon.name]
			const progress = this.weapon.progress
			const camouflages = Object.keys(progress)
				.map((camouflage) => {
					const completed = progress[camouflage]
					const requirement = requirements[camouflage]

					return {
						name: camouflage,
						completed,
						level: requirement?.level || 100,
					}
				})
				.sort((a, b) => a.level - b.level)

			return camouflages
		},

		completed() {
			return Object.values(this.weapon.progress).every(Boolean)
		},

		goldCompleted() {
			return this.weapon.progress['Gold']
		},

		platinumCompleted() {
			return this.weapon.progress['Platinum']
		},

		polyatomicCompleted() {
			return this.weapon.progress['Polyatomic']
		},
	},

	methods: {
		convertToKebabCase,
		...mapActions(useStore, ['toggleCamouflageCompleted', 'toggleWeaponCompleted']),

		imageUrl(camouflage) {
			if (camouflage === 'Gold') {
				return new URL('/gold-gradient.svg', import.meta.url)
			} else if (camouflage === 'Platinum') {
				return new URL('/platinum-gradient.svg', import.meta.url)
			} else if (camouflage === 'Polyatomic') {
				return new URL('/polyatomic-gradient.svg', import.meta.url)
			}

			return new URL(`../assets/camouflages/${convertToKebabCase(camouflage)}.png`, import.meta.url)
		},

		requirementTooltip(weapon, camouflage) {
			const requirement = this.weaponRequirements[weapon.category][weapon.name][camouflage]
			if (requirement && requirement.challenge)
				return `${camouflage} - Level ${requirement.level} - ${requirement.challenge}`

			return `${camouflage} - ${requirement || 'TBA'}`
		},

		requirementListText(weapon, camouflage) {
			const requirement = this.weaponRequirements[weapon.category][weapon.name][camouflage]
			if (requirement && requirement.challenge)
				// return `${camouflage} - Level ${requirement.level} - ${requirement.challenge}`
				return requirement.challenge

			return `${requirement || 'TBA'}`
		},
	},
}
</script>

<style lang="scss" scoped>
.weapon {
	position: relative;

	&.coming-soon {
		.name {
			background: $elevation-1-color;
			color: rgba($text-color, 0.25);
			pointer-events: none;

			&::after {
				background: $blue;
				border: 3px solid $background-color;
				border-radius: 100px;
				bottom: 0;
				color: $text-color;
				content: 'Coming Soon';
				font-size: 10px;
				font-weight: 500;
				left: 50%;
				padding: 4px 6px;
				position: absolute;
				transform: translate(-50%, 50%);
				z-index: 2;
			}
		}
	}

	.name {
		$padding: 25px;
		$list-padding: 10px;
		align-items: center;
		background: $elevation-3-color;
		border-radius: $border-radius;
		cursor: pointer;
		display: flex;
		font-weight: 600;
		justify-content: center;
		position: relative;
		transition: $transition;
		user-select: none;

		@media (max-width: $tablet) {
			font-size: 18px;
			padding: $list-padding $padding;
		}

		&.gold {
			@include gold-camouflage-background;
			color: black;
		}

		&.platinum {
			@include platinum-camouflage-background;
			color: black;
		}

		&.polyatomic {
			@include polyatomic-camouflage-background;
			color: white;
		}

		&.grid {
			padding: $padding 0;
		}

		&.list {
			padding: $list-padding 0;
			&::after {
				bottom: -4px;
			}
		}
	}

	.progress {
		display: grid;
		gap: 5px;
		//grid-template-columns: repeat(5, 1fr);
		margin-top: 5px;

		.camouflage {
			user-select: none;

			&.weapon-layout-grid > .inner {
				flex-direction: column;
				justify-content: center;

				&.completed > .info {
					opacity: 0.5;
				}

				img {
					height: 100%;
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
					top: 50%;
					z-index: 2;
				}

				.info {
					padding: 8px;

					.name {
						font-size: 14px;
					}
				}
			}

			&.weapon-layout-list > .inner {
				$image-size: 30px;
				background: $elevation-1-color;
				flex-direction: row;
				justify-content: flex-start;

				&.completed > .info {
					opacity: 0.5;
				}

				img {
					height: 100%;
					object-fit: cover;
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
					padding: 0 5px;
					text-align: left;

					.name {
						font-weight: 500;
					}

					.requirement {
						display: block;
						font-size: 11px;
						line-height: 1.5;
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
				justify-content: center;
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

				.icon-component {
					left: 50%;
					opacity: 0;
					position: absolute;
					transform: translate(-50%, -50%);
					transition: $transition;
					top: 50%;
					z-index: 2;
				}

				p {
					font-size: 14px;
				}
			}
		}
	}
}
</style>
