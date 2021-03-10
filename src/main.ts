import {
  ApplicationInsights,
  SeverityLevel,
} from '@microsoft/applicationinsights-web';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

const appInsights = new ApplicationInsights({
  config: {
    connectionString: '',
    disableFetchTracking: false, // report fetch requests
    disableExceptionTracking: false, // report exceptions
    enableUnhandledPromiseRejectionTracking: true, // report unhandled promise rejections
    enableAutoRouteTracking: true, // track navigation inside the SPA
  },
});

Vue.config.errorHandler = (err, vm, info) => {
  // Mimic the behaviour of the default error handler
  console.error(`[Vue warn]: Error in ${info}: "${err.toString()}"`);
  console.error(err);

  // Report the vue error
  appInsights.trackException({
    exception: err,
    severityLevel: SeverityLevel.Error,
  });
};

appInsights.loadAppInsights();
appInsights.context.application.ver = process.env.VUE_APP_VERSION;
appInsights.trackPageView();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
