const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: './assets/upload' });
const Image = require('../models/Image');
const User = require('../models/User');

router.post('/:id', upload.single('file'), async (req, res) => {
  const id = req.params.id;
  const image = req.file;
  const newImage = {
    name: image.path,
    data: '',
    mimetype: image.mimetype
  };
  fs.readFile(newImage.name, async (err, data) => {
    if (err) {
      throw err;
    }
    newImage.data = data;
    const savedImage = await Image.create(newImage);
    // Remove user old image in database
    const user = await User.findById(id);
    const oldImage = user.image;
    if (oldImage) {
      await Image.findByIdAndRemove(oldImage);
    }
    // Update corresponding user
    await User.findByIdAndUpdate(id, { $set: { image: savedImage._id } });
    // Delete files on server
    fs.unlink(newImage.name, () => {
      res.json(savedImage);
    });
  });
});

module.exports = router;
