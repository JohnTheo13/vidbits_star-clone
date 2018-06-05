const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {connectDatabase, disconnectDatabase} = require('../models/data-utils');
const { parseTextFromHTML, buildItemObject } = require('../test-utils');
const Video = require('../../models/video');

describe('Server path /videos/create', () => {
  beforeEach(connectDatabase);

  afterEach(disconnectDatabase);
  describe('GET', () => {
    it('add new video page', async () => {
      const video = buildItemObject();
      const response = await request(app).get('/videos/create');
      assert.equal(parseTextFromHTML(response.text, 'input#title-input'), '');
      assert.equal(parseTextFromHTML(response.text, 'textarea#description-input'), '');
      assert.equal(parseTextFromHTML(response.text, 'input#videoUrl-input'), '');
    })
  })
  describe('Post', () => {
    it('response with 400 if video not correct', async () => {
      const video = {},
            response = await request(app).post('/videos').type('form').send(video);
      assert.equal(response.status, 400);
    })
    it('video not correct form required fields', async () => {
      const video = {},
            response = await request(app).post('/videos').type('form').send(video);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    })
    it('video not correct, filled inputs intact', async () => {
      const video = { description: 'New title', videoUrl: 'ssssssss'},
            response = await request(app).post('/videos').type('form').send(video);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
      assert.include(parseTextFromHTML(response.text, 'form'), video.description);
      assert.include(response.text, video.videoUrl);
    })
  })
  describe('Valid post redirects to videos/:id', () => {
    it('should redirect', async () => {
      const video = buildItemObject(),
            response = await request(app).post('/videos').type('form').send(video);
      assert.equal(response.status, 302);
    })
    it('should render the show page', async () => {
      const video = await Video.create(buildItemObject());
      const response = await request(app).get(`/videos/${video._id}`);
      assert.include(parseTextFromHTML(response.text, '#item-title'), video.title);
      assert.include(parseTextFromHTML(response.text, '#item-description'), video.description);
      assert.include(response.text, video.videoUrl);
    })
  })
})
