const manufacture = require('../model/model_manufacturer');
const path = require('path');
const fs = require('fs');
const asyncHandler = require('../utils/asyncHandler');

const getBaseUrl = () => process.env.BASE_URL || 'http://localhost:4000';

const creat_manufacture = asyncHandler(async (req, res) => {
  const { name, status, date } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Manufacturer name is required' });
  }

  await manufacture.create({
    name,
    status,
    image: req.file ? `${getBaseUrl()}/${req.file.path.replace(/\\/g, '/')}` : '',
    date,
  });
  res.json({ message: 'your data has been inserted successfully' });
});

const read_manufacture = asyncHandler(async (req, res) => {
  let read;
  const { status, fromdate, todate, name } = req.body;
  if (name && name !== '') {
    read = await manufacture.find({ name: { $regex: name, $options: 'i' } });
  } else if (status && status !== '' && fromdate && fromdate !== '') {
    read = await manufacture.find({ date: { $gte: fromdate, $lte: todate }, status: status });
  } else if (status === '' && fromdate !== '') {
    read = await manufacture.find({ date: { $gte: fromdate, $lte: todate } });
  } else if (status !== '' && fromdate === '') {
    read = await manufacture.find({ status: status });
  } else {
    read = await manufacture.find();
  }
  res.json(read);
});

const delete_manufacture = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const imageRecord = await manufacture.findById(id);
  if (!imageRecord) {
    return res.status(404).json({ error: 'Manufacturer not found' });
  }

  if (imageRecord.image) {
    const filepath = path.join(__dirname, '../', imageRecord.image.replace(getBaseUrl() + '/', ''));
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
  }

  await manufacture.findByIdAndDelete(id);
  res.json({ message: 'Your image and manufacturer have been deleted' });
});

const read_update_manufacture = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const fetch = await manufacture.findById(id);
  if (!fetch) {
    return res.status(404).json({ error: 'Manufacturer not found' });
  }
  res.json(fetch);
});

const update_manufacture = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name, status } = req.body;

  const currentManufacturer = await manufacture.findById(id);
  if (!currentManufacturer) {
    return res.status(404).json({ error: 'Manufacturer not found' });
  }

  if (req.file !== undefined) {
    if (currentManufacturer.image) {
      const filePath = path.join(__dirname, '../', currentManufacturer.image.replace(getBaseUrl() + '/', ''));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    await manufacture.updateOne(
      { _id: id },
      { $set: { name, image: `${getBaseUrl()}/${req.file.path.replace(/\\/g, '/')}`, status } }
    );
  } else {
    await manufacture.updateOne({ _id: id }, { $set: { name, status } });
  }
  res.json({ mes: 'Your Data Have Been Updated' });
});

const select_update = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  await manufacture.updateOne({ _id: id }, { $set: { status } });
  res.json({ message: 'Status updated successfully...' });
});

module.exports = {
  creat_manufacture,
  read_manufacture,
  delete_manufacture,
  read_update_manufacture,
  update_manufacture,
  select_update,
};