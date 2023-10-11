<template>
  <div class="overall-progress-component">
    <div class="counter" v-for="(counter, name) in options" :key="name">
      <img
        :src="`https://emilcarlsson.se/orion/camouflages/${name.toLowerCase()}.png`"
        :alt="name"
        onerror="javascript:this.src='/base-gradient.svg'" />
      <p>
        {{ name }} {{ $t('general.unlocked') }} <span>{{ counter }}/{{ totalWeapons }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: true,
    },

    totalWeapons: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.overall-progress-component {
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 0 25px;
  padding: 10px;

  .counter {
    align-items: center;
    display: flex;
    font-size: 14px;
    justify-content: center;

    + .counter {
      margin-left: 25px;
    }

    img {
      $size: 20px;

      border-radius: $size;
      height: 100%;
      margin-right: 8px;
      object-fit: cover;
      position: relative;
      width: $size;
      z-index: 1;
    }

    p {
      cursor: default;
      font-weight: 400;

      span {
        font-weight: 600;
      }
    }
  }

  @media (max-width: $tablet) {
    justify-content: space-between;
    gap: 10px;
    margin-top: 0;

    .counter + .counter {
      margin-left: 0;
    }
  }

  @media (max-width: $mobile) {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
