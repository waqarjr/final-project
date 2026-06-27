const websetting = require('../model/model_Websetting');
const Icon_change = require('../model/model_IconChange');
const fs = require('fs');
const path = require('path');
const asyncHandler = require('../utils/asyncHandler');

const getBaseUrl = () => process.env.BASE_URL || 'http://localhost:4000';

const read = asyncHandler(async (req, res) => {
  const alpha = await websetting.find();
  res.json(alpha);
});

const update = asyncHandler(async (req, res) => {
  const { email, phoneNo1, phoneNo2, address, id } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'Id is required to update web settings' });
  }

  await websetting.updateOne({ _id: id }, { $set: { email, phoneNo1, phoneNo2, address } });
  res.json({ message: 'your data have been updated' });
});

const readIcon = asyncHandler(async (req, res) => {
  const alpha = await Icon_change.find();
  res.json(alpha);
});

const updateIcon = asyncHandler(async (req, res) => {
  if (req.file !== undefined) {
    const imageRecords = await Icon_change.find();
    if (imageRecords.length > 0 && imageRecords[0].icon) {
      const filePath = path.join(__dirname, '../', imageRecords[0].icon.replace(getBaseUrl() + '/', ''));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      await Icon_change.updateOne(
        { _id: imageRecords[0]._id },
        { $set: { icon: `${getBaseUrl()}/${req.file.path.replace(/\\/g, '/')}` } }
      );
    } else {
      await Icon_change.create({
        icon: `${getBaseUrl()}/${req.file.path.replace(/\\/g, '/')}`,
      });
    }
    res.json({ mes: 'Your Data Have Been Updated' });
  } else {
    res.status(400).json({ error: 'No icon file provided' });
  }
});

module.exports = { update, read, updateIcon, readIcon };