import { CanActivateFn , Router, RouterLink} from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  
  let _router=new Router
  if(localStorage.getItem('userToken') != null)
  {
    return true
  }else
  {
    _router.navigate(['/signIn'])
    return false
  }
};
