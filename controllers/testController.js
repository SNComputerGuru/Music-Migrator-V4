module.exports.testing = (req, res)=>{
    console.log("Hi There!!!");
    res.status(201).json({
        message: "This is working"
    })
}