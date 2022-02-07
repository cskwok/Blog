import { useState, useReducer, createContext } from "react";
import axios from "axios";

import config from "../config/config.js";

export const PostsContext = createContext();

const postsState = [];

const postsAction = {
    GET: "get",
    ADD: "add",
}

function postsReducer(state, action) {
    let data = action.payload;

    switch (action.type) {
        case postsAction.GET:            
            return data;
        case postsAction.ADD:            
            if (Array.isArray(data)) {
                return [...state, ...data];
            } else {
                return [...state, data];
            }
        default:
            return state;
    }
}

export function PostsProvider({ children }) {
    const [posts, dispatch] = useReducer(postsReducer, postsState);
    const [postsLoading, setPostsLoading] = useState(true);

    async function getPosts() {
        const res = await axios.get(config.api("/posts"));
        if (res.status === 200 && res.data.data) {
            dispatch({ type: postsAction.GET, payload: res.data.data });
        }
        setPostsLoading(false);
    }

    return <PostsContext.Provider value={{
        posts,
        postsLoading,
        setPostsLoading,
        getPosts
    }}>
        {children}
    </PostsContext.Provider>
}