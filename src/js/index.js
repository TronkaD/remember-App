const redirect = (view, isFromIndex) => {
    const currentFullPath = window.location.pathname;
    const currentRoute = currentFullPath.split('/').pop();
    const baseURL = currentFullPath.replace(`/${currentRoute}`, "");
    console.log('Vérification de sessionStorage...');

    if(isFromIndex) {
        const newPath = `${baseURL}/src/views/${view}.html`;
        window.location.href = newPath;
        return;
    }
    console.log(currentRoute);
};
const changeView = (view) => {
    if(view === 'login') {
        //rediriger vers login
        redirect('login', true);
    }

    if(view === 'register') {
        //rediriger vers register
        redirect('register', true);
    }
};

window.changeView = changeView;