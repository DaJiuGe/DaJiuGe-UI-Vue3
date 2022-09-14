<script lang="ts" setup>
import { provide } from 'vue'
import VueTypes, { array, arrayOf, oneOfType } from 'vue-types'
import { CheckboxGroupKey } from './meta'
import SuCheckbox from './index.vue'

interface CheckboxOption {
  label: string
  value: string | number | boolean
  disabled?: boolean
}

type Primitive = string | number | boolean

const props = defineProps({
  value: arrayOf(oneOfType([String, Number, Boolean])).def([]),
  options: array<CheckboxOption>().def([]),
  disabled: VueTypes.bool.def(false),
})

const emit = defineEmits < {
  (e: 'update:value', value: Primitive[]): void
}>()

provide(CheckboxGroupKey, {
  checkedValue: computed(() => props.value),
  disabled: computed(() => props.disabled),
  toggleValue: (val: Primitive) => {
    const checked = [...props.value]
    const index = checked.indexOf(val)
    if (index === -1)
      checked.push(val)
    else
      checked.splice(index, 1)
    emit('update:value', checked)
  },
})
</script>

<template>
  <div class="su-checkbox-group">
    <slot />
    <template v-if="!$slots.default">
      <SuCheckbox
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
        :disabled="disabled || option?.disabled"
      >
        {{ option.label }}
      </SuCheckbox>
    </template>
  </div>
</template>
