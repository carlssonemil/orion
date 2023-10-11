<template>
  <div v-show="active" class="modal-container">
    <transition name="fade">
      <div v-if="showBackdrop" v-show="show" class="backdrop" @click.self="close()"></div>
    </transition>
    <transition name="fadeInUp">
      <div v-show="show" class="modal" :style="{ maxWidth: `${maxWidth}px` }">
        <div v-if="showHeader" class="modal-header">
          <h5>
            <slot name="header"></slot>
          </h5>
          <IconComponent name="times" size="18" @click="close()" />
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button @click="close()">{{ $t('general.close') }}</button>
          </slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    showBackdrop: {
      type: Boolean,
      required: false,
      default: true,
    },
    showHeader: {
      type: Boolean,
      required: false,
      default: true,
    },
    maxWidth: {
      type: Number,
      required: false,
      default: 650,
    },
  },

  data() {
    return {
      active: false,
      show: false,
    }
  },

  methods: {
    open() {
      this.active = true

      setTimeout(() => {
        this.show = true
      }, 100)
    },

    close() {
      this.show = false

      setTimeout(() => {
        this.active = false
      }, 300)
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-container {
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;

  .backdrop {
    background: rgba(black, 0.5);
    display: block;
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
  }

  .modal {
    background: $elevation-4-color;
    border-radius: $border-radius;
    box-shadow: 0px 5px 10px 0px rgba(black, 0.5);
    margin-bottom: 20vh;
    overflow: hidden;
    position: relative;
    width: 90%;
    z-index: 2;

    .modal-header {
      align-items: center;
      border-bottom: 1px solid $elevation-6-color;
      display: flex;
      justify-content: space-between;
      padding: 5px 5px 5px 15px;

      h5 {
        align-items: center;
        display: flex;
        font-size: 18px;
      }

      .icon-component {
        cursor: pointer;
        opacity: 0.5;
        padding: 15px;
        transition: $transition;

        &:hover {
          opacity: 0.75;
        }
      }
    }

    .modal-body {
      padding: 15px 15px 30px;
      text-align: left;
    }

    .modal-footer {
      align-items: center;
      border-top: 1px solid $elevation-6-color;
      display: flex;
      justify-content: flex-end;
      padding: 15px;

      ::v-deep button + button {
        margin-left: 15px;
      }
    }
  }
}
</style>
