import { useState } from "react";

function Post({ data, dispatch }) {
    const [isShort, setIsShort] = useState(data.PreviewContent !== null);

    function continueHandler() {
        setIsShort(false);
    }

    return (
        <div className="post card">
            <p className="title">{data.Title}</p>
            <p className="info">Created by {data.Author} at {data.CreateTime}</p>
            <p className="content">{isShort ? data.PreviewContent : data.Content}</p>
            {isShort ? <p className="continue" onClick={continueHandler}>(Continue reading)</p> : ""}
        </div>
    );
}

export default Post;
