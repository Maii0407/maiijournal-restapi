const { body, validationResult } = require( 'express-validator' );

const Category = require( '../models/category' );

exports.categoryList = async ( req, res, next ) => {
  const categories = await Category.find().sort({ name: 1 });

  return res.json({ categories });
};

exports.categoryDetail = async ( req, res, next ) => {
  const category = await Category.findById( req.params.categoryId );

  return res.json({ category });
};

exports.categoryCreate = [
  body( 'name', 'Category Name is required' ).trim().isLength({ min: 1 }).escape(),

  ( req, res, next ) => {
    const errors = validationResult( req );

    const category = new Category({
      name: req.body.name
    }).save( err => {
      if( err ) { return next( err ) };

      return res.json({ message: 'Category Create Success' })
    })
  }
];

exports.categoryDelete = async ( req, res, next ) => {
  const category = await Category.findById( req.params.categoryId );

  if( category ) {
    await category.deleteOne();
    return res.json({ message: 'Category Deleted' });
  }

  return res.json({
    message: 'Category Delete Failed',
    category
  });
};

exports.categoryUpdate = [
  body( 'name', 'Category Name is required' ).trim().isLength({ min: 1 }).escape(),

  async ( req, res, next ) => {
    const errors = validationResult( req );

    if( !errors.isEmpty() ) {
      res.json({ errors: errors.array() });
      return;
    }
    else {
      const update = await Category.updateOne(
        { _id: req.params.categoryId },
        { name: req.body.name }
      );

      if( update ) {
        return res.json({ message: 'Category Updated' });
      }

      return res.json({ message: 'Update Failed' });
    }
  }
];