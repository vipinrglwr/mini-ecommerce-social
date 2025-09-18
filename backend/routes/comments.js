const express = require('express');
const Comment = require('../models/Comment');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/comments/:productId
// @desc    Get comments for a product
// @access  Public
router.get('/:productId', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const comments = await Comment.find({ 
      product: req.params.productId,
      parentComment: null 
    })
      .populate('user', 'username profilePicture')
      .populate({
        path: 'replies',
        populate: {
          path: 'user',
          select: 'username profilePicture'
        }
      })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Comment.countDocuments({ 
      product: req.params.productId,
      parentComment: null 
    });

    res.json({
      comments,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/comments/:productId
// @desc    Add comment to product
// @access  Private
router.post('/:productId', auth, async (req, res) => {
  try {
    const { text, parentCommentId } = req.body;
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const comment = new Comment({
      product: productId,
      user: req.userId,
      text,
      parentComment: parentCommentId || null
    });

    await comment.save();

    // Update product comments count
    product.commentsCount += 1;
    await product.save();

    // If it's a reply, add to parent comment's replies
    if (parentCommentId) {
      const parentComment = await Comment.findById(parentCommentId);
      if (parentComment) {
        parentComment.replies.push(comment._id);
        await parentComment.save();
      }
    }

    // Populate user data for response
    await comment.populate('user', 'username profilePicture');

    res.status(201).json(comment);
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/comments/:commentId/like
// @desc    Like/unlike a comment
// @access  Private
router.post('/:commentId/like', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const isLiked = comment.likes.includes(req.userId);

    if (isLiked) {
      comment.likes.pull(req.userId);
    } else {
      comment.likes.push(req.userId);
    }

    await comment.save();

    res.json({ 
      isLiked: !isLiked, 
      likesCount: comment.likes.length 
    });
  } catch (error) {
    console.error('Like comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/comments/:commentId
// @desc    Delete a comment
// @access  Private
router.delete('/:commentId', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user owns the comment
    if (comment.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    // Update product comments count
    const product = await Product.findById(comment.product);
    if (product) {
      product.commentsCount -= 1;
      await product.save();
    }

    // If it's a reply, remove from parent comment's replies
    if (comment.parentComment) {
      const parentComment = await Comment.findById(comment.parentComment);
      if (parentComment) {
        parentComment.replies.pull(comment._id);
        await parentComment.save();
      }
    }

    await Comment.findByIdAndDelete(req.params.commentId);

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
