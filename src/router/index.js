import Vue from 'vue';
import Router from 'vue-router';
import AddressPage from '@/components/AddressPage';
import HomePage from '@/components/HomePage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/address/:address',
      name: 'AddressPage',
      component: AddressPage,
    },
  ],
});
