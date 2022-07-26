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
    await category.remove();
    return res.json({ message: 'Category Delete Success' });
  }

  return res.json({ category });
};

exports.categoryUpdate = [
  body( 'name', 'Category Name is required' ).trim().isLength({ min: 1 }).escape(),

  ( req, res, next ) => {
    const errors = validationResult( req );

    const category = new Category({
      name: req.body.name,
      _id: req.params.categoryId
    });

    if( !errors.isEmpty() ) {
      res.json({ errors: errors.array() });
      return;
    }
    else {
      Category.findByIdAndUpdate( req.params.categoryId, category, {}, ( err, thecategory ) => {
        if( err ) { return next( err ); }
  
        res.json({
          message: 'Category Updated',
          thecategory
        });
      })
    }
  }
];