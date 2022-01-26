export default (res, status, data=null, msg="", args) => {
    let response = {        
        data: data,
        msg: msg
    }    
    response = {...response, ...args};
    res.status(status).json(response);
}