const fs = require('fs');
/**
 * @typedef {object} AutoloadOptions
 * @property {object} obj - The object to autoload into.
 * @property {RegExp} filter - Filter used against file names.
 * @property {boolean} recursive - Whether to autoload subdirectories.
 * @property {boolean} namespacing - Whether to create sub objects for sub directories.
 */
/**
 * Autoloads a directory into an object by calling require on
 * all files which matches the filter.
 * 
 * @param {fs.PathLike} dir 
 * @param {AutoloadOptions} options
 */
function autoload(dir, {obj = module.exports, filter = /\.js$|\.json$/, recursive = true, namespacing = true} = {}) {
    // Loop through all files in the directory.
    for (file of fs.readdirSync(dir)) {
        let path = `${dir}/${file}`;
        if (recursive && fs.lstatSync(file).isDirectory()) {
            // Determain object for namespacing.
            let o = obj;
            if (namespacing) {
                obj[file] = {};
                o = obj[file];
            }
            // Autoload object.
            autoload(path, {
                obj: o,
                filter: filter
            });
        }
        else if (filter.test(file)) {
            // Autoload file if it matches filter
            let req = require(path);
            if (typeof(req) === 'object') {
                Object.assign(obj, req);
            }
            else if (typeof(req) === 'function') {
                obj[req.name] = req;
            }
            else {
                obj[file.substr(0, file.indexOf('.'))] = req;
            }
        }
    }
}
module.exports = autoload();