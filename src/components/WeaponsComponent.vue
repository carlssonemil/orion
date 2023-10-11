<template>
  <div>
    <transition-group name="fade" tag="div" class="container">
      <div v-if="showFavorites" :key="'favorites'" class="category">
        <h2>
          <span>{{ $t('general.favorites') }}</span>
          <span v-if="favorites.length > 0" @click="unfavoriteAll('weapons')" class="action">
            {{ $t('general.remove_all') }}
          </span>
        </h2>

        <transition-group v-if="favorites.length > 0" name="fade" tag="div" class="weapons">
          <WeaponComponent
            v-for="weapon in favorites"
            :key="weapon.name"
            :weapon="weapon"
            :camouflages="camouflages(weapon)"
            :mastery="mastery"
            :polyatomicUnlocked="mastery ? null : polyatomicUnlocked" />
        </transition-group>

        <AlertComponent
          v-else
          type="empty-state"
          :style="{ padding: mastery ? '42px 15px' : '32px 15px 31px' }">
          <i18n path="general.no_favorites_placeholder">
            <template #star>
              <IconComponent name="star" fill="#feca57" icon-style="solid" size="20" />
            </template>
            <template #type>{{ $tc('general.weapon').toLowerCase() }}</template>
          </i18n>
        </AlertComponent>
      </div>

      <div
        v-for="(category, title, index) in weapons"
        :key="title"
        :data-index="index"
        class="category">
        <!-- TODO: Add double-click functionality -->
        <h2>
          <span>
            {{ $t('weapon_categories.' + title) }}
          </span>
          <span v-tippy :content="$t('pages.weapons.completed_in_category')">
            {{ categoryProgress(title) }}
          </span>
        </h2>

        <transition-group name="fade" tag="div" class="weapons">
          <WeaponComponent
            v-for="weapon in category"
            :key="weapon.name"
            :weapon="weapon"
            :camouflages="camouflages(weapon)"
            :mastery="mastery"
            :polyatomicUnlocked="mastery ? null : polyatomicUnlocked" />
        </transition-group>
      </div>
    </transition-group>

    <div v-if="Object.keys(weapons).length === 0" class="finished-placeholder">
      <p>{{ $t('pages.weapons.finished_placeholder') }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useStore } from '@/stores/store'
import { filterObject } from '@/utils/utils'

import AlertComponent from '@/components/AlertComponent.vue'
import WeaponComponent from '@/components/WeaponComponent.vue'

export default {
  components: {
    AlertComponent,
    WeaponComponent,
  },

  props: {
    weapons: {
      type: Object,
      required: true,
    },

    favorites: {
      type: Array,
      required: true,
    },

    mastery: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  computed: {
    ...mapState(useStore, ['weaponRequirements', 'preferences']),

    showFavorites() {
      return this.preferences.favorites
    },

    polyatomicUnlocked() {
      const required = 51
      const completed = Object.values(this.weapons)
        .flat()
        .reduce(
          (a, weapon) =>
            a + Object.values(filterObject(weapon.progress, ['Polyatomic'])).every(Boolean),
          0
        )

      return completed >= required
    },
  },

  methods: {
    ...mapActions(useStore, ['toggleCategoryCompleted', 'unfavoriteAll']),

    categoryProgress(title) {
      const progress = this.mastery ? 'masteryProgress' : 'progress'
      const categoryWeapons = this.weapons[title]
      const total = categoryWeapons.filter((weapon) => !weapon.comingSoon).length
      const completed = categoryWeapons.reduce(
        (a, weapon) => a + Object.values(weapon[progress]).every(Boolean),
        0
      )

      return completed > total ? `${total}/${total}` : `${Math.floor(completed)}/${total}`
    },

    categoryCompleted(category) {
      const progress = this.mastery ? 'masteryProgress' : 'progress'
      const total = category.filter((weapon) => !weapon.comingSoon).length
      const completed = category.reduce(
        (a, weapon) => a + Object.values(weapon[progress]).every(Boolean),
        0
      )

      return completed >= total
    },

    camouflages(weapon) {
      // This is a bit of a hack to get the camouflages to be in the correct order
      // TODO: Find a better way to do this
      const requirements = this.weaponRequirements[weapon.category][weapon.name]
      const progress = this.mastery ? weapon.masteryProgress : weapon.progress
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
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;

  .category {
    cursor: default;

    + .category {
      margin-top: 75px;

      @media (max-width: $tablet) {
        margin-top: 100px;
      }
    }

    h2 {
      align-items: center;
      display: inline-flex;
      justify-content: space-between;
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 25px;
      width: 100%;

      span:last-child:not(:first-child) {
        color: $elevation-9-color;
        font-size: 18px;
        margin-left: 10px;

        &.action {
          color: $elevation-9-color;
          cursor: pointer;
          font-size: 14px;
          transition: $transition;

          &:hover {
            color: lighten($elevation-9-color, 10%);
          }
        }
      }

      @media (max-width: $tablet) {
        margin-bottom: 35px;
      }
    }

    .weapons {
      display: grid;
      gap: 30px;
      grid-template-columns: repeat(5, 1fr);
      width: 100%;

      @media (max-width: $tablet) {
        grid-template-columns: 1fr;
      }
    }
  }
}

.finished-placeholder {
  color: darken(white, 50%);
  margin-top: 10vh;
  text-align: center;
  width: 100%;

  p {
    font-size: 22px;
    line-height: 1.7;

    @media (max-width: $tablet) {
      font-size: 24px;
    }
  }
}
</style>
