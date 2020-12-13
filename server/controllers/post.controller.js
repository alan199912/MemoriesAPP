import postMessage from '../models/post.models.js'
import mongoose from 'mongoose';

export const getPost = async (req, res, next) => {

    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    
    try {
        const postMessages = await postMessage.find();
        
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    next();
}

export const createPost = async (req, res, next) => {

    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    
    const post = req.body;
    
    const newPost = new postMessage(post);
    
    try {
        newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
    next();
}

export const updatePost = async (req, res, next) => {

    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    try {
        const { id: _id } = req.params;
        const post = req.body;

        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

        // new: true if actually received data
        const updatedPost = await postMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

        res.json(updatedPost);
    } catch (error) {
        res.json(409).json({ message: error.message });
    }
    
    next();
}

export const deletePost = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    try {
        const { id: _id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

        await postMessage.findByIdAndRemove(_id);

        res.json({ message: 'Post deleted successfully'});

    } catch (error) {
        res.json(404).json({ message: error.message});
    }

    next();
}   

export const likePost = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    try {
        const { id: _id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

        const post = await postMessage.findById(_id);
        const updatedPost = await postMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1 }, { new: true });
    
        res.json(updatedPost);
    } catch (error) {
        res.json(401).json({ message: error.message })
    }

    next();
}