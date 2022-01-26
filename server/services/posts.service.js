import sql from "../helper/dbconnect.js"

const baseSelectQuery = "SELECT Postid, Title, Content, PreviewContent, users.NickName as Author, DATE_FORMAT(CreateTime, '%d %b %Y') as CreateTime FROM posts LEFT JOIN users on posts.Userid=users.Userid";

async function getPosts() {
    try {
        const [rows, fields] = await sql.query(baseSelectQuery);
        if (rows.length > 0) {
            return rows;
        }
        return null;
    } catch (error) {
        throw Error("Error when getting posts");
    }
}

async function getPostByPostID(postid) {
    try {
        const [rows, fields] = await sql.query(baseSelectQuery + " WHERE Postid=?", postid);
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    } catch (error) {
        throw Error("Error when getting post");
    }
}

async function getPostsByUserID(userid) {
    try {
        const [rows, fields] = await sql.query(baseSelectQuery + " WHERE users.Userid=?", userid);
        if (rows.length > 0) {
            return rows;
        }
        return null;
    } catch (error) {
        throw Error("Error when getting post");
    }
}

async function createPost(info) {   
    try {     
        const [rows, fields] = await sql.query("INSERT INTO posts(Userid, Title, Content, PreviewContent, CreateTime) VALUES(?, ?, ?, ?, NOW())", [info.userid, info.title, info.content, info.previewContent]);
    } catch (error) {
        throw Error("Error when adding post");
    }
}

export default {
    getPosts,
    getPostByPostID,
    getPostsByUserID,
    createPost
}