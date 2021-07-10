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
 * @return {object} - The object which contains everything.
 */
function autoload(dir, {obj = { }, filter = /\.js$|\.json$/, recursive = true, namespacing = true} = {}) {
    // Loop through all files in the directory.
    for (fname of fs.readdirSync(dir)) {
        let path = `${dir}/${fname}`;
        if (recursive && fs.lstatSync(path).isDirectory()) {
            // Determain object for namespacing.
            let o = obj;
            if (namespacing) {
                obj[fname] = {};
                o = obj[fname];
            }
            // Autoload object.
            autoload(path, {
                obj: o,
                filter: filter,
                namespacing: namespacing
            });
        }
        else if (filter.test(fname)) {
            // Autoload file if it matches filter and all import.
            const req = require(path);
            if (typeof(req) === 'object' && req !== null && !Array.isArray(req)) {
                Object.assign(obj, req);
            }
            else {
                let name = (typeof(req) === 'function' && req.name) ? req.name : file.substr(0, file.indexOf('.'));
                obj[name] = req;
            }
        }
    }
    return obj;
}
module.exports = autoload;