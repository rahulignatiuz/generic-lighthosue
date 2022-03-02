const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/generic_lighthouse', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, (err) => {

    if(!err) {console.log('Successed')}
    else{console.log('Error: '+err)}

});
 require('../models/organizationModel');
 require('../models/userModel');
 require('../models/customFormLessonFieldModel');
 require('../models/autocompleteModel');
 require('../models/lessonModel');
 require('../models/customFormLessonDataModel');
