export const auth = (req, res, next) => {
    if (req.session.userEmail) {
        next();
    } else {
        return res.render('login');
    }
};