import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import GameStart from '../GameStart.vue'

describe('GameStart', () => {
  it('renders properly', () => {
    const wrapper = mount(GameStart, {
      props: {
        isGameStarted: true,
        timing: 10,
        cardsCount: 8
      }
    })
    expect(wrapper.text()).toContain('新的一局')
    expect(wrapper.text()).toContain('卡牌: 8')
    expect(wrapper.text()).toContain('耗時: 10')
  })
})
