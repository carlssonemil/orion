<template>
  <div :class="['calling-card-wrapper', { favorite: isFavorite }]">
    <div
      :class="['calling-card', `calling-card-layout-${layout}`]"
      @click="toggleCallingCardCompleted(card, isCompleted)"
      :content="requirementTooltip(card)"
      v-tippy="{ placement: 'bottom' }">
      <div :class="['inner', this.isCompleted ? 'completed' : '']">
        <img
          :src="`https://emilcarlsson.se/orion/calling-cards/${convertToKebabCase(card.name)}.png`"
          :alt="card.name"
          onerror="javascript:console.log(this.src);this.src='/base-gradient.svg';" />
        <IconComponent class="complete" name="check" fill="#10ac84" size="30" />
        <IconComponent class="remove" name="times" fill="#ee5253" size="30" />
        <div class="info">
          <span class="name">{{ card.name }}</span>
          <span class="requirement">{{ requirementTooltip(card) }}</span>
        </div>
      </div>
    </div>

    <IconComponent
      class="favorite-icon"
      name="star"
      :fill="isFavorite ? '#feca57' : 'gray'"
      icon-style="solid"
      size="25"
      @click="toggleFavorite({ type: 'callingCards', name: card.name })"
      v-tippy="{
        content: $t('filters.toggle_favorite', {
          state: isFavorite ? $t('general.remove_from') : $t('general.add_to'),
        }),
      }" />
  </div>
</template>

<script>
import { useStore } from '@/stores/store'
import { convertToKebabCase } from '@/utils/utils'
import { mapActions, mapState } from 'pinia'

const store = useStore()

export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState(useStore, ['preferences']),

    layout() {
      return this.preferences.layout
    },

    isFavorite() {
      return store.isFavorite('callingCards', this.card.name)
    },

    isCompleted() {
      return store.callingCardCompleted(this.card.name)
    },
  },

  methods: {
    convertToKebabCase,
    ...mapActions(useStore, ['toggleCallingCardCompleted', 'toggleFavorite']),

    requirementTooltip(card) {
      return this.$t(
        `challenges.calling_cards.${card.category.toLowerCase()}.${card.requirement.type}`,
        {
          amount: card.requirement.amount || null,
          times: card.requirement.times || null,
        }
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.calling-card-wrapper {
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

  .calling-card {
    user-select: none;

    &.calling-card-layout-grid > .inner {
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

    &.calling-card-layout-list > .inner {
      $image-size: 100px;
      background: $elevation-1-color;
      flex-direction: column;
      align-items: flex-start;

      &.completed > .info {
        opacity: 0.5;
      }

      img {
        height: auto;
        object-fit: cover;
        position: relative;
        width: 100%;
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
        padding: 10px;
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

      img {
        pointer-events: none;
      }

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
