<template>
  <unicon
    class="icon-component"
    :name="name"
    :width="size || width"
    :height="size || height"
    :fill="color || fill"
    :hover-fill="hover"
    :icon-style="iconStyle"
    @click="$emit('click')" />
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: '24',
    },
    height: {
      type: String,
      default: '24',
    },
    size: {
      type: String,
    },
    fill: {
      type: String,
      default: 'white',
    },
    hoverFill: {
      type: String,
    },
    color: {
      type: String,
    },
    hoverColor: {
      type: String,
    },
    iconStyle: {
      type: String,
      default: 'line',
    },
  },

  computed: {
    hover() {
      return this.hoverColor || this.hoverFill || this.color || this.fill
    },
  },
}
</script>

<style lang="scss" scoped>
.icon-component {
  display: inline-flex;
}
</style>
