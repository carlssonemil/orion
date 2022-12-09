<template>
	<div class="locale-switcher">
		<div class="flag" v-tippy="{ content: $t('general.change_language') }" @click="togglePopup()">
			<span :class="[`fi fi-${flagCode(currentLocale)}`]"></span>
		</div>

		<div
			:class="['popup', { open }]"
			ref="localeSwitcherPopup"
			tabindex="-1"
			@focusout="togglePopup()">
			<div
				v-for="(locale, i) in availableLocales"
				:key="i"
				:class="['option', { active: locale === currentLocale }]"
				@click="changeLocale(locale)">
				<span :class="[`fi fi-${flagCode(locale)}`]"></span>
				<span>{{ $t(`locales.${locale}`) }}</span>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useStore } from '@/stores/store'
import locales from '@/i18n/locales'

export default {
	data() {
		return {
			open: false,
			locales: ['en-US', 'sv-SE'],
		}
	},

	computed: {
		...mapState(useStore, ['preferences']),

		currentLocale() {
			return this.preferences.locale
		},

		availableLocales() {
			return Object.keys(locales)
		},
	},

	methods: {
		...mapActions(useStore, ['setPreferences', 'storeProgress']),

		togglePopup() {
			this.open = !this.open

			if (this.open) {
				this.$nextTick(() => {
					this.$refs.localeSwitcherPopup.focus()
				})
			}
		},

		changeLocale(locale) {
			this.$root.$i18n.locale = locale
			const preferences = JSON.parse(JSON.stringify(this.preferences))
			preferences.locale = locale
			this.setPreferences(preferences)
			this.storeProgress()
		},

		flagCode(locale) {
			return locale.split('-')[1].toLowerCase()
		},
	},
}
</script>

<style lang="scss" scoped>
.locale-switcher {
	display: inline-block;
	position: relative;

	.flag {
		cursor: pointer;
		font-size: 20px;

		.fi {
			border-radius: 3px;
		}
	}

	.active {
		border-radius: $border-radius;
		cursor: pointer;
		padding: 4px 8px;
		transition: $transition;

		&:hover {
			background: darken(white, 7.5%);
		}
	}

	.popup {
		background: $elevation-5-color;
		border-radius: $border-radius;
		padding: 10px;
		pointer-events: none;
		position: absolute;
		right: -9px;
		opacity: 0;
		top: 15px;
		transition: $transition;
		transform: translateY(-110%);
		z-index: 99;

		&::after {
			$size: 10px;
			bottom: 2px;
			border-top: $size solid $elevation-5-color;
			border-left: $size solid transparent;
			border-right: $size solid transparent;
			content: '';
			height: 0;
			position: absolute;
			right: 12px;
			transform: translateY(100%);
			width: 0;
		}

		&.open {
			opacity: 1;
			pointer-events: all;
			top: 0;
		}

		.option {
			align-items: center;
			border-radius: $border-radius;
			cursor: pointer;
			display: flex;
			padding: 4px 8px 4px 4px;
			transition: $transition;

			&:hover {
				background: $elevation-7-color;
			}

			+ .option {
				margin-top: 5px;
			}

			&.active {
				background: rgba($elevation-9-color, 0.75);
				color: white;

				&:hover {
					background: rgba($elevation-9-color, 1);
				}
			}

			span {
				font-size: 14px;

				&.fi {
					border-radius: 3px;
					font-size: 20px;
					margin-right: 6px;
				}
			}
		}
	}
}
</style>
