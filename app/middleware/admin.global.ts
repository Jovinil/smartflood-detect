export default defineNuxtRouteMiddleware((to) =>{
    
    const user = useCurrentUser();

    // '/admin route here and in the navigateTo is the login page'
    if(to.path === '/admin') {
        return;
    }
    
    // the to.path.startsWith checks if the path has '/admin' at the start
    if(to.path.startsWith('/admin') && !user.value) {
        return navigateTo('/admin');
    }
})