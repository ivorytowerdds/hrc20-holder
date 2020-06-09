import Vue from 'vue';
import Router from 'vue-router';
import AddressPage from '@/components/AddressPage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: AddressPage,
    },
  ],
});
