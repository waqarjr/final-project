const Product = require('../model/module_Products');
const multipleImage = require('../model/module_Prod_Multiple');
const fs = require('fs');
const path = require('path');
const asyncHandler = require('../utils/asyncHandler');

const getBaseUrl = () => process.env.BASE_URL || 'http://localhost:4000';

const insertImage = asyncHandler(async (req, res) => {
  const { title, category, manufacturer, price, price_discount, keywords, stock, short_description, long_description, status } = req.body;
  const image = req.files && req.files['image'] ? req.files['image'][0] : null;

  if (!title || !category || !manufacturer || !price || stock === undefined) {
    return res.status(400).json({ error: 'Title, category, manufacturer, price, and stock are required' });
  }

  const newProd = await Product.create({
    title,
    category,
    manufacturer,
    price: Number(price),
    price_discount: price_discount ? Number(price_discount) : 0,
    keywords,
    stock: Number(stock),
    short_description,
    long_description,
    status: status || 'active',
    image: image ? `${getBaseUrl()}/${image.path.replace(/\\/g, '/')}` : '',
  });

  const images = req.files && req.files['multipleImages'] ? req.files['multipleImages'] : [];
  const imageData = images.map((file) => ({
    images: `${getBaseUrl()}/${file.path.replace(/\\/g, '/')}`,
    person_id: newProd._id,
  }));

  if (imageData.length > 0) {
    await multipleImage.insertMany(imageData);
  }

  res.json({ message: 'Data Has Been Added...' });
});

const readData = asyncHandler(async (req, res) => {
  const { category, manufacturer, status, limit, name } = req.body;
  const query = {};

  if (name && name !== '') {
    query.title = { $regex: name, $options: 'i' };
  }
  if (category && category !== '') {
    query.category = category;
  }
  if (manufacturer && manufacturer !== '') {
    query.manufacturer = manufacturer;
  }
  if (status && status !== '') {
    query.status = status;
  }

  let read = Product.find(query);
  if (limit) {
    read = read.limit(Number(limit));
  }

  const results = await read;
  res.json(results);
});

const update_Read_Data = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const data = await Product.findById(id);
  if (!data) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(data);
});

const update_Mul_Images = asyncHandler(async (req, res) => {
  const alpha = await multipleImage.find({ person_id: req.params.id });
  res.json(alpha);
});

const mul_Del_Image = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const imageLocation = await multipleImage.findById(id);
  if (!imageLocation) {
    return res.status(404).json({ error: 'Image not found' });
  }

  const filepath = path.join(__dirname, '../', imageLocation.images.replace(getBaseUrl() + '/', ''));
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
  }
  await multipleImage.findByIdAndDelete(id);
  res.json({ message: 'Your Image Have Been Deleted Sucessfully' });
});

const update = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { title, category, manufacturer, vendor, price, price_discount, keywords, stock, short_description, long_description, status } = req.body;

  const updateFields = {
    title,
    category,
    manufacturer,
    vendor,
    price: Number(price),
    price_discount: price_discount ? Number(price_discount) : 0,
    keywords,
    stock: Number(stock),
    short_description,
    long_description,
    status,
  };

  const currentProduct = await Product.findById(id);
  if (!currentProduct) {
    return res.status(404).json({ error: 'Product not found' });
  }

  if (req.files && req.files['image'] !== undefined) {
    const filePath = path.join(__dirname, '../', currentProduct.image.replace(getBaseUrl() + '/', ''));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    updateFields.image = `${getBaseUrl()}/${req.files['image'][0].path.replace(/\\/g, '/')}`;
  }

  await Product.updateOne({ _id: id }, { $set: updateFields });

  if (req.files && req.files['multipleImages'] !== undefined) {
    const imagePaths = req.files['multipleImages'].map((file) => `${getBaseUrl()}/${file.path.replace(/\\/g, '/')}`);
    const imageData = imagePaths.map((path) => ({
      images: path,
      person_id: id,
    }));
    await multipleImage.insertMany(imageData);
  }

  res.json({ mes: 'Your Data Have Been Updated' });
});

const deleteData = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const imageLocation = await Product.findById(id);
  if (!imageLocation) {
    return res.status(404).json({ error: 'Product not found' });
  }

  await Product.deleteOne({ _id: id });
  if (imageLocation.image) {
    const filepath = path.join(__dirname, '../', imageLocation.image.replace(getBaseUrl() + '/', ''));
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
  }

  const multiple = await multipleImage.find({ person_id: id });
  await multipleImage.deleteMany({ person_id: id });

  for (const item of multiple) {
    if (item.images) {
      const filePathImage = path.join(__dirname, '../', item.images.replace(getBaseUrl() + '/', ''));
      if (fs.existsSync(filePathImage)) {
        fs.unlinkSync(filePathImage);
      }
    }
  }

  res.json({ message: 'Your product and associated images have been deleted' });
});

const select_update_state = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  await Product.updateOne({ _id: id }, { $set: { status } });
  res.json({ message: 'Status updated successfully...' });
});

const front_filter = asyncHandler(async (req, res) => {
  const category = req.body.category || '';
  const manufacture = req.body.manufacture || '';

  const Array_Category = category ? category.split(',') : [];
  const Array_Manufacture = manufacture ? manufacture.split(',') : [];

  const query = {};
  if (Array_Category.length > 0 && category.trim()) {
    query.category = { $in: Array_Category };
  }
  if (Array_Manufacture.length > 0 && manufacture.trim()) {
    query.manufacturer = { $in: Array_Manufacture };
  }

  const data = await Product.find(query);
  res.json(data);
});

module.exports = {
  select_update_state,
  insertImage,
  readData,
  update_Read_Data,
  update_Mul_Images,
  mul_Del_Image,
  update,
  deleteData,
  front_filter,
};