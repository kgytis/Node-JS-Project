import jwt from 'jsonwebtoken';

const authorization = async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return next(); // This part differs from checkToken. Needed separate middleware to render home page whether it is logged in or not
    } try {
        jwt.verify(token, process.env.JWTSECRET, (err, result) => {
            void (err && (res.status(403).send({ msg: 'Access denied' }))); // Ternary clause will not return else statement
            // if(err) return res.status(403).send({msg : 'Access denied'});
            req.userID = result.id;
            req.email = result.email;
            req.username = result.username;
            next();
        })
    } catch (err) {
        res.status(403).send({ msg: 'Access denied' });
    };
};

export default authorization