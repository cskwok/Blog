import { useContext, useEffect } from "react";
import { PostsContext } from "../contexts/PostsContext.js";
import Posts from "./Posts.js";

function DBHome() {
    const { posts, getPosts, postsLoading, setPostsLoading } = useContext(PostsContext);

    useEffect(() => {
        setPostsLoading(true);
        async function getData() {
            await getPosts();
            setPostsLoading(false);
        }
        getData();
    }, []);

    return <div className="dashboard-home">
        <div className="summary">
            <h2>Summary</h2>
            <div className="card">
                <p>Posts Count: {posts.length}</p>  
            </div>
        </div>
        <div className="recent">
            <h3>Recently created posts</h3>
            <div className="recent-action">New Post | See All</div>
            <Posts data={posts} dashboard={true}/>
            
        </div>



    </div>;
}

export default DBHome;
