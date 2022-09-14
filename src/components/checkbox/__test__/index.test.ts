import { describe, expect, it } from 'vitest'
import { flushPromises, mount, shallowMount } from '@vue/test-utils'
import SuCheckbox from '../index.vue'

describe('Checkbox', () => {
  it('should toggle checked when click', async () => {
    const wrapper = mount(SuCheckbox, {
      attachTo: document.body,
    })
    await wrapper.find('input').trigger('click')
    expect(wrapper.find('.su-checkbox').exists()).toBeTruthy()
    await wrapper.trigger('click')
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.su-checkbox.is-checked').exists()).toBeTruthy()
  })
})
