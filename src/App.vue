<script setup lang="ts">
import { ref } from 'vue'
import { string } from 'vue-types'
import SuButton from './components/button/index.vue'
import SuRadio from './components/radio/index.vue'
import SuRadioGroup from './components/radio/group.vue'
import SuCheckbox from './components/checkbox/index.vue'
import SuCheckboxGroup from './components/checkbox/group.vue'

const check1 = ref(false)
const check2 = ref(true)
const checkArr = ref(['0', '1'])

const checkRef = ref()
const handleClick = () => {
  checkRef.value.$el.click()
}

const manChecked = ref(false)
const womanChecked = ref(false)

const gender = ref('woman')
const options = [
  { label: '男', value: 'man' },
  { label: '女', value: 'woman' },
  { label: '未知', value: 'unknown', disabled: true },
]

const handleChanged = (checked: boolean) => {
  console.log('checked', checked)
}
</script>

<template>
  <div id="app">
    <div class="row">
      <SuCheckbox ref="checkRef" v-model:checked="check1" @change="handleChanged">
        男
      </SuCheckbox>
      <SuCheckbox v-model:checked="check2">
        女
      </SuCheckbox>
    </div>
    <div class="row">
      <SuCheckboxGroup v-model:value="checkArr" :options="options" />
    </div>
    <div class="row">
      <SuRadio v-model:checked="manChecked">
        男
      </SuRadio>
      <SuRadio v-model:checked="womanChecked">
        女
      </SuRadio>
    </div>
    <div class="row">
      <SuRadioGroup v-model:value="gender" :options="options" />
    </div>
    <div class="row">
      <SuRadioGroup v-model:value="gender" :options="options" disabled />
    </div>
    <div class="row">
      <SuRadioGroup v-model="gender">
        <SuRadio label="0">
          男
        </SuRadio>
        <SuRadio label="1" disabled>
          女
        </SuRadio>
      </SuRadioGroup>
    </div>
    <div class="row">
      <SuRadioGroup v-model="gender">
        <SuRadio label="0" disabled>
          男
        </SuRadio>
        <SuRadio label="1" disabled>
          女
        </SuRadio>
      </SuRadioGroup>
    </div>
    <div class="row">
      <SuButton>
        确定
      </SuButton>
      <SuButton type="primary">
        确定
      </SuButton>
      <SuButton type="info">
        确定
      </SuButton>
      <SuButton type="warning">
        确定
      </SuButton>
      <SuButton type="danger">
        确定
      </SuButton>
    </div>
    <div class="row">
      <SuButton round>
        确定
      </SuButton>
      <SuButton type="primary" round>
        确定
      </SuButton>
      <SuButton type="info" round>
        确定
      </SuButton>
      <SuButton type="warning" round>
        确定
      </SuButton>
      <SuButton type="danger" round>
        确定
      </SuButton>
    </div>
    <div class="row">
      <SuButton circle>
        确定
      </SuButton>
      <SuButton type="primary" circle>
        确定
      </SuButton>
      <SuButton type="info" circle>
        确定
      </SuButton>
      <SuButton type="warning" circle>
        确定
      </SuButton>
      <SuButton type="danger" circle>
        确定
      </SuButton>
    </div>
    <div class="row">
      <SuButton icon="delete">
        确定
      </SuButton>
      <SuButton icon="delete" type="primary">
        确定
      </SuButton>
      <SuButton icon="delete" type="info">
        确定
      </SuButton>
      <SuButton icon="delete" type="warning">
        确定
      </SuButton>
      <SuButton icon="delete" type="danger">
        确定
      </SuButton>
    </div>
    <div class="row">
      <SuButton icon="delete" circle />
      <SuButton icon="delete" type="primary" circle />
      <SuButton icon="delete" type="info" circle />
      <SuButton icon="delete" type="warning" circle />
      <SuButton icon="delete" type="danger" circle />
    </div>
    <div class="row">
      <SuButton disabled>
        确定
      </SuButton>
      <SuButton type="primary" disabled>
        确定
      </SuButton>
      <SuButton type="info" disabled>
        确定
      </SuButton>
      <SuButton type="warning" disabled>
        确定
      </SuButton>
      <SuButton type="danger" disabled>
        确定
      </SuButton>
    </div>
  </div>
</template>

  <style scoped>
  .row {
    margin-bottom: 24px;
  }

  .su-button {
    margin-right: 8px !important;
  }
  </style>

