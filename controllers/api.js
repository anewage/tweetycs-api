import { Controller } from 'bak'
import Joi from 'joi'

export default class APIController extends Controller {
    init () {
        this.defaults = {
            validate: {
                payload: {
                    foo: Joi.string()
                }
            }
        }

        this.get('/hello/{name}', this.hello)
        this.get('/error', this.error)

        this.get('/validate', this.validate, {
            validate: {
                query: {
                    name: Joi.string().required()
                }
            }
        })
    }

    validate (request, h) {
        return 'OK' + JSON.stringify(request.query)
    }

    hello (request, h) {
        return {data: 'Hello ' + request.params.name}
    }

    error (request, h) {
        return {data: 'Ooops...!'}
    }
}
