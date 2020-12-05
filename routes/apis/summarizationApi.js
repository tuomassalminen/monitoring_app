import * as morningService from '../../services/morningService.js'
import * as eveningService from '../../services/eveningService.js'

const getAllNews = async({response}) => {
    response.body = await newsService.getAllNews();
};

const addNews = async({request, response}) => {
    const body = request.body({type: 'json'});
    const document = await body.value;
    newsService.addNews(document.news)
    response.status = 200;
};

const getNewsById = async({params, response}) => {
    if (params.id) {
        const news = await newsService.getNewsById(params.id)
        response.body = news
    }
}

const deleteNews = async({params, response}) => {
    if (params.id) {
        await newsService.deleteNews(params.id)
    }
    response.status = 200
}

export { 
    getAllNews, 
    addNews, 
    getNewsById, 
    deleteNews 
};