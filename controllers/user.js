import { Router } from 'express';
import { models } from '../models';
 
const router = Router()

router.post('/admins', async (req, res) => {
    try {
        const schema = {
            email: Joi.string().email().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            phoneNumber: Joi.number().optional(),
            password: Joi.string().required()
             
        }
        const {error, value } = Joi.validate(req.body, schema)
        if(error){
            return res.status(400).json({message: error.details[0].message})
        }
        const admin =  await models.User.create({...value, role: 'admin'})
        return res.status(200).json(admin) 
    } catch (error) {
        return res.status(404).json({message: error.message})
    }
})

router.get('/admins', async (req, res) => {
    try {
        const {page, limit} = req.query;
        const options = {
            where: {role: 'admin'},
            page,
            paginate: limit
        }
        const { docs, pages, total } = await models.User.paginate(options)
        const results = docs;
        return res.status(200).json({results, pages, total})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

router.get('/admins/:id', async (req, res) =>{
    try {
        const {id} = req.params;
        const admin = await models.User.getByPk(id)
        return res.status(200).json(admin)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

router.put('/admins/:id', async (req, res) => {
    try {
        const schema = {
            email: Joi.string().email().optional(),
            firstName: Joi.string().optional(),
            lastName: Joi.string().optional(),
            phoneNumber: Joi.number().optional(), 
            isEnabled: Joi.boolean().optional(),
            isVerified: Joi.boolean().optional()
             
        }
        const { error, value } = Joi.validate(req.body, schema)
        if (error){
            return res.status(400).json({message: error.details[0].message})
        }
        const [rowId, [admin]] =  await models.User.update(value, {returning: true, where: {id: req.params.id}})
        res.status(200).json(admin)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

router.delete('/admins/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const admin = await models.User.getByPk(id)
        admin.destroy({force: true})
        res.status(410).end()
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})


router.post('/login', async (req, res) => {
    try {
        const schema = {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
        const {error, value} = Joi.validate(req.body, schema)
        if (error){
            return res.status(400).json({message: error.details[0].message})
        }
        const {email, password} = value;
        const user = await models.User.findOne({where:{email}})
        if (!user){
            return res.status(400).json({message: "User not found!"})
        }
        if (!user.isEnabled){
            return res.status(403).json({message: 'User is not enabled to login.'})
        }
        if(!user.isVerified){
            return res.status(401).json({message: "User must be verified to login."})
        }
        if (!user.validPassword(password)){
            return res.status(400).json({message: 'Incorrect password'})
        }
        const token = jwt.sign(user.id, process.env.SECRET_KEY)
        return res.status(200).json({user, token})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

router.post('/users/change_password', async (req, res) => {
    try {
        const schema = {
            password: Joi.string().regex(/^[a-zA-Z0-9]{8,}$/).min(8).required(),
            email: Joi.string().required()
        }
        const { error, value } = Joi.validate(req.body, schema)
        if (error){
            return res.status(400).json({message: error.details[0].message})
        }
        const {password, email} = value;
        const [rowId, [user]] = await models.User.update({password, isVerified: true}, {returning: true, where: {email}, individualHooks: true})
        if (!user){
            return res.status(404).json({message: "User not found."})
        }
        res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({message: error.message})

    }
})

export default router;