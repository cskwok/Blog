export default (res, status, data=null, msg="", args) => {
    let response = {  
        status: status,      
        data: data,
        msg: msg
    }    
    response = {...response, ...args};
    res.status(200).json(response);
}