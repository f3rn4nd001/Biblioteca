const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/juanmaBibi', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(db => console.log('base de mongo esta conectada'))
    .catch(err => console.error(err));