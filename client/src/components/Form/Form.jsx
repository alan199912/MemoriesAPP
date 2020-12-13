import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux'

// actions
import { createPost, updatePost } from '../../redux/actions/posts.action.js'

// css
import useStyles from './styles';

export const Form = ({ currentId, setCurrentId }) => {

    // to create post
    const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });

    // to update post
    const post = useSelector((state) => currentId ? state.posts.find( (p) => p._id === currentId) : null);

    // styles
    const classes = useStyles();
    
    // redux
    const dispatch = useDispatch();

    useEffect( () => {
        if(post) setPostData(post);
    }, [post]);

    // button send
    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updatePost(currentId, postData));
        } else {
            dispatch(createPost(postData));
        }
        clear();
    }

    // button clear
    const clear = () => {
        setCurrentId(null);
        setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6" >
                    { currentId ? 'Editing' : 'Creating' } a Memory
                </Typography>
                <TextField name="creator" variant="outlined" label="Creator" fullWidth  value={postData.creator} onChange={ (e) => setPostData({ ...postData, creator: e.target.value })}/>
                <TextField name="title" variant="outlined" label="Title" fullWidth  value={postData.title} onChange={ (e) => setPostData({ ...postData, title: e.target.value })}/>
                <TextField name="message" variant="outlined" label="Message" fullWidth  value={postData.message} onChange={ (e) => setPostData({ ...postData, message: e.target.value })}/>
                <TextField name="tags" variant="outlined" label="Tags" fullWidth  value={postData.tags} onChange={ (e) => setPostData({ ...postData, tags: e.target.value.split(',') })}/>
                <div className={classes.fileInput}> <FileBase type="file" multiple={false} onDone={ ({ base64 }) => setPostData({ ...postData, selectedFile: base64 }) }/></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}
