const category = require('../model/ModelCategories');
const path = require('path');
const fs = require('fs');
const asyncHandler = require('../utils/asyncHandler');

const getBaseUrl = () => process.env.BASE_URL || 'http://localhost:4000';

const creat_category = asyncHandler(async (req, res) => {
  const { name, status, date } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Category name is required' });
  }

  await category.create({
    name,
    status,
    date,
    image: req.file ? `${getBaseUrl()}/${req.file.path.replace(/\\/g, '/')}` : '',
  });
  res.json({ message: 'your data has been inserted successfully...' });
});

const read_category = asyncHandler(async (req, res) => {
  let read;
  const { status, fromdate, todate, name } = req.body;
  if (name && name !== '') {
    read = await category.find({ name: { $regex: name, $options: 'i' } });
  } else if (status && status !== '' && fromdate && fromdate !== '') {
    read = await category.find({ date: { $gte: fromdate, $lte: todate }, status: status });
  } else if (status === '' && fromdate !== '') {
    read = await category.find({ date: { $gte: fromdate, $lte: todate } });
  } else if (status !== '' && fromdate === '') {
    read = await category.find({ status: status });
  } else {
    read = await category.find();
  }
  res.json(read);
});

const delete_category = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const imageRecord = await category.findById(id);
  if (!imageRecord) {
    return res.status(404).json({ error: 'Category not found' });
  }

  if (imageRecord.image) {
    const filepath = path.join(__dirname, '../', imageRecord.image.replace(getBaseUrl() + '/', ''));
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
  }

  await category.findByIdAndDelete(id);
  res.json({ message: 'Your image and category have been deleted' });
});

const read_update_category = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const fetch = await category.findById(id);
  if (!fetch) {
    return res.status(404).json({ error: 'Category not found' });
  }
  res.json(fetch);
});

const update_category = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name, status } = req.body;

  const currentCategory = await category.findById(id);
  if (!currentCategory) {
    return res.status(404).json({ error: 'Category not found' });
  }

  if (req.file !== undefined) {
    if (currentCategory.image) {
      const filePath = path.join(__dirname, '../', currentCategory.image.replace(getBaseUrl() + '/', ''));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    await category.updateOne(
      { _id: id },
      { $set: { name, image: `${getBaseUrl()}/${req.file.path.replace(/\\/g, '/')}`, status } }
    );
  } else {
    await category.updateOne({ _id: id }, { $set: { name, status } });
  }
  res.json({ mes: 'Your Data Have Been Updated' });
});

const select_update = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  await category.updateOne({ _id: id }, { $set: { status } });
  res.json({ message: 'Status updated successfully...' });
});

module.exports = {
  creat_category,
  read_category,
  delete_category,
  read_update_category,
  update_category,
  select_update,
};