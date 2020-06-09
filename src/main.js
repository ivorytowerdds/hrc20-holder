// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueScrollTo from 'vue-scrollto';
import Highcharts from 'highcharts';
import HighchartsVue from 'highcharts-vue';
import Notifications from 'vue-notification';

Vue.config.devtools = true;

import './filter';
import './icon';

Vue.use(VueScrollTo, {
  offset: -68,
});

Vue.config.productionTip = false;

Highcharts.setOptions({
  global: {
    useUTC: false,
  },
  lang: {
    thousandsSep: ',',
  },
  credits: {
    enabled: false,
  },
});
Vue.use(HighchartsVue);
Vue.use(Notifications);

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
