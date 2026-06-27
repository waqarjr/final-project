const carousel = require('../model/module_Carousel');
const path = require('path');
const fs = require('fs');
const asyncHandler = require('../utils/asyncHandler');

const getBaseUrl = () => process.env.BASE_URL || 'http://localhost:4000';

const creat_carousel = asyncHandler(async (req, res) => {
  const { name, status, title } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  await carousel.create({
    name,
    status,
    title,
    image: req.file ? `${getBaseUrl()}/${req.file.path.replace(/\\/g, '/')}` : '',
  });
  res.json({ message: 'Your data have been updated' });
});

const read_carousel = asyncHandler(async (req, res) => {
  const read = await carousel.find();
  res.json(read);
});

const delete_carousel = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const imageRecord = await carousel.findById(id);
  if (!imageRecord) {
    return res.status(404).json({ error: 'Carousel item not found' });
  }

  if (imageRecord.image) {
    const filepath = path.join(__dirname, '../', imageRecord.image.replace(getBaseUrl() + '/', ''));
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
  }

  await carousel.findByIdAndDelete(id);
  res.json({ message: 'Your image and carousel item have been deleted' });
});

const read_update_carousel = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const fetch = await carousel.findById(id);
  if (!fetch) {
    return res.status(404).json({ error: 'Carousel item not found' });
  }
  res.json(fetch);
});

const update_carousel = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name, status, title } = req.body;

  const currentCarousel = await carousel.findById(id);
  if (!currentCarousel) {
    return res.status(404).json({ error: 'Carousel item not found' });
  }

  if (req.file !== undefined) {
    if (currentCarousel.image) {
      const filePath = path.join(__dirname, '../', currentCarousel.image.replace(getBaseUrl() + '/', ''));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    await carousel.updateOne(
      { _id: id },
      { $set: { name, image: `${getBaseUrl()}/${req.file.path.replace(/\\/g, '/')}`, status, title } }
    );
  } else {
    await carousel.updateOne({ _id: id }, { $set: { name, status, title } });
  }
  res.json({ mes: 'Your Data Have Been Updated' });
});

const select_update_carousel = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  await carousel.updateOne({ _id: id }, { $set: { status } });
  res.json({ message: 'Status updated successfully...' });
});

module.exports = {
  creat_carousel,
  read_carousel,
  delete_carousel,
  read_update_carousel,
  update_carousel,
  select_update_carousel,
};