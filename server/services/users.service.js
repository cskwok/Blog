import sql from "../helper/dbconnect.js"
import bcrypt from 'bcrypt';

function resUsers(users) {
    if (Array.isArray(users)) {
        let newUsers = [];
        users.forEach(user=>{
            newUsers = [...newUsers, { userid: user.Userid, nickName: user.NickName }];
        });        
        return newUsers;
    }
    return { userid: users.Userid, nickName: users.NickName };
}

async function getUsers() {
    try {
        const [rows, fields] = await sql.query("SELECT * FROM users");
        if (rows.length > 0) {
            return rows;
        }
        return null;
    } catch (error) {
        throw Error("Error when getting users");
    }
}

async function getUserByUserID(userid) {
    try {
        const [rows, fields] = await sql.query("SELECT * FROM users WHERE Userid=?", userid);
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    } catch (error) {
        throw Error("Error when getting user");
    }
}

async function getUserByUserName(userName) {
    try {
        const [rows, fields] = await sql.query("SELECT * FROM users WHERE UserName=?", userName);
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    } catch (error) {
        throw Error("Error when getting user");
    }
}

async function createUser(info) {
    const checkUser = await getUserByUserName(info.userName);
    if (checkUser !== null) {
        throw Error("User already exist");
    }
    try {
        let hash = await bcrypt.hash(info.password, process.env.SALT);
        const [rows, fields] = await sql.query("INSERT INTO users(UserName, Password, NickName) VALUES(?, ?, ?)", [info.userName, hash, info.nickName]);
    } catch (error) {
        throw Error("Error when adding user");
    }
}

async function updateUser(info) {
    const checkUser = await getUserByUserID(info.userid);
    if (checkUser == null) {
        throw Error("User does not exist");
    }
    try {
        let sqlQuery = "UPDATE users SET";
        let sqlValues = [];
        let infoEntries = Object.entries(info);
        for (let i = 1; i < infoEntries.length; i++) {
            if (infoEntries[i][1] !== undefined) {
                sqlQuery += ` ${infoEntries[i][0]}=?`;
                if(infoEntries[i][0] == "password") {
                    let hash = await bcrypt.hash(infoEntries[i][1], process.env.SALT);
                    sqlValues = [...sqlValues, hash];
                } else {
                    sqlValues = [...sqlValues, infoEntries[i][1]];
                }                
                sqlQuery += ',';
            }
        }
        sqlQuery = sqlQuery.slice(0, sqlQuery.length - 1);
        sqlQuery += ' WHERE Userid=?';
        sqlValues = [...sqlValues, info.userid];
        const [rows, fields] = await sql.query(sqlQuery, sqlValues);
    } catch (error) {       
        throw Error("Error when updating user");
    }
}

async function deleteUser(userid) {
    const checkUser = await getUserByUserID(userid);
    if (checkUser == null) {
        throw Error("User does not exist");
    }
    try {
        const [rows, fields] = await sql.query("DELETE FROM users WHERE Userid=?", userid);
    } catch (error) {
        throw Error("Error when deleting user");
    }
}


export default {
    resUsers,
    getUsers,
    getUserByUserID,
    getUserByUserName,
    createUser,
    updateUser,
    deleteUser
}