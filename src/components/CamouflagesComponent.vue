<template>
  <div>
    <transition-group name="fade" tag="div" class="container">
      <div v-if="!haveSearched && showFavorites" :key="'favorites'" class="category">
        <h2>
          <span>{{ $t('general.favorites') }}</span>
          <span v-if="favorites.length > 0" @click="unfavoriteAll('camouflages')" class="action">
            {{ $t('general.remove_all') }}
          </span>
        </h2>

        <transition-group
          v-if="favorites.length > 0"
          name="fade"
          tag="div"
          :class="['camouflages', `layout-${layout}`]">
          <CamouflageComponent
            v-for="camouflage in favorites"
            :key="camouflage.name"
            :camouflage="camouflage" />
        </transition-group>

        <AlertComponent v-else type="empty-state" style="padding: 42px 15px">
          <i18n path="general.no_favorites_placeholder">
            <template #star>
              <IconComponent name="star" fill="#feca57" icon-style="solid" size="20" />
            </template>
            <template #type>{{ $tc('general.camouflage').toLowerCase() }}</template>
          </i18n>
        </AlertComponent>
      </div>

      <div
        v-for="(category, title, index) in camouflages"
        :key="title"
        :data-index="index"
        class="category">
        <h2>
          <span>
            {{ $t('camouflage_categories.' + title) }}
          </span>
          <span v-tippy :content="$t('pages.camouflages.completed_in_category')">
            {{ categoryProgress(title) }}
          </span>
        </h2>

        <transition-group name="fade" tag="div" :class="['camouflages', `layout-${layout}`]">
          <CamouflageComponent
            v-for="camouflage in category"
            :key="camouflage.name"
            :camouflage="camouflage" />
        </transition-group>
      </div>
    </transition-group>

    <div v-if="Object.keys(camouflages).length === 0" class="finished-placeholder">
      <p v-if="haveSearched">{{ $t('pages.camouflages.empty_search') }}</p>
      <p v-else>{{ $t('pages.camouflages.finished_placeholder') }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useStore } from '@/stores/store'

import AlertComponent from '@/components/AlertComponent.vue'
import CamouflageComponent from '@/components/CamouflageComponent.vue'

export default {
  components: {
    AlertComponent,
    CamouflageComponent,
  },

  props: {
    camouflages: {
      type: Object,
      required: true,
    },

    favorites: {
      type: Array,
      required: true,
    },
  },

  computed: {
    ...mapState(useStore, ['weapons', 'preferences', 'filters']),

    layout() {
      return this.preferences.layout
    },

    showFavorites() {
      return this.preferences.favorites
    },

    haveSearched() {
      return this.filters.search.length > 0
    },
  },

  methods: {
    ...mapActions(useStore, ['unfavoriteAll']),

    categoryProgress(categoryTitle) {
      let completed = 0
      const categoryCamos = this.camouflages[categoryTitle].map((catCamo) => catCamo.name)
      const totalCamos = categoryCamos.length
      // get all completed camouflages in category
      let allCamoProgress = this.getAllCamoProgress()

      categoryCamos.forEach((camouflage) => {
        // Reference camouflage by name to get current state. Id would be better here
        if (allCamoProgress[camouflage]) completed++
      })

      return `${completed}/${totalCamos}`
    },
    getAllCamoProgress() {
      return this.weapons
        .map((item) => item.progress)
        .reduce(function (acc, x) {
          for (var key in x) acc[key] = x[key]
          return acc
        }, {})
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

    .camouflages {
      display: grid;
      gap: 30px;
      &.layout-grid {
        grid-template-columns: repeat(5, 1fr);

        @media (max-width: $tablet) {
          grid-template-columns: 1fr;
        }
      }

      &.layout-list {
        grid-template-columns: repeat(2, 1fr);

        @media (max-width: $tablet) {
          grid-template-columns: 1fr;
        }
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
