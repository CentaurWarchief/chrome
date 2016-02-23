module.exports = {
  /**
   * @returns {String}
   */
  togglePlayPause() {
    return (
      `
      (function () {
        var button = document.querySelector('.ytp-play-button')
        if (button) {
          button.click()
        }
      })()
      `
    )
  }
}
