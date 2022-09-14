import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import SuButton from '../index.vue'

describe('Checkbox', () => {
  it('should toggle checked when click', async () => {
    const wrapper = mount(SuButton)
    expect(wrapper.find('.su-button').exists()).toBeTruthy()
    await wrapper.trigger('click')
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.su-button.is-round').exists()).toBeTruthy()
  })
})
