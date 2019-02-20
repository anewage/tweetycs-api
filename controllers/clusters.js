import { Controller } from 'bak'

export default class APIController extends Controller {
    init () {
        this.get('/cluster/{name}', this.getCluster)
        this.get('/clusters', this.getClusters)
    }

    getCluster (request, h) {
        let id = request.params.name
        return {data: 'Cluster ' + name}
    }

    getClusters (request, h) {
        return {data: 'Clusters...'}
    }
}
