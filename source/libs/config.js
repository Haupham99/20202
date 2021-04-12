const fs = require('fs');
const yaml = require('js-yaml');

try {
    let fileContents = "";
    fileContents = fs.readFileSync('source/config/config.yaml', 'utf8');
        
    var cfg = yaml.load(fileContents);

    console.log("Read config.yaml");

    module.exports.version = cfg.version;
    module.exports.account = cfg.account;
    module.exports.authen = cfg.authen;
    module.exports.app = cfg.app;
    module.exports.url = cfg.url;
} catch (e) {
    console.log(e);
}