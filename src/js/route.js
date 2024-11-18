
const getCurrentRoute = () =>  {
  const currentFullPath = window.location.pathname;
  const currentRoute = currentFullPath.split("/").pop();
  return currentRoute.replace(".html", "");
};

const redirect = (view, isFromIndex) => {
    const currentFullPath = window.location.pathname;
    const currentRoute = currentFullPath.split("/").pop();
    const baseURL = currentFullPath.replace(`/${currentRoute}`, "");
  
   if (isFromIndex) {
      const newPath = `${baseURL}/views/${view}.html`;
      window.location.href = newPath;
      return;
    }

    const newPath = `${baseURL}/${view}.html`;
    window.location.href = newPath;
};

const changeView = (view, isFromIndex) => {
    if (view === "login") {
      redirect("login", isFromIndex);
    }
    if (view === "register") {
      redirect("register",isFromIndex);
    }
    if(view === 'board') {
      redirect("board");
    }
};

window.changeView = changeView;
export {changeView, getCurrentRoute};
  