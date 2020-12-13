import React from 'react';

// material-ui
import { Grid, CircularProgress } from '@material-ui/core';

// redux
import { useSelector } from 'react-redux';

// css
import useStyles from './styles';

// container
import { Post } from './Post/Post'

export const Posts = ({ setCurrentId }) => {

    const posts = useSelector((state) => state.posts);

    // css
    const classes = useStyles();

    console.log(posts);

    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {
                    posts.map(post => (
                        <Grid key={post._id} item xs={12} sm={6}>
                            <Post post={post} setCurrentId={setCurrentId}/>
                        </Grid>
                    ))
                }
            </Grid>
        )
    )
}
