const express = require('express');
const router = express.Router();
const Usuario = require('../model/Usuarios');

router.get('/principal', async(req, res) => {
    const usuarios = await Usuario.find().sort({ nombre: 'desc' });
    res.render('principal/principal', { usuarios });

});
router.post('/usuario/nuevousuario', async(req, res) => {
    console.log(req.body);
    const { tipo, nombre, apellido, numerocontrol, escuelaProcedencia, calle, telefono, numExt, colonia, cp } = req.body;
    const errors = [];
    const guardado = [];
    if (!nombre) {
        errors.push({ text: 'El campo Nombre no puede estar vacio' });
    }
    if (!apellido) {
        errors.push({ text: 'El campo Nombre no puede estar vacio' });
    }
    if (!telefono) {
        errors.push({ text: 'El campo Nombre no puede estar vacio' });
    }
    if (!numerocontrol) {
        errors.push({ text: 'El campo Numero de Control no puede estar vacio' });
    }
    if (!escuelaProcedencia) {
        errors.push({ text: 'El campo Escuela de Procedencia no puede estar vacio' });
    }
    if (!calle) {
        errors.push({ text: 'El campo Calle no puede estar vacio' });
    }
    if (!numExt) {
        errors.push({ text: 'El campo Numero Exterior no puede estar vacio' });
    }
    if (!colonia) {
        errors.push({ text: 'El campo Colonia no puede estar vacio' });
    }
    if (!cp) {
        errors.push({ text: 'El campo Codigo Postal no puede estar vacio' });
    }
    if (errors.length > 0) {
        res.render('principal/principal', {
            errors,
        });
    } else {
        guardado.push({ text: 'Datos guardados' });
        const usuarioNuevo = new Usuario({ tipo, nombre, apellido, telefono, numerocontrol, escuelaProcedencia, calle, numExt, colonia, cp });
        console.log(usuarioNuevo);
        await usuarioNuevo.save();
        const usuarios = await Usuario.find().sort({ nombre: 'desc' });

        res.render('principal/principal', {
            usuarios,
            guardado,
        });
    };
});
router.get('/', (req, res) => {
    res.render('vista/index');

});




module.exports = router;