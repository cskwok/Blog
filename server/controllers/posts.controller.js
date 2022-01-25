import Posts from '../services/posts.service.js';
import Response from '../helper/response.js';

async function getPosts(req, res) {
    try {
        const posts = await Posts.getPosts();
        if(posts != null) {           
            Response(res, 200, posts, "Get posts sucessfully");
        } else {
            Response(res, 200, null, "No post found");            
        }
    } catch (error) {        
        Response(res, 400, null, error.message);
    }
}

async function getPostByPostID(req, res) {
    try {
        const post = await Posts.getPostByPostID(req.params.postid);
        if(post != null) {           
            Response(res, 200, post, "Get post sucessfully");
        } else {
            Response(res, 200, null, "No post found");            
        }
    } catch (error) {        
        Response(res, 400, null, error.message);
    }
}

async function getPostsByUserID(req, res) {
    try {
        const post = await Posts.getPostsByUserID(req.params.userid);
        if(post != null) {           
            Response(res, 200, post, "Get posts sucessfully");
        } else {
            Response(res, 200, null, "No post found");            
        }
    } catch (error) {        
        Response(res, 400, null, error.message);
    }
}

async function createPost(req, res) {
    const info = req.body;
    try {
        const post = await Posts.createPost({userid: info.userid, title: info.title, content: info.content});  
        Response(res, 200, null, "Add post sucessfully");        
    } catch (error) {
        Response(res, 400, null, error.message);       
    }
}

export default {
    getPosts,
    getPostByPostID,
    getPostsByUserID,
    createPost
}