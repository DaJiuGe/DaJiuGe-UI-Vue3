<script lang="ts" setup>
import { computed, inject, ref } from 'vue'
import VueTypes, { oneOfType } from 'vue-types'
import type SuCheckGroup from './group.vue'
import type { Primitive } from './meta'
import { CheckboxGroupKey } from './meta'

const props = defineProps({
  checked: VueTypes.bool.def(false),
  value: oneOfType([String, Number, Boolean]).def(''),
  disabled: VueTypes.bool.def(false),
})

const emit = defineEmits<{
  (e: 'update:checked', val: boolean): void
  (e: 'change', val: boolean, event?: Event): void
}>()

const group = inject(CheckboxGroupKey, {}) as typeof SuCheckGroup

const isGroup = computed(() => group && Object.keys(group).length > 0)

const localChecked = ref(props.checked)

const isChecked = computed(() => (isGroup.value ? (group.checkedValue.value as Primitive[])?.includes(props.value) : localChecked.value))

const isDisabled = computed(() => {
  return isGroup.value ? group.disabled.value || props.disabled : props.disabled
})

const handleClick = () => {
  localChecked.value = !localChecked.value
  emit('update:checked', localChecked.value)
  isGroup.value && group?.toggleValue(props.value)
}

const handleChange = (event: Event) => {
  emit('change', localChecked.value, event)
}
</script>

<template>
  <label
    class="su-checkbox" :class="{
      'is-checked': isChecked,
      'is-disabled': isDisabled,
    }"
  >
    <span class="su-checkbox__input">
      <span class="su-checkbox__inner" />
      <input
        :checked="isChecked"
        type="checkbox"
        class="su-checkbox__original"
        :disabled="isDisabled"
        @change="handleChange"
        @click="handleClick"
      >
    </span>
    <span class="su-checkbox__label">
      <slot />
      <template v-if="!$slots.default">{{ value }}</template>
    </span>
  </label>
</template>

<style lang="scss" scoped>
.su-checkbox {
  position: relative;
  display: inline-block;
  margin-right: 30px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  color: #606266;
  cursor: pointer;
  user-select: none;

  .su-checkbox__input {
    position: relative;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    outline: none;
    cursor: pointer;
    vertical-align: middle;

    .su-checkbox__inner {
      position: relative;
      display: inline-block;
      width: 14px;
      height: 14px;
      background-color: #fff;
      border: 1px solid #dcdfe6;
      border-radius: 2px;
      transition:
        border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
        background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
      z-index: 1;
      box-sizing: border-box;

      &::after {
        position: absolute;
        top: 1px;
        left: 4px;
        width: 3px;
        height: 7px;
        border: 1px solid #fff;
        box-sizing: content-box;
        content: "";
        border-left: 0;
        border-top: 0;
        transform: rotate(45deg) scaleY(0);
        transition: transform 0.15s ease-in 0.05s;
        transform-origin: center;
      }
    }

    .su-checkbox__original {
      position: absolute;
      left: 10px;
      margin: 0;
      width: 0;
      height: 0;
      opacity: 0;
      outline: none;
      z-index: -1;
    }
  }

  .su-checkbox__label {
    display: inline-block;
    padding-left: 10px;
    font-size: 14px;
    line-height: 19px;
  }
}

.su-checkbox.is-checked {
  .su-checkbox__input {
    .su-checkbox__inner {
      background-color: #409eff;
      border-color: #409eff;

      &::after {
        transform: rotate(45deg) scaleY(1);
      }
    }
  }

  .su-checkbox__label {
    color: #409eff;
  }
}
</style>
