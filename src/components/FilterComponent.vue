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
					<option value="">{{ $t('general.all') }}</option>
					<option v-for="(option, index) in filter.options" :key="index" :value="option">
						{{ $t((filter.key === 'weaponCategory' ? 'weapon_categories.' : 'camouflage_categories.') + option) }}
					</option>
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
			margin-left: 16px;
			margin-top: 0;
		}
	}
}
</style>
