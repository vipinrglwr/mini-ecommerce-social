import React, { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
  IconButton,
  Divider,
  CircularProgress,
  Alert,
  Chip,
  Tooltip,
} from '@mui/material'
import {
  Send as SendIcon,
  ThumbUp as ThumbUpIcon,
  Reply as ReplyIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const CommentsSection = ({ productId }) => {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Mock comments data - in real app, this would come from API
  const mockComments = [
    {
      _id: '1',
      text: 'This product looks amazing! The quality is outstanding.',
      user: {
        _id: 'user1',
        username: 'john_doe',
        profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
      },
      likes: ['user2', 'user3'],
      likesCount: 2,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      replies: [
        {
          _id: '1-1',
          text: 'I totally agree! Best purchase I\'ve made this year.',
          user: {
            _id: 'user2',
            username: 'jane_smith',
            profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
          },
          likes: ['user1'],
          likesCount: 1,
          createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        }
      ]
    },
    {
      _id: '2',
      text: 'Great value for money. Highly recommended!',
      user: {
        _id: 'user3',
        username: 'mike_wilson',
        profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
      },
      likes: ['user1', 'user2', 'user4'],
      likesCount: 3,
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      replies: []
    },
    {
      _id: '3',
      text: 'The shipping was super fast and the packaging was perfect.',
      user: {
        _id: 'user4',
        username: 'sarah_jones',
        profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
      },
      likes: [],
      likesCount: 0,
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      replies: []
    }
  ]

  useEffect(() => {
    // Simulate loading comments
    setLoading(true)
    setTimeout(() => {
      setComments(mockComments)
      setLoading(false)
    }, 1000)
  }, [productId])

  const handleSubmitComment = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add comments')
      return
    }

    if (!newComment.trim()) {
      toast.error('Please enter a comment')
      return
    }

    setSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      const comment = {
        _id: Date.now().toString(),
        text: newComment,
        user: {
          _id: user.id,
          username: user.username,
          profilePicture: user.profilePicture || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
        },
        likes: [],
        likesCount: 0,
        createdAt: new Date(),
        replies: []
      }
      
      setComments([comment, ...comments])
      setNewComment('')
      setSubmitting(false)
      toast.success('Comment added!')
    }, 1000)
  }

  const handleLikeComment = (commentId) => {
    if (!isAuthenticated) {
      toast.error('Please login to like comments')
      return
    }

    setComments(comments.map(comment => {
      if (comment._id === commentId) {
        const isLiked = comment.likes.includes(user.id)
        return {
          ...comment,
          likes: isLiked 
            ? comment.likes.filter(id => id !== user.id)
            : [...comment.likes, user.id],
          likesCount: isLiked ? comment.likesCount - 1 : comment.likesCount + 1
        }
      }
      return comment
    }))
  }

  const formatTimeAgo = (date) => {
    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)
    
    if (diffInSeconds < 60) return 'Just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    return `${Math.floor(diffInSeconds / 86400)}d ago`
  }

  const isCommentLiked = (comment) => {
    return comment.likes.includes(user?.id)
  }

  if (loading) {
    return (
      <Card sx={{ mt: 4 }}>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <CircularProgress />
          <Typography variant="body2" sx={{ mt: 2 }}>
            Loading comments...
          </Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Comments ({comments.length})
        </Typography>

        {/* Add comment form */}
        {isAuthenticated ? (
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Avatar
                src={user.profilePicture}
                sx={{ width: 40, height: 40 }}
              />
              <TextField
                fullWidth
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                multiline
                maxRows={3}
                variant="outlined"
                size="small"
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                startIcon={<SendIcon />}
                onClick={handleSubmitComment}
                disabled={submitting || !newComment.trim()}
                size="small"
              >
                {submitting ? 'Posting...' : 'Post Comment'}
              </Button>
            </Box>
          </Box>
        ) : (
          <Alert severity="info" sx={{ mb: 3 }}>
            Please login to add comments
          </Alert>
        )}

        <Divider sx={{ mb: 3 }} />

        {/* Comments list */}
        {comments.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body2" color="text.secondary">
              No comments yet. Be the first to comment!
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {comments.map((comment, index) => (
              <motion.div
                key={comment._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Avatar
                    src={comment.user.profilePicture}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {comment.user.username}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatTimeAgo(comment.createdAt)}
                      </Typography>
                    </Box>
                    
                    <Typography variant="body2" sx={{ mb: 1, lineHeight: 1.5 }}>
                      {comment.text}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Tooltip title={isCommentLiked(comment) ? 'Unlike' : 'Like'}>
                        <IconButton
                          size="small"
                          onClick={() => handleLikeComment(comment._id)}
                          sx={{
                            color: isCommentLiked(comment) ? 'primary.main' : 'text.secondary',
                          }}
                        >
                          <ThumbUpIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Typography variant="caption" color="text.secondary">
                        {comment.likesCount}
                      </Typography>
                      
                      <Tooltip title="Reply">
                        <IconButton size="small" sx={{ color: 'text.secondary' }}>
                          <ReplyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <Box sx={{ ml: 4, mt: 2 }}>
                        {comment.replies.map((reply) => (
                          <Box key={reply._id} sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            <Avatar
                              src={reply.user.profilePicture}
                              sx={{ width: 32, height: 32 }}
                            />
                            <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                <Typography variant="subtitle2" fontWeight="bold">
                                  {reply.user.username}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {formatTimeAgo(reply.createdAt)}
                                </Typography>
                              </Box>
                              
                              <Typography variant="body2" sx={{ mb: 1, lineHeight: 1.5 }}>
                                {reply.text}
                              </Typography>

                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Tooltip title={isCommentLiked(reply) ? 'Unlike' : 'Like'}>
                                  <IconButton
                                    size="small"
                                    onClick={() => handleLikeComment(reply._id)}
                                    sx={{
                                      color: isCommentLiked(reply) ? 'primary.main' : 'text.secondary',
                                    }}
                                  >
                                    <ThumbUpIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Typography variant="caption" color="text.secondary">
                                  {reply.likesCount}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Box>
                </Box>
                
                {index < comments.length - 1 && <Divider sx={{ mt: 2 }} />}
              </motion.div>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default CommentsSection
