import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from '@/store/index.js'
import { ApolloClient, HttpLink, InMemoryCache, split } from 
'apollo-boost'
import VueApollo from 'vue-apollo'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import VueMqtt from 'vue-mqtt'

Vue.use(VueMqtt, 'ws://broker.emqx.io:8083/mqtt', "clean: true, connectTimeout: 4000, reconnectPeriod: 4000, clientId: 'mqttjs_3be2c321', username: 'emqx_test', password: 'emqx_test'")

Vue.config.productionTip = false

const httpLink = new HttpLink({
  uri : 'https://mini-project-vidi.hasura.app/v1/graphql',
})

const wsLink = new WebSocketLink({
  uri:'wss://mini-project-vidi.hasura.app/v1/graphql',
  options: {
      reconnect: true,
  }
});

const link = split(
  ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind == 'OperationDefinition' && definition.operation == 'subscription';
  },
  wsLink,
  httpLink,
);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.use(VueApollo)

new Vue({
  router,
  store,
  apolloProvider,
  vuetify,
  render: h => h(App)
}).$mount('#app')
