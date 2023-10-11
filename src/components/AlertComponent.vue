<template>
  <div :class="['alert', type]">
    <IconComponent v-if="icon || typeIcon" :name="icon || typeIcon" />
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
import IconComponent from '@/components/IconComponent.vue'

export default {
  components: {
    IconComponent,
  },

  props: {
    type: {
      type: String,
      required: false,
      default: 'info',
    },

    icon: {
      type: String,
      required: false,
    },
  },

  computed: {
    typeIcon() {
      switch (this.type) {
        case 'info':
          return 'info-circle'
        case 'success':
          return 'check-circle'
        case 'warning':
          return 'exclamation-circle'
        case 'error':
          return 'times-circle'
        default:
          return null
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.alert {
  align-items: flex-start;
  background: $elevation-2-color;
  border: 2px solid $elevation-4-color;
  border-radius: $border-radius;
  display: flex;
  padding: 15px;
  text-align: left;

  &.info {
    background: rgba($blue, 0.15);
    border-color: rgba($blue, 0.3);

    .icon-component ::v-deep svg {
      fill: $blue;
    }
  }

  &.empty-state {
    .content {
      color: rgba(white, 0.5);
      text-align: center;
    }
  }

  > .icon-component {
    margin-right: 10px;
  }

  .content {
    line-height: 1.6;
    width: 100%;

    > .icon-component {
      position: relative;
      top: 3px;
    }
  }
}
</style>
