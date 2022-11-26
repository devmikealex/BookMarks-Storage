const clc = require('cli-color');

/**
 * Поиск в базе данных методом find
 * @param {request} req 
 * @param {response} res 
 * @param {model} BD указатель на базу данных
 * @returns {Array.<Object>} Массив найденых объектов из БД
 */
async function findTagsByFilters(req, res, BD) {
    let message, colorMessage;
    try {
        console.log(clc.cyan('----FUNC: findTagsByFilters'));
        console.log('----BODY:\r\n', req.body);
        console.log();

        let filter = req.body;

        if (req.params.id) {
            console.log('----ID detected:', req.params.id);
            filter = { _id: req.params.id };
        }
        // filter = { 'title' : { '$regex' : 'Ph', '$options' : 'i' } }
        console.log("filter:", filter);
        const tags = await BD.find(filter);
        console.log(JSON.stringify(tags, null, 2));
        console.log(`▓ find tags returned ${tags.length}:`);

        message = tags;
        colorMessage = clc.yellow('--- OK ---');
    } catch (err) {
        res.status(500);
        message = { message: err.message };
        colorMessage = clc.redBright('--- ERROR ---\r\n' + err.message);
    } finally {
        console.log(colorMessage);
        res.json(message);
    }
}

exports.findTagsByFilters = findTagsByFilters
