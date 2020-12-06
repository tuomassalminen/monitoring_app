
const showMain = async({render, session}) => {
    const data = {
        loggedIn: await session.get('authenticated')
    }
    render('index.ejs', data);
};
  
export { showMain };