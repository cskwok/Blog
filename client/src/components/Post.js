import { useState } from "react";

function Post({ data, dashboard }) {
    const [isShort, setIsShort] = useState(data.PreviewContent !== null);

    function continueHandler() {
        setIsShort(false);
    }

    return (
        <>
            {
                dashboard ?
                    <div className="post">
                        <div>
                            <p className="title">{data.Title}</p>
                            <p className="info">Created by {data.Author} at {data.CreateTime}</p>
                        </div>

                        <span className="action">Edit | Delete</span>
                    </div>
                    :
                    <div className="post card">
                        <p className="title">{data.Title}</p>
                        <p className="info">Created by {data.Author} at {data.CreateTime}</p>
                        <p className="content">{isShort ? (data.PreviewContent + " ...") : data.Content}</p>
                        {isShort ? <p className="continue" onClick={continueHandler}>(Continue reading)</p> : ""}
                    </div>
            }
        </>

    );
}

export default Post;
