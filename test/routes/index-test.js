const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');

const {connectDatabase, disconnectDatabase} = require('../models/data-utils');
const { parseTextFromHTML, buildItemObject } = require('../test-utils');
const Video = require('../../models/video');

describe('Render existing videos', () => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);
  describe('GET /', () => {
    it('renders videos', async () => {

      const video1 = await Video.create(buildItemObject());
      const video2 = await Video.create(buildItemObject({title: 'Item2', description: 'description 2', videoUrl: 'url1'}));
      const response = await request(app).get(`/`);

      assert.include(response.text, video1.title);
      assert.include(response.text, video2.title);
    })
  })
})
