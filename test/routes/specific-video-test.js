const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {connectDatabase, disconnectDatabase} = require('../models/data-utils');
const { parseTextFromHTML, buildItemObject } = require('../test-utils');
const Video = require('../../models/video');

describe('Server path /videos/:id', () => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);
  describe('visit specific video\'s page', () => {
    it('should contain video details', async () => {
      const video = await Video.create(buildItemObject());
      const url = `/videos/${video.id}`;
      const response = await request(app).get(url);

      assert.include(response.text, video.videoUrl);
      assert.include(response.text, video.title);
      assert.include(response.text, video.description);
    })
  })
})
