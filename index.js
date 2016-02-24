#!/usr/bin/env node
const Chrome = require('chrome-remote-interface')
const YouTube = require('./YouTube')

Chrome.List({}, (err, list) => {
  if (err) {
    console.error(err.message)
    return
  }

  const tabs = list.filter(tab => tab.type === 'page').map((tab, index) => {
    return {
      index,
      id: tab.id,
      url: tab.url
    }
  })

  const youtube = tabs.filter(tab => /(www\.)?youtube.com/.test(tab.url))

  if (youtube.length === 0) {
    process.stdout.exit(0)
    return
  }

  Chrome({ chooseTab: () => youtube[0].index }, chrome => {
    chrome.Runtime.evaluate({
      expression: YouTube.togglePlayPause()
    }, () => {
      chrome.close()
    })
  })
})
