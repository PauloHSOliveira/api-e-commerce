const mongoose = require('mongoose');
const yup = require('yup');

const User = mongoose.model('User');

module.exports = {
    async store(req,res) {
        const schema = yup.object().shape({
           firstname: yup.string().required(),
           lastname: yup.string().required(),
           username: yup.string().required(),
           email: yup.string()
            .email()
            .required(),
            password: yup.string().required()
        });
    
        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation failed' });
        }

        const usernameexists = await User.findOne({ username: req.body.username });
        const emailexists = await User.findOne({ email: req.body.email });

        if(await usernameexists || await emailexists) {
            return res.status(400).json({ error: 'username or e-mail already exists'});
        }

        const { id, username, email, password } = await User.create(req.body);

        return res.status(200).json({
            id,
            username,
            email,
            password
        });
    }
}