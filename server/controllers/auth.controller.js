import Users from '../services/users.service.js';
import Response from '../helper/response.js';
import Auth from '../helper/auth.js';
import bcrypt from 'bcrypt';

async function login(req, res) {
    try {
        const info = req.body;
        const user = await Users.getUserByUserName(info.userName);
        if(user != null) {
            let checkPwd = await bcrypt.compare(info.password, user.Password);
            if(checkPwd) {
                res.cookie("t", Auth.signToken(Users.resUsers(user)), {httpOnly: true, maxAge: 3600000, SameSite: 'Strict'});
                Response(res, 200, {userid: user.Userid, nickName: user.NickName}, "Login successfully");
            } else {
                Response(res, 200, null, "Some inputs are incorrect");
            }                      
        } else {
            Response(res, 200, null, "Some inputs are incorrect");            
        }
    } catch (error) {
        Response(res, 400, null, error.message);
    }
}

async function logout(req, res) {
    try {
        res.clearCookie("t", {httpOnly: true, SameSite: 'Strict'});
        Response(res, 200, null, "Logout successfully");
    } catch (error) {
        Response(res, 400, null, "Logout failed");
    }
}

export default {
    login,
    logout
};