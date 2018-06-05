const router = require('express').Router();
const Video = require('../models/video');

router.get('/', async (req, res, next) => {
  const videos = await Video.find({});
  console.log(videos.lenghth);
  res.render('videos', {videos})
})

router.get('/videos/create', (req, res, next) => {
  res.render('create')
})

router.post('/videos', async (req, res, next) => {

  const video = new Video({...req.body});
  video.validateSync();
  if (video.errors) {
    res.status(400).render('create', {video});
  } else {
    await video.save();
    res.redirect(`/videos/${video._id}`);
  }
})

router.get('/videos/:id', async (req, res, next) => {
  const video = await Video.find({_id: req.params.id})
  res.status(200).render('videos/show', ...video);
});

router.get('/videos/:id/edit', async (req, res, next) => {
  const video = await Video.find({_id: req.params.id})
  res.status(200).render('videos/update', ...video);
});

router.post('/videos/:id', async (req, res, next) => {
  console.log(req.body);
  const { title, description, imageUrl } = req.body;
  const url = `/videos/${req.params.id}`;
  try {
    Video.updateOne(
      {_id: req.params.id},
       { $set: { "title" : title, "description": description, "imageUrl": imageUrl } }
    ).then(
      res.status(204).redirect(url)
    )
  } catch(err) {
    console.log(err)
    res.status(302).redirect('/')
  }
});

router.post('/videos/:id/delete', async (req, res, next) => {
  await Video.deleteOne({ _id: req.params.id })
  res.status(204).redirect('/');
});


module.exports = router;
