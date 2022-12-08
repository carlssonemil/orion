<template>
	<div class="about container">
		<h3>{{ $t('pages.about.title') }}</h3>
		<p>{{ $t('pages.about.subtitle') }}</p>

		<div class="features">
			<div class="feature" v-for="feature in features" :key="feature.title">
				<div class="icon">
					<IconComponent :name="feature.icon" size="25" />
				</div>
				<div class="content">
					<h5>{{ feature.title }}</h5>
					<p>{{ feature.description }}</p>
				</div>
			</div>
		</div>

		<h4>{{ $t('pages.about.open_source') }}</h4>
		<p>
			<i18n path="pages.about.open_source_description">
				<a href="https://vuejs.org/">Vue</a>
				<a href="https://vercel.com/">Vercel</a>
				<a href="https://plausible.io/">Plausible</a>
				<a href="https://github.com/carlssonemil/orion">GitHub</a>
			</i18n>
		</p>

		<h4>{{ $t('pages.about.previous_trackers') }}</h4>
		<p>{{ $t('pages.about.previous_trackers_description') }}</p>
		<div class="trackers">
			<a
				class="tracker"
				v-for="tracker in trackers"
				:key="tracker.title"
				:href="tracker.url"
				target="_blank">
				<IconComponent name="external-link-alt" />
				<img :src="tracker.icon" />
				<h5>{{ tracker.title }}</h5>
			</a>
		</div>

		<h4>{{ $t('pages.about.support_me') }}</h4>
		<p>
			<i18n path="pages.about.support_me_description">
				<a href="https://www.buymeacoffee.com/emilcarlsson">{{
					$t('pages.about.support_me_link')
				}}</a>
			</i18n>
		</p>
	</div>
</template>

<script>
import vanguardIcon from '@/assets/vanguard.png'
import coldWarIcon from '@/assets/coldwar.png'
import damascusIcon from '@/assets/damascus.png'

export default {
	data() {
		return {
			features: [
				{
					title: this.$t('pages.about.features.autosaving.title'),
					description: this.$t('pages.about.features.autosaving.description'),
					icon: 'save',
				},
				{
					title: this.$t('pages.about.features.responsive.title'),
					description: this.$t('pages.about.features.responsive.description'),
					icon: 'mobile-android',
				},
				{
					title: this.$t('pages.about.features.export_import.title'),
					description: this.$t('pages.about.features.export_import.description'),
					icon: 'file-export',
				},
				{
					title: this.$t('pages.about.features.filterable.title'),
					description: this.$t('pages.about.features.filterable.description'),
					icon: 'filter',
				},
				{
					title: this.$t('pages.about.features.ad_free.title'),
					description: this.$t('pages.about.features.ad_free.description'),
					icon: 'image-slash',
				},
			],

			trackers: [
				{
					title: 'Vanguard',
					icon: vanguardIcon,
					url: 'https://vanguard.emca.app',
				},
				{
					title: 'Cold War',
					icon: coldWarIcon,
					url: 'https://coldwar.vercel.app',
				},
				{
					title: 'Modern Warfare',
					icon: damascusIcon,
					url: 'https://damascus.vercel.app',
				},
			],
		}
	},
}
</script>

<style lang="scss" scoped>
p {
	font-size: 18px;

	@media (max-width: $tablet) {
		font-size: 16px;
	}
}

a {
	@media (max-width: $tablet) {
		font-size: 16px;
	}
}

.features {
	display: grid;
	gap: 25px;
	grid-template-columns: repeat(3, 1fr);
	margin: 30px 0;

	@media (max-width: $tablet) {
		grid-template-columns: 1fr;
	}

	.feature {
		background: $elevation-1-color;
		border: 2px solid $elevation-3-color;
		border-radius: $border-radius;
		cursor: default;
		overflow: hidden;
		padding: 20px;
		position: relative;
		transition: $transition;

		&:hover {
			background: $elevation-3-color;
		}

		.icon {
			background: $purple;
			border-radius: $border-radius * 2;
			display: inline-flex;
			margin-bottom: 15px;
			padding: 10px;
		}

		h5 {
			font-weight: 600;
			margin-bottom: 10px;
			position: relative;
			z-index: 2;
		}

		p {
			font-size: 16px;
			line-height: 1.4;
			position: relative;
			z-index: 2;
		}
	}
}

.trackers {
	display: grid;
	gap: 25px;
	grid-template-columns: repeat(3, 1fr);
	margin: 30px 0;

	@media (max-width: $tablet) {
		grid-template-columns: 1fr;
	}

	.tracker {
		align-items: center;
		background: $elevation-2-color;
		border-radius: $border-radius;
		cursor: pointer;
		display: flex;
		justify-content: center;
		padding: 20px;
		position: relative;
		transition: $transition;

		&:hover {
			background: $elevation-3-color;
			text-decoration: none;

			.icon-component {
				transform: translate(50%, -50%);
			}
		}

		.icon-component {
			opacity: 0.5;
			padding: 5px;
			position: absolute;
			right: 0;
			top: 0;
			transform: translate(40%, -40%);
			transition: $transition;
		}

		img {
			$size: 30px;
			height: $size;
			margin-right: 15px;
			width: $size;
		}

		h5 {
			color: white;
			font-size: 20px;
			font-weight: 400;
			position: relative;
			z-index: 2;
		}
	}
}
</style>
