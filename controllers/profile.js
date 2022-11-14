const Products = require('../models/profile');
const mongodb = require('mongodb')

exports.getProducts = async (req, res) => {
  const products = await Products.find();
  res.json(products);
};

exports.getProductsId = async (req, res) => {
  const id = req?.params?.id;
  const query = { _id: new mongodb.ObjectId(id) };

  const product = await Products.findOne(query)
  if (product) {
    res.send(product)
  } else {
    res.send(`Failed to find the product ID :${id}`)
  }
};

exports.postProducts = async (req, res) => {
  const { title, description, price, category } = req.body;
  const imagePath = 'http://localhost:3000/images/' + req.file.filename; // Note: set path dynamically
  const profile = new Products({
    title,
    description,
    price,
    category,
    imagePath,
  });
  const createdProfile = await profile.save();
  res.json({
    profile: {
      ...createdProfile._doc,
    },
  });
};

exports.deleteProducts = async (req, res) => {
  const id = req?.params?.id;
  const query = { _id: new mongodb.ObjectId(id) };
  const result = await Products.deleteOne(query)

  if (result && result.deletedCount) {
    res.send(`We Removed product with id : ${id}`)
  } else if (!result) {
    res.send(`Failed to remove Removed product with id : ${id}`)
  } if (!result.deletedCount) {
    res.send(`Failed to find Removed product with id : ${id}`)
  }
}

exports.updateProducts = async (req, res) => {
  const id = req?.params?.id;
  const product = req.body;
  const query = { _id: new mongodb.ObjectId(id) };
  const result = await Products.updateOne(query, { $set: product })
  if (result && result.matchedCount) {
    res.send(`We Updated product with id : ${id}`)
  } else if (!result.matchedCount) {
    res.send(`Failed to Find Removed product with id : ${id}`)
  } else {
    res.send(`Failed to Update product with id : ${id}`)
  }
}