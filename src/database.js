const mongoose = require('mongoose');

//mongo db on azure
//mongodb+srv://fventura:tictac789@cluster1-jbm6b.azure.mongodb.net/test?retryWrites=true&w=majority

mongoose.connect('mongodb://localhost/ventas-db-cloud', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(db => console.log('DB is connected'))
.catch(err => console.log(err));

//Ahora se debe ir a server src/index a decirle que requiere este archivo
//en Initialization

