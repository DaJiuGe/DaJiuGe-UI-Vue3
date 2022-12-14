<script lang="ts" setup>
import VueTypes, { oneOfType } from 'vue-types'
import { computed, inject } from 'vue'
import { RadioGroupKey } from './meta'
import type SuRadioGroup from './group.vue'

const props = defineProps({
  checked: VueTypes.bool.def(false),
  value: oneOfType([String, Number, Boolean]).def(''),
  disabled: VueTypes.bool.def(false),
})

const emit = defineEmits < {
  (e: 'update:checked', picked: boolean): void
  (e: 'change', picked: boolean, event: Event): void
}>()

const group = inject(RadioGroupKey, {}) as typeof SuRadioGroup

const isGroup = computed(() => group && Object.keys(group).length > 0)

const localChecked = ref(props.checked)

const isChecked = computed(() => {
  return isGroup.value ? group.pickedValue.value === props.value : localChecked.value
})

const isDisabled = computed(() => {
  return isGroup.value ? group.disabled.value || props.disabled : props.disabled
})

const handleClick = () => {
  if (!isGroup.value && localChecked.value)
    return

  localChecked.value = !localChecked.value
  emit('update:checked', localChecked.value)
  isGroup.value && group?.emitValue(props.value)
}
</script>

<template>
  <label
    class="su-radio"
    :class="[
      {
        'is-checked': isChecked,
        'is-disabled': isDisabled,
      },
    ]"
  >
    <span class="su-radio__input">
      <span class="su-radio__inner" />
      <input
        :checked="isChecked"
        :value="value"
        class="su-radio__original"
        type="radio"
        :disabled="isDisabled"
        @click="handleClick"
      >
    </span>
    <span class="su-radio__label">
      <slot />
      <template v-if="!$slots.default">{{ value }}</template>
    </span>
  </label>
</template>

<style lang="scss" scoped>
.su-radio {
  position: relative;
  display: inline-block;
  margin-right: 30px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  color: #606266;
  outline: none;
  user-select: none;
  cursor: pointer;

  .su-radio__input {
    position: relative;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    outline: none;
    cursor: pointer;
    vertical-align: middle;

    .su-radio__inner {
      position: relative;
      display: inline-block;
      width: 14px;
      height: 14px;
      background-color: #fff;
      border: 1px solid #dcdfe6;
      border-radius: 50%;
      cursor: pointer;
      box-sizing: border-box;

      &::after {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 6px;
        height: 6px;
        background-color: #fff;
        border-radius: 50%;
        content: "";
        transform: translate(-50%, -50%) scale(0);
        transition: transform 0.15s ease-in;
      }
    }

    .su-radio__original {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0;
      opacity: 0;
      outline: none;
      z-index: -1;
    }
  }

  .su-radio__label {
    padding-left: 10px;
    font-size: 14px;
  }
}

.su-radio.is-checked {
  .su-radio__input {
    .su-radio__inner {
      background-color: #409eff;
      border-color: #409eff;

      &::after {
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }

  .su-radio__label {
    color: #409eff;
  }
}

.su-radio.is-disabled {
  .su-radio__input {
    .su-radio__inner {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      cursor: not-allowed;

      &::after {
        cursor: not-allowed;
        background-color: #f5f7fa;
      }
    }
  }

  &.is-checked {
    .su-radio__input {
      .su-radio__inner::after {
        background-color: #c0c4cc;
      }
    }
  }

  .su-radio__label {
    color: #c0c4cc;
    cursor: not-allowed;
  }
}
</style>
