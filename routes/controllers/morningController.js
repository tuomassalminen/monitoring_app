import * as service from '../../services/morningService.js'

const showMorningInfos = async({render}) => {
    const data = {
        morningInfos: await service.getMorningInfos()
    }
    render('index.ejs', data);
};

const postMorningInfos = async({request, response}) => {
    const body = request.body()
    const params = await body.value
    await service.addMorningInfo(params)
    response.redirect('/')
}
  
export { showMorningInfos, postMorningInfos };