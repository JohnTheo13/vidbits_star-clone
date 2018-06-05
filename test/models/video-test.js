const {assert} = require('chai');
const request = require('supertest');

const {connectDatabase, disconnectDatabase} = require('./data-utils');
const Video = require('../../models/video');

describe('Model: Video', () => {
  beforeEach(connectDatabase);

  afterEach(disconnectDatabase);

  // Write your tests below:
  describe('should contain a title', () => {
    it('and be a string', async () => {
      const title = 3;
      const item = new Video({title});
      assert.strictEqual(item.title, title.toString());
    });
    it('and be required', async () => {
      const item = new Video({title: ''})
      item.validateSync();
      assert.equal(item.errors.title.message, 'Path `title` is required.');
    });
  });
  describe('should contain a description', () => {
    it('and be a string', async () => {
      const description = 3;
      const item = new Video({description});
      assert.strictEqual(item.description, description.toString());
    });
    it('and be required', async () => {
      const item = new Video({description: ''})
      item.validateSync();
      assert.equal(item.errors.description.message, 'Path `description` is required.');
    });
  });
  describe('should contain an videoUrl', () => {
    it('and be a string', async () => {
      const videoUrl = 3;
      const item = new Video({videoUrl});
      assert.strictEqual(item.videoUrl, videoUrl.toString());
    });
    it('and be required', async () => {
      const item = new Video({videoUrl: ''})
      item.validateSync();
      assert.equal(item.errors.videoUrl.message, 'Path `videoUrl` is required.');
    });
  });
});
