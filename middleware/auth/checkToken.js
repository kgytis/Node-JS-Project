import jwt from 'jsonwebtoken';

const checkToken = async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(403).send('You are not logged in or you have been logged out, please log in again.'); // Redirect could be added
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

export default checkToken