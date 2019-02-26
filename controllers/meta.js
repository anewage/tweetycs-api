import { Controller } from 'bak'

export default class MetaDataController extends Controller {
    init () {
        this.get('/meta/keywords', this.getKeywords)
    }

    getKeywords (request, h) {
        // TODO: use the Flask API
        return {data: [
                {
                    "count": 22672,
                    "keyword": "get"
                },
                {
                    "count": 20371,
                    "keyword": "health"
                },
                {
                    "count": 20230,
                    "keyword": "like"
                },
                {
                    "count": 20027,
                    "keyword": "women"
                },
                {
                    "count": 18448,
                    "keyword": "may"
                },
                {
                    "count": 16265,
                    "keyword": "type"
                },
                {
                    "count": 15821,
                    "keyword": "new"
                },
                {
                    "count": 14053,
                    "keyword": "people"
                },
                {
                    "count": 12141,
                    "keyword": "migrate"
                },
                {
                    "count": 12106,
                    "keyword": "risk"
                },
                {
                    "count": 12093,
                    "keyword": "help"
                },
                {
                    "count": 11840,
                    "keyword": "one"
                },
                {
                    "count": 11351,
                    "keyword": "news"
                },
                {
                    "count": 9686,
                    "keyword": "today"
                },
                {
                    "count": 9444,
                    "keyword": "life"
                },
                {
                    "count": 9198,
                    "keyword": "self"
                },
                {
                    "count": 9037,
                    "keyword": "know"
                },
                {
                    "count": 8714,
                    "keyword": "world"
                },
                {
                    "count": 8030,
                    "keyword": "harm"
                },
                {
                    "count": 7394,
                    "keyword": "treatment"
                },
                {
                    "count": 7264,
                    "keyword": "need"
                },
                {
                    "count": 6797,
                    "keyword": "diet"
                },
                {
                    "count": 6778,
                    "keyword": "study"
                },
                {
                    "count": 6618,
                    "keyword": "day"
                },
                {
                    "count": 6527,
                    "keyword": "right"
                },
                {
                    "count": 6444,
                    "keyword": "time"
                },
                {
                    "count": 6423,
                    "keyword": "please"
                },
                {
                    "count": 6405,
                    "keyword": "good"
                },
                {
                    "count": 6271,
                    "keyword": "patients"
                },
                {
                    "count": 6205,
                    "keyword": "take"
                },
                {
                    "count": 6017,
                    "keyword": "awareness"
                },
                {
                    "count": 5959,
                    "keyword": "think"
                },
                {
                    "count": 5855,
                    "keyword": "see"
                },
                {
                    "count": 5749,
                    "keyword": "worldhealthday"
                },
                {
                    "count": 5251,
                    "keyword": "want"
                },
                {
                    "count": 5240,
                    "keyword": "year"
                },
                {
                    "count": 5154,
                    "keyword": "met"
                },
                {
                    "count": 5114,
                    "keyword": "cause"
                },
                {
                    "count": 5081,
                    "keyword": "feel"
                },
                {
                    "count": 5005,
                    "keyword": "great"
                },
                {
                    "count": 4862,
                    "keyword": "blood"
                },
                {
                    "count": 4861,
                    "keyword": "years"
                },
                {
                    "count": 4787,
                    "keyword": "vaccine"
                },
                {
                    "count": 4773,
                    "keyword": "research"
                },
                {
                    "count": 4750,
                    "keyword": "children"
                },
                {
                    "count": 4708,
                    "keyword": "bold"
                },
                {
                    "count": 4659,
                    "keyword": "work"
                },
                {
                    "count": 4653,
                    "keyword": "days"
                },
                {
                    "count": 4636,
                    "keyword": "sugar"
                },
                {
                    "count": 4629,
                    "keyword": "punishment"
                }
            ]}
    }
}
