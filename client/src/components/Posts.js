import { useEffect, useReducer, useState } from "react";
import axios from "axios";

import Post from "./Post.js";
import config from "../config/config.js";

const posts = [];

const postsAction = {
  ADD: "add"
}

function postsReducer(state, action) {
  switch (action.type) {
    case postsAction.ADD:
      let data = action.payload;
      if (Array.isArray(data)) {
        return [...state, ...data];
      } else {
        return [...state, data];
      }
    default:
      return state;
  }
}

function Posts() {
  const [state, dispatch] = useReducer(postsReducer, posts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function getData() {
      const res = await axios.get(config.api("/posts"));
      if (res.status === 200 && res.data.data) {
        //console.log(res.data.data);
        dispatch({ type: postsAction.ADD, payload: res.data.data });
      }
      setLoading(false);
    }
    getData();
  }, []);

  return (
    <div className="posts">
      {
        loading ? "" :
          state.length === 0 ? "There is no post yet.":
          state.map((p)=>(
            <Post key={p.Postid} data={p} dispatch={dispatch} />
          ))
      }
    </div>
  );
}

export default Posts;
