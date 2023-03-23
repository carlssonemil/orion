<template>
	<div :id="filter.id" class="filter">
		<template v-if="filter.type === 'select'">
			<div class="select">
				<label :for="filter.key">{{ filter.label }}</label>
				<select
					:id="filter.key"
					:value="value"
					@input="$emit('input', $event.target.value)"
					@change="$emit('change')">
					<template v-if="filter.nested_options">
						<option value="">{{ $t('general.all') }}</option>
						<optgroup
							v-for="(subcategories, category, index) in filter.options"
							:key="index"
							:label="$t(translationKey(filter.key) + category)">
							<option :value="category">{{ $t('general.all') }}</option>
							<option
								v-for="(subcategory, index) in subcategories"
								:key="index"
								:value="subcategory">
								{{ $t(translationKey(filter.key) + subcategory) }}
							</option>
						</optgroup>
					</template>

					<template v-else>
						<option value="">{{ $t('general.all') }}</option>
						<option v-for="(option, index) in filter.options" :key="index" :value="option">
							{{ $t(translationKey(filter.key) + option) }}
						</option>
					</template>
				</select>
				<IconComponent name="angle-down" />
			</div>
		</template>

		<template v-else-if="filter.type === 'checkbox'">
			<div class="checkbox">
				<label :for="filter.key" :class="{ checked: value }">
					<input
						:id="filter.key"
						type="checkbox"
						:checked="value"
						@input="$emit('input', $event.target.checked)"
						@change="$emit('change')" />
					<span>{{ filter.label }}</span>
				</label>
			</div>
		</template>

		<template v-else-if="filter.type === 'search'">
			<div class="text icon">
				<IconComponent name="search" height="20" width="20" />
				<input
					:id="filter.key"
					type="text"
					:value="value"
					@input="$emit('input', $event.target.value)"
					@change="$emit('change')"
					:placeholder="filter.placeholder" />
			</div>
		</template>
	</div>
</template>

<script>
import IconComponent from './IconComponent.vue'

export default {
	props: {
		filter: {
			type: Object,
			required: true,
		},
		value: {
			required: true,
		},
	},

	components: { IconComponent },

	methods: {
		translationKey(key) {
			switch (key) {
				case 'weaponCategory':
					return 'weapon_categories.'
				case 'camouflageCategory':
					return 'camouflage_categories.'
				case 'callingCardCategory':
					return 'calling_card_categories.'
				default:
					return ''
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.filter {
	width: 100%;

	+ .filter {
		margin-top: 15px;
	}

	@media (min-width: $tablet) {
		width: auto;

		+ .filter {
			margin-left: 30px;
			margin-top: 0;
		}
	}
}
</style>
