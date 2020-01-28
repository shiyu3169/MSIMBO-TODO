const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: './assets/upload' });
const User = require('../models/User');
const Image = require('../models/Image');

router.post('/:id', upload.single('file'), async (req, res) => {
  const id = req.params.id;
  const image = req.file;
  const newImage = {
    name: image.path,
    data: '',
    mimetype: image.mimetype
  };

  removeImage(id);

  fs.readFile(newImage.name, async (err, data) => {
    if (err) throw err;
    newImage.data = data;
    const savedImage = await Image.create(newImage);
    updateUser(id, savedImage._id);
    fs.unlink(newImage.name, () => {
      res.json(savedImage);
    });
  });
});

const removeImage = async id => {
  const user = await User.findById(id);
  const oldImage = user.image;
  if (oldImage) {
    await Image.findByIdAndRemove(oldImage);
  }
};

const updateUser = async (id, imageId) => {
  await User.findByIdAndUpdate(id, { $set: { image: imageId } });
};
module.exports = router;
