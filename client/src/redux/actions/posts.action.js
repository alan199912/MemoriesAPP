import * as api from '../../api/index.api.js';


// actionsTypes
import { FETCH_ALL, CREATE, UPDATE, LIKE, DELETE }  from '../../constants/actionType'


// Action creators
// two arrow function thanks to thunk with async
export const getPosts = () => async (dispatch) => {

    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error)
    }

}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        
        console.log(error)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id});
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {

    try {
        
        const { data } = await api.likePost(id);

        dispatch({ type: LIKE, payload: data });

    } catch (error) {
        console.log(error);
    }

}