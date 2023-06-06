const jwt= require('jsonwebtoken')

const auth = (req ,next, res  ) =>{
    console.log(req.cookies);
        const {token} = req.cookies
        // Authorization
        // const token = req.header

        // What if token is not there.
        if (!token){
            return res.status(401).send("access denied")
        }

        // verify the token
        try {
           const decode= jwt.verify(token, 'shhhh')
           console.log(decode)
           req.user= decode

        //    extract id from token and query the database.
        } catch (error) {
         res.status(401).send("token is in valid");
        }
        return next()
  
}

module.exports = auth