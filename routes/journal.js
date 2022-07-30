const express = require( 'express' );
const router = express.Router();

const postController = require( '../controllers/postController' );
const commentController = require( '../controllers/commentController' );
const categoryController = require( '../controllers/categoryController' );

router.get( '/posts', postController.postPublic );

router.get( '/categories', categoryController.categoryList );

router.get( '/categories/:categoryId', categoryController.categoryDetail );

router.get( '/posts/:postId', postController.postDetail );

router.get( '/posts/:postId/comments', commentController.commentList );

router.post( '/posts/:postId', commentController.commentCreate );

module.exports = router;