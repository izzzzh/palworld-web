const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    userInfo: state => state.user.userInfo,
    roles: state => state.user.roles,
    permissions: state => state.user.permissions,
    addRoutes: state => state.permission.addRoutes,
}
