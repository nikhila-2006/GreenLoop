export function handleUserAction(navigate) {
    const userToken = localStorage.getItem("token");
    if (userToken) {
        navigate("/upload");
    }else {
        navigate("/user/login");
    }
}

export function handleRecyclerAction(navigate) {
    const recyclerToken = localStorage.getItem("recyclerToken");
    if (recyclerToken) {
        navigate("/pickup");
        return;
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/recycler/login");
}