import Home from '../views/pages/home';
import Detail from '../views/pages/detail';
import Favourite from '../views/pages/favourite';

const routes = {
  '/': Home, // default page
  '/home': Home,
  '/favorit': Favourite,
  '/detail/:id': Detail,
};

export default routes;
