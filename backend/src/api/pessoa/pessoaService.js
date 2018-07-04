const pessoa = require('./pessoa')
const errorHandler = require('../common/errorHandler')

pessoa.methods(['get', 'post', 'put', 'delete'])
pessoa.updateOptions({ new: true, runValidators: true})
pessoa.after('post', errorHandler).after('put', errorHandler)

pessoa.route('count', (req, res, next) => {
    pessoa.count((error, value) => {
        if (error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})


module.exports = pessoa