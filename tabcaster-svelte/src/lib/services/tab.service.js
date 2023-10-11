import { get, writable } from 'svelte/store'
import { genID, updateHTMLAttr } from '$lib/modules/utils.module.js'

// STORES
export const tab = writable(null)
export const visible = writable(true)
export const active = writable(true)
export const activeID = writable(null)

// BROADCAST CHANNEL
export const tabChannel = new BroadcastChannel('tabcaster')

// PRIVATE FUNCTIONS
const visibilityListener = async () => {
  document.addEventListener('visibilitychange', () => {
    let isVisible = document.visibilityState === 'visible'
    visible.set(isVisible)
    updateHTMLAttr('tab-visible', isVisible)
  })
}

const setTabName = async () => {
  let __tabID__ = window.name
  if (!__tabID__.startsWith('TAB--')) __tabID__ = genID('TAB')
  tab.set(window.name = __tabID__)
  updateHTMLAttr('tab-name', __tabID__)
}

const setActive = async () => {
  const __tab__ = get(tab)
  tabChannel.postMessage({ topic: 'tab-active', tab: __tab__ })
  active.set(true)
  activeID.set(__tab__)
  updateHTMLAttr('tab-active', true)
}

const focusListener = async () => {
  window.addEventListener('focus', () => {
    const __tab__ = get(tab)
    tabChannel.postMessage({ topic: 'tab-active', tab: __tab__ })
    active.set(true)
    activeID.set(__tab__)
    updateHTMLAttr('tab-active', true)
  })
}

const beforeUnloadListener = () => {
  window.addEventListener('beforeunload', () => {
    tabChannel.postMessage({ topic: 'tab-close', tab: get(tab) })
  })
}

// MODULE FUNCTIONS
export const initTab = async () => {
  await setTabName()
  await visibilityListener()
  await focusListener()
  await setActive()
 beforeUnloadListener()
}

// CHANNEL LISTENERS
tabChannel.addEventListener('message', event => {
  if (event.data.topic === 'tab-active') {
    updateHTMLAttr('tab-active', false)
    active.set(false)
    activeID.set(event.data.tab)
  }

  if (event.data.topic === 'tab-close') {
    console.log('tab closed for', event.data.tab)
  }
})
