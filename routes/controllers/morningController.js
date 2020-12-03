import { getMorningInfos } from '../../services/morningService.js'

const showMorningInfos = async({render}) => {
    const data = {
        morningInfos: await getMorningInfos()
    }
    render('index.ejs', data);
};
  
export { showMorningInfos };