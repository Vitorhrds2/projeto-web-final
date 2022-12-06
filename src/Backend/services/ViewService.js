const ejs = require('ejs');

class ViewService {
    static basePath = __dirname + '/../Frontend/';

    static render(path, params) {
        return ejs.render(this.basePath + path, params);
    }
}

module.exports = ViewService;