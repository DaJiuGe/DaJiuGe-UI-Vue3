<script lang="ts" setup>
import { provide } from 'vue'
import VueTypes, { array, oneOfType } from 'vue-types'
import { RadioGroupKey } from './meta'
import SuRadio from './index.vue'

interface RadioOption {
  label: string
  value: string | number | boolean
  disabled?: boolean
}

const props = defineProps({
  value: oneOfType([String, Number, Boolean]).def(''),
  options: array<RadioOption>().def([]),
  disabled: VueTypes.bool.def(false),
})

const emit = defineEmits < {
  (e: 'update:value', value: String | Number | Boolean): void
}>()

provide(RadioGroupKey, {
  pickedValue: computed(() => props.value),
  disabled: computed(() => props.disabled),
  emitValue: (val: String | Number | Boolean) => {
    emit('update:value', val)
  },
})
</script>

<template>
  <div class="su-radio-group">
    <slot />
    <template v-if="!$slots.default">
      <SuRadio
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
        :disabled="disabled || option?.disabled"
      >
        {{ option.label }}
      </SuRadio>
    </template>
  </div>
</template>
