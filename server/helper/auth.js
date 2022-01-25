import jwt from 'jsonwebtoken';

import Response from './response.js';

function signToken(user) {
    if (user != null) {
        let token = jwt.sign({ data: user, exp: Math.floor(Date.now() / 1000) + (60 * 60) }, process.env.ACCESS_TOKEN_SECRET);
        return token;
    }
}

function verifyToken(token) {
    try {
        let payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        return payload;
    } catch (error) {
        throw Error("Error when verifying token");
    }
}

function auth(req, res, next = null) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        let check = false;
        if (token) {
            let userid = req.params.userid;
            if (!userid) {
                const info = req.body;               
                if (info && ('userid' in info)) {
                    userid = info.userid;
                } else {
                    userid = null;
                }
            }           
            let payload = verifyToken(token);  
            if (userid) {
                if (userid == payload.data.userid) {                    
                    check = true;
                }
            }
        }
        if (check) {            
            if (next !== null) {
                next();                
            } else {               
                Response(res, 200, null, "auth successfully");
            }
        } else {
            Response(res, 401, null, "auth failed");
        }
    } catch (error) {
        Response(res, 401, null, "auth failed" + error);
    }
}

export default {
    signToken,
    verifyToken,
    auth
};