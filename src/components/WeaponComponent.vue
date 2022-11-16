<template>
	<div :class="['weapon', { 'coming-soon': weapon.comingSoon }]">
		<div
			:class="[
				'name',
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
				'grid-template-columns': `repeat(${Object.keys(camouflages).length}, 1fr)`,
			}">
			<div
				v-for="(completed, camouflage) in camouflages"
				:key="camouflage"
				:class="['camouflage']"
				@click="toggleCamouflageCompleted(weapon.name, camouflage, completed)"
				:content="requirementTooltip(weapon, camouflage)"
				v-tippy="{ placement: 'bottom' }">
				<div :class="['inner', { completed }]">
					<IconComponent class="complete" name="check" fill="#10ac84" />
					<IconComponent class="remove" name="times" fill="#ee5253" />
					<img
						:src="imageUrl(camouflage)"
						:alt="camouflage"
						onerror="javascript:this.src='/base-gradient.svg'" />
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
		...mapState(useStore, ['weaponRequirements']),

		camouflages() {
			return this.weapon.progress
		},

		completed() {
			return Object.values(this.camouflages).every(Boolean)
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
	},
}
</script>

<style lang="scss" scoped>
.weapon {
	position: relative;

	&.coming-soon {
		&::before {
			background: $blue;
			border: 3px solid $background-color;
			border-radius: 100px;
			bottom: 0;
			content: 'Coming Soon';
			font-size: 10px;
			font-weight: 500;
			left: 50%;
			padding: 4px 6px;
			position: absolute;
			transform: translate(-50%, -75%);
			z-index: 2;
		}

		.name {
			opacity: 0.5;
			pointer-events: none;
		}
	}

	.name {
		$padding: 25px;
		align-items: center;
		background: $elevation-3-color;
		border-radius: $border-radius;
		cursor: pointer;
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
	}

	.progress {
		display: grid;
		gap: 5px;
		//grid-template-columns: repeat(5, 1fr);
		margin-top: 5px;

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

				img {
					height: 100%;
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
}
</style>
