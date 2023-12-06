import {isUserLoggedIn} from '../constants/config'
import {getCurrentUser, setCurrentUser} from '.'

export default (to, from, next) => {
  if (to.name === undefined && to.path === '/') {
    setCurrentUser(null);
    next('/user/login')
  } else {
    if (to.matched.some(record => record.meta.loginRequired)) {
      const iUser = isUserLoggedIn()
      if (iUser === null) {
        setCurrentUser(null);
        next('/user/login')
      } else {
        if (iUser) {
          const user = getCurrentUser();
          if (user) {
            const roleArrayHierarchic = to.matched.filter(x => x.meta.roles).map(x => x.meta.roles);
            if (roleArrayHierarchic.every(x => x.includes(user.role))) {
              next();
            } else {
              next('/unauthorized')
            }
          } else {
            setCurrentUser(null);
            next('/user/login')
          }
        } else {
          next();
        }
      }
    } else {
      next()
    }
  }
}
