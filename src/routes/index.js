const express = require('express');
const router = express.Router();
const Usuario = require('../model/Usuarios');
const Libro = require('../model/Liblos');

router.get('/principal', async(req, res) => {
    const usuarios = await Usuario.find().sort({ nombre: 'desc' });
    const libros = await Libro.find().sort({ nombreLibro: 'desc' });
    res.render('principal/principal', { libros, usuarios });
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
        guardado.push({ text: 'Datos de usuario guardados' });
        const usuarioNuevo = new Usuario({ tipo, nombre, apellido, telefono, numerocontrol, escuelaProcedencia, calle, numExt, colonia, cp });
        console.log(usuarioNuevo);
        await usuarioNuevo.save();
        const usuarios = await Usuario.find().sort({ nombre: 'desc' });
        const libros = await Libro.find().sort({ nombreLibro: 'desc' });
        res.render('principal/principal', {
            usuarios,
            libros,
            guardado,
        });
    };
});

router.delete('/usuarios/eliminar/:id', async(req, res) => {
    await Usuario.findByIdAndDelete(req.params.id);
    res.redirect('/principal');
});

router.put('/usuarios/editar/:id', async(req, res) => {
    const { nombreLibro, autor, editorialLibro, tipoLibro, numeroPaginas } = req.body;
    await Libro.findByIdAndUpdate(req.params.id, { nombreLibro, autor, editorialLibro, tipoLibro, numeroPaginas });
    res.redirect('/principal');
});


router.delete('/libros/eliminar/:id', async(req, res) => {
    await Libro.findByIdAndDelete(req.params.id);
    res.redirect('/principal');
});

router.put('/libros/editar-libro/:id', async(req, res) => {
    const { nombreLibro, autor, editorialLibro, tipoLibro, numeroPaginas } = req.body;
    await Libro.findByIdAndUpdate(req.params.id, { nombreLibro, autor, editorialLibro, tipoLibro, numeroPaginas });
    res.redirect('/principal');
});
router.get('/libros/editar/:id', async(req, res) => {
    const librosmod = await Libro.findById(req.params.id);
    res.render('principal/editarLibros', { librosmod });
});

router.post('/libro/buscarlibro', async(req, res) => {
    console.log(req.body);
    const { nombreLibroBuscar, autorBuscar, tipoLibroBuscar, editorialLibroBuscar } = req.body;
    if (nombreLibroBuscar) {
        const libros = await Libro.find().sort({ nombreLibro: 'desc' }).where('nombreLibro').equals(nombreLibroBuscar);
        res.render('principal/principal', {
            libros
        });
    }
    if (autorBuscar) {
        const libros = await Libro.find().sort({ autor: 'desc' }).where('autor').equals(autorBuscar);
        res.render('principal/principal', {
            libros
        });
    }
    if (editorialLibroBuscar) {
        const libros = await Libro.find().sort({ editorialLibro: 'desc' }).where('editorialLibro').equals(editorialLibroBuscar);
        res.render('principal/principal', {
            libros
        });
    }
    if (tipoLibroBuscar) {
        const libros = await Libro.find().sort({ tipoLibro: 'desc' }).where('tipoLibro').equals(tipoLibroBuscar);
        res.render('principal/principal', {
            libros
        });
    } else {
        const libros = await Libro.find().sort({ autor: 'desc' });
        res.render('principal/principal', {
            libros
        });

    }

});




router.post('/libro/nuevouslibro', async(req, res) => {
    console.log(req.body);
    const { nombreLibro, autor, editorialLibro, tipoLibro, numeroPaginas } = req.body;
    const errorsLib = [];
    const guardadoLib = [];
    if (!nombreLibro) {
        errorsLib.push({ text: 'El campo Nombre no puede estar vacio' });
    }
    if (!autor) {
        errorsLib.push({ text: 'El campo autor no puede estar vacio' });
    }
    if (!editorialLibro) {
        errorsLib.push({ text: 'El campo Nombre no puede estar vacio' });
    }
    if (!tipoLibro) {
        errorsLib.push({ text: 'El campo Numero de Control no puede estar vacio' });
    }
    if (!numeroPaginas) {
        errorsLib.push({ text: 'El campo Escuela de Procedencia no puede estar vacio' });
    }
    if (errorsLib.length > 0) {
        res.render('principal/principal', {
            errorsLib,
        });
    } else {
        guardadoLib.push({ text: 'Datos del libro guardados' });
        const libroNuevo = new Libro({ nombreLibro, autor, editorialLibro, tipoLibro, numeroPaginas });
        console.log(libroNuevo);
        await libroNuevo.save();
        const usuarios = await Usuario.find().sort({ nombre: 'desc' });
        const libros = await Libro.find().sort({ nombreLibro: 'desc' });
        res.render('principal/principal', {
            libros,
            usuarios,
            guardadoLib,
        });
    };
});



router.get('/', (req, res) => {
    res.render('vista/index');

});




module.exports = router;