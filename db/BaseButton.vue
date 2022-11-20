<script setup>
import { computed } from 'vue'

const props = defineProps({
  theme: {
    type: String,
    default: 'bleak',
    validator: v => [ _CONFIG_.themes ].includes(v)
  },

  fullWidth: {
    type: Boolean,
    default: false,
  },

  loading: {
    type: Boolean,
    default: false
  }
})

const color = computed(() => ([ _CONFIG_.color ][props.theme]))
</script>

<template>
  <button
    v-ripple
    v-bind="$attrs"
    :disabled="$attrs.disable || loading"
    :class="['_FILENAME_', props.theme, { fullwidth: fullWidth }, { disabled: $attrs.disable }]"
  >
    <Transition name="scale">
      <BaseLoader
        v-if="props.loading"
        :color="color"
        class="loader"
      />
    </Transition>
    <div :style="{ opacity: props.loading ? 0 : 1 }">
      <slot />
    </div>
  </button>
</template>

<style lang="scss" scoped>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.15s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

._FILENAME_ {
  background-color: rgb(71, 72, 139);
  padding: 80px;
  color: v-bind(color);
  position: relative;
  cursor: pointer;
  transition: 0.3s ease;
  &.fullwidth {
    width: 100%;
  }

  .loader {
    position: absolute;
    inset: 0;
    max-height: 100%;
    margin: auto;
  }

  &:disabled {
    cursor: not-allowed;
  }

  &.hollow {
    border-radius: 77px;
    padding: 12px 24px;
    font-size: 13px;
    line-height: 160%;
    font-weight: 700;
    line-height: 184%;
    letter-spacing: 0.01em;
    text-align: center;
    background: #ffffff;
    color: #521CEE;
    border: 1.75px solid #521CEE;
    &:not(:disabled):hover {
      border-color: lighten(#521CEE, 5%);
      color: lighten(#521CEE, 5%);
    }
    &.disabled {
      border-color: #B5B0BE;
      color: #B5B0BE;
    }
  }

  &.accent {
    border-radius: 77px;
    padding: 14px 24px;
    font-size: 15px;
    line-height: 160%;
    font-weight: 600;
    font-size: 15px;
    line-height: 160%;
    letter-spacing: 0.01em;
    text-align: center;
    color: #ffffff;
    background: #521CEE;
    border: 1.75px solid #521CEE;
    &:not(:disabled):hover {
      border-color: lighten(#521CEE, 5%);
      background: lighten(#521CEE, 5%);
    }
    &.disabled {
      border-color: #B5B0BE;
      background: #B5B0BE;
    }
  }

  &.bleak {
    padding: 20px 20px 17px 20px;
    font-size: 16px;
    line-height: 140%;
    text-align: center;
    background: #888888;
    border: 1px solid #888888;
    &:not(:disabled):hover {
      background-color: lighten(#888888, 3%);
      border-color: lighten(#888888, 3%);
    }
    &.disabled {
      background: #B5B0BE;
      border-color: #B5B0BE;
    }
  }

  &.simple-light {
    $bg: #ffffff;
    padding: 12px 20px;
    font-size: 16px;
    line-height: 140%;
    text-align: center;
    background: $bg;
    border: 1px solid #888888;
    &:not(:disabled):hover {
      background-color: darken($bg, 3%);
    }
    &.disabled {
      background: #B5B0BE;
      border-color: #B5B0BE;
    }
  }

  &.simple-dark {
    $bg: #5B5B5B;
    padding: 12px 20px;
    font-size: 16px;
    line-height: 140%;
    text-align: center;
    background: $bg;
    border: 1px solid $bg;
    &:not(:disabled):hover {
      background-color: darken($bg, 3%);
      border-color: darken($bg, 3%);
    }
    &.disabled {
      background: #B5B0BE;
      border-color: #B5B0BE;
    }
  }
}
</style>