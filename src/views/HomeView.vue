<template>
  <div class="container">
    <AlertComponent style="margin-bottom: 30px">
      <p>
        Looking for the tracker for Modern Warfare 3?
        <a href="https://interstellar.emca.app/">You can find it here</a>! Zombie camouflages for
        the Modern Warfare 2 guns and shared calling cards will be added to this tracker in the
        coming weeks! Good luck with the grind! 🚀
      </p>
    </AlertComponent>

    <div class="filter-container">
      <FiltersComponent :options="filterOptions" :show-info="true">
        <template #info>
          <IconComponent
            name="question-circle"
            fill="white"
            v-tippy="{ placement: 'bottom' }"
            :content="$t('pages.weapons.info_tooltip')"
            @click="$router.push('/requirements')" />
          <div class="mobile">
            <IconComponent name="question-circle" fill="white"></IconComponent>
            <i18n path="pages.weapons.info" tag="p">
              <template #link>
                <router-link to="/requirements">{{ $t('pages.weapons.info_link') }}</router-link>
              </template>
            </i18n>
          </div>
        </template>
      </FiltersComponent>
      <div class="toggles">
        <FavoritesToggleComponent />
        <LayoutToggleComponent />
      </div>
    </div>

    <OverallProgressComponent :options="overallProgress" :totalWeapons="this.weapons.length" />

    <WeaponsComponent :weapons="filteredWeapons" :favorites="favorites" />

    <ProgressComponent
      :progress="orionProgress"
      :label="$t('pages.weapons.progress.label')"
      :tooltip="$t('pages.weapons.progress.tooltip')">
      <template #modal-header>{{ $t('pages.weapons.completed_modal.title') }}</template>
      <template #modal-body>
        <i18n path="pages.weapons.completed_modal.body" tag="p">
          <template #duration>
            <b>{{ daysSinceStart }} {{ $tc('general.days_ago', daysSinceStart) }}</b>
          </template>

          <template #date>
            <b>{{ new Date(getBeganGrind).toLocaleDateString('en-US') }}</b>
          </template>
        </i18n>

        <i18n
          path="pages.mastery.completed_modal.support"
          tag="p"
          style="margin-top: 15px; font-size: 14px; color: #aaa">
          <a href="https://www.buymeacoffee.com/emilcarlsson" target="_blank">
            {{ $t('pages.mastery.completed_modal.support_link') }}
          </a>
        </i18n>
      </template>
    </ProgressComponent>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useStore } from '@/stores/store'
import { groupBy, daysBetweenDates, roundToTwoDecimals } from '@/utils/utils'

import FiltersComponent from '@/components/FiltersComponent.vue'
import OverallProgressComponent from '@/components/OverallProgressComponent.vue'
import WeaponsComponent from '@/components/WeaponsComponent.vue'
import ProgressComponent from '@/components/ProgressComponent.vue'
import LayoutToggleComponent from '@/components/LayoutToggleComponent.vue'
import FavoritesToggleComponent from '@/components/FavoritesToggleComponent.vue'
import AlertComponent from '@/components/AlertComponent.vue'

export default {
  components: {
    FiltersComponent,
    OverallProgressComponent,
    WeaponsComponent,
    ProgressComponent,
    LayoutToggleComponent,
    FavoritesToggleComponent,
    AlertComponent,
  },

  data() {
    return {
      store: useStore(),
    }
  },

  computed: {
    ...mapState(useStore, ['weapons', 'filters', 'weaponCategories', 'beganGrind']),

    getBeganGrind() {
      return this.beganGrind ?? new Date()
    },

    daysSinceStart() {
      const days = daysBetweenDates(this.getBeganGrind, new Date())
      return days ? days : 1
    },

    filterOptions() {
      return [
        {
          label: this.$tc('general.category'),
          key: 'weaponCategory',
          type: 'select',
          options: this.weaponCategories,
        },
        {
          label: this.$t('filters.hide_gold'),
          key: 'hideGold',
          type: 'checkbox',
        },
        {
          label: this.$t('filters.hide_platinum'),
          key: 'hidePlatinum',
          type: 'checkbox',
        },
        {
          label: this.$t('filters.hide_polyatomic'),
          key: 'hidePolyatomic',
          type: 'checkbox',
        },
        {
          label: this.$t('filters.hide_dlc'),
          key: 'hideDlc',
          type: 'checkbox',
        },
      ]
    },

    filteredWeapons() {
      let filteredWeapons = this.weapons
      const { hideGold, hidePlatinum, hidePolyatomic, hideDlc, weaponCategory } = this.filters

      if (hideGold) {
        filteredWeapons = filteredWeapons.filter((weapon) => !weapon.progress['Gold'])
      }

      if (hidePlatinum) {
        filteredWeapons = filteredWeapons.filter((weapon) => !weapon.progress['Platinum'])
      }

      if (hidePolyatomic) {
        filteredWeapons = filteredWeapons.filter((weapon) => !weapon.progress['Polyatomic'])
      }

      if (hideDlc) {
        filteredWeapons = filteredWeapons.filter((weapon) => !weapon.dlc)
      }

      if (weaponCategory && weaponCategory !== 'null') {
        filteredWeapons = filteredWeapons.filter((weapon) => weapon.category === weaponCategory)
      }

      return groupBy(filteredWeapons, (weapon) => weapon.category)
    },

    favorites() {
      if (!this.store) return []
      const favorites = this.store.getFavorites('weapons')
      return this.weapons.filter((weapon) => favorites.includes(weapon.name))
    },

    orionProgress() {
      // Set the amount of required weapons to complete the Orion camouflage
      const requiredWeapons = this.weapons.filter((weapon) => !weapon.dlc).length

      // Sort and filter out the weapons with the most progress
      const mostProgressedWeapons = this.weapons
        .map((weapon) => {
          let totalCamouflages = Object.keys(weapon.progress).length
          let completedCamouflages = Object.values(weapon.progress).reduce((a, b) => a + b, 0)

          return {
            ...weapon,
            completed: Object.values(weapon.progress).reduce((a, b) => a + b, 0),
            completedPercentage: completedCamouflages / totalCamouflages,
          }
        })
        .sort((a, b) => b.completedPercentage - a.completedPercentage)
        .splice(0, requiredWeapons)

      // Count the amount of camouflages completed for the most progress weapons
      const totalCamouflagesCompleted = mostProgressedWeapons.reduce((a, b) => a + b.completed, 0)

      // Count the required amount of camouflages to complete the Orion camouflage
      const requiredCamouflages = mostProgressedWeapons.reduce((a, b) => {
        return a + Object.keys(b.progress).length
      }, 0)

      return roundToTwoDecimals((totalCamouflagesCompleted / requiredCamouflages) * 100)
    },

    overallProgress() {
      return {
        Gold: this.weapons.filter((weapon) => weapon.progress.Gold).length,
        Platinum: this.weapons.filter((weapon) => weapon.progress.Platinum).length,
        Polyatomic: this.weapons.filter((weapon) => weapon.progress.Polyatomic).length,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
}

h1 {
  margin-top: 75px;
}

h2 {
  margin: 30px auto 0;
  max-width: 450px;
}

.filter-container {
  align-items: center;
  display: flex;
  width: 100%;

  @media (max-width: $tablet) {
    flex-direction: column;

    ::v-deep .filters-component {
      margin-bottom: 20px;
      margin-right: 0;
      width: 100%;
    }

    .toggles {
      display: flex;
      justify-content: space-between;
      width: 100%;

      > :first-child {
        margin-right: 20px;
      }
    }
  }
}

::v-deep .filters-component {
  flex-grow: 1;
  margin-right: 15px;
}
</style>
