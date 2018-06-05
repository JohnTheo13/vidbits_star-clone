const {assert} = require('chai');
const { buildItemObject } = require('../test-utils');

describe('User visits create page', () => {
  beforeEach(() => browser.url('/videos/create'))

  describe('expected page to', () => {
    it('contains Save a video button', () => {
      assert.include(browser.getText('button[type=submit]'), 'save video')
    })
  })
  describe('save new video', () => {
    const videoEntity = buildItemObject();
    it('form is correct', () => {
      assert.equal(browser.getAttribute('form', 'method'), 'post')
      assert.include(browser.getAttribute('form', 'action'), 'videos')
    })
    it('saves the video', () => {
      browser.setValue('#title-input', videoEntity.title);
      browser.setValue('#description-input', videoEntity.description);
      browser.setValue('#videoUrl-input', videoEntity.videoUrl);
      browser.click('button[type=submit]');
      assert.include(browser.getText('body'), videoEntity.title)
    })
  })
})
