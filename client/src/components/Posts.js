import { useContext, useEffect } from "react";

import Post from "./Post.js";

import { PostsContext } from "../contexts/PostsContext.js";

function Posts({ dashboard, data }) {
  const { posts, getPosts, postsLoading, setPostsLoading } = useContext(PostsContext);

  useEffect(() => {
    if (data) return;
    setPostsLoading(true);
    async function getData() {
      await getPosts();
      setPostsLoading(false);
    }
    getData();
  }, []);

  return (
    <div className={`posts ${dashboard && "card"}`}>
      {
        data ?
          data.map((p) => (
            <Post key={p.Postid} data={p} dashboard={dashboard}/>
          ))
          :
          postsLoading ?
            ""
            :
            posts.length === 0 ?
              "There is no post yet."
              :
              posts.map((p) => (
                <Post key={p.Postid} data={p} dashboard={dashboard}/>
              ))
      }
    </div>
  );
}

export default Posts;
