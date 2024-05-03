const Controller = require('./Controller/controller');
const Model = require('./Model/model');
const View = require('./View/view');

const model = new Model();
const view = new View();
const controller = new Controller(model, view);

view.chooseCategory(controller);
