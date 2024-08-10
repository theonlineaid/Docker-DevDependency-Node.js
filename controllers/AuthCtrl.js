import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js'; // Assuming you have a User model
import Post from '../models/PostModel.js'; // Assuming you have a Post model
import Comment from '../models/CommentModel.js'; // Assuming you have a Comment model

const authCtrl = {

    // User Registration
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = new User({ username, email, password: hashedPassword });
            await newUser.save();
            res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
        } catch (error) {
            res.status(500).json({ message: 'Registration failed', error });
        }
    },

    // User Login
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ message: 'User not found' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

            const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
            res.json({ token, userId: user._id });
        } catch (error) {
            res.status(500).json({ message: 'Login failed', error });
        }
    },

    // Create a Post
    createPost: async (req, res) => {
        try {
            const { userId, content, mediaUrl } = req.body;
            const newPost = new Post({ userId, content, mediaUrl });
            await newPost.save();
            res.status(201).json({ message: 'Post created successfully', postId: newPost._id });
        } catch (error) {
            res.status(500).json({ message: 'Failed to create post', error });
        }
    },

    // Comment on a Post
    addComment: async (req, res) => {
        try {
            const { postId } = req.params;
            const { userId, comment } = req.body;
            const newComment = new Comment({ postId, userId, comment });
            await newComment.save();
            res.status(201).json({ message: 'Comment added successfully', commentId: newComment._id });
        } catch (error) {
            res.status(500).json({ message: 'Failed to add comment', error });
        }
    },

    // Like a Post
    likePost: async (req, res) => {
        try {
            const { postId } = req.params;
            const { userId } = req.body;
            const post = await Post.findById(postId);
            if (!post) return res.status(404).json({ message: 'Post not found' });

            post.likes.push(userId);
            await post.save();
            res.json({ message: 'Post liked successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to like post', error });
        }
    },

    // Follow a User
    followUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const { followerId } = req.body;
            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ message: 'User not found' });

            user.followers.push(followerId);
            await user.save();
            res.json({ message: 'User followed successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to follow user', error });
        }
    },

    // Other Post Endpoints (30+)
    deletePost: async (req, res) => {
        try {
            const { postId } = req.params;
            const post = await Post.findByIdAndDelete(postId);
            if (!post) return res.status(404).json({ message: 'Post not found' });
            res.json({ message: 'Post deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete post', error });
        }
    },

    updatePost: async (req, res) => {
        try {
            const { postId } = req.params;
            const { content, mediaUrl } = req.body;
            const post = await Post.findById(postId);
            if (!post) return res.status(404).json({ message: 'Post not found' });

            post.content = content || post.content;
            post.mediaUrl = mediaUrl || post.mediaUrl;
            await post.save();
            res.json({ message: 'Post updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to update post', error });
        }
    },

    // ... Add more POST request handlers as needed

};

export default authCtrl;
