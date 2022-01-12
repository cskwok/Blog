import Users from '../services/users.service.js';
import response from '../helper/response.js';

async function getUsers(req, res) {
    try {
        const users = await Users.getUsers();
        if(users != null) {           
            response(res, 200, Users.resUsers(users), "Get users sucessfully");
        } else {
            response(res, 200, null, "No user found");            
        }
    } catch (error) {        
        response(res, 400, null, error.message);
    }
}

async function getUserByUserID(req, res) {
    try {
        const users = await Users.getUserByUserID(req.params.userid);
        if(users != null) {
            response(res, 200, Users.resUsers(users), "Get user sucessfully");            
        } else {
            response(res, 200, null, "No user found");            
        }
    } catch (error) {
        response(res, 400, null, "error.message");
    }
}

async function createUser(req, res) {
    const info = req.body;
    try {
        const users = await Users.createUser({userName: info.userName, password: info.password, nickName: info.nickName});  
        response(res, 200, null, "Add user sucessfully");        
    } catch (error) {
        response(res, 400, null, error.message);       
    }
}

async function updateUser(req, res) {
    const userid = req.params.userid;
    const info = req.body;
    try {
        const users = await Users.updateUser({userid:userid, userName: info.userName, password: info.password, nickName: info.nickName});  
        response(res, 200, null, "Update user sucessfully");        
    } catch (error) {
        response(res, 400, null, error.message);       
    }
}

async function deleteUser(req, res) {
    const userid = req.params.userid;    
    try {
        const users = await Users.deleteUser(userid);  
        response(res, 200, null, "Delete user sucessfully");        
    } catch (error) {
        response(res, 400, null, error.message);       
    }
}

export default {
    getUsers,    
    getUserByUserID,
    createUser,
    updateUser,
    deleteUser
}