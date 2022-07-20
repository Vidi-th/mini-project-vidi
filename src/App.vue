<template>
  <v-app id = "app">
    <v-navigation-drawer permanent
      app
      dark
      color="#5D6E1E"
    >
      <v-list-item>
        <div class="d-flex align-center">
          <v-list-item-content>
            <v-img
            alt="IoT Greenhouse Logo"
            class="shrink mr-2"
            contain
            src="@/assets/logo.png"
            transition="scale-transition"
            max-width="60px"
          />
            <v-toolbar-title>IoT Greenhouse</v-toolbar-title>
          </v-list-item-content>
        </div>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="press(item.title)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  components: {

  },

  data: () => ({
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard' },
      { title: 'Installation', icon: 'mdi-hammer-screwdriver' },
      { title: 'Statistics', icon: 'mdi-chart-bar-stacked' },
      { title: 'About', icon: 'mdi-help-box' },
    ],
    itemGH: [
      { title: 'GH Surabaya' },
      { title: 'GH Madiun' },
      { title: 'Add New +' },
    ],
    right: null,
  }),

  methods :{
      press(path){
      this.$router.push({name: path})
    }
  },
  mounted () {
    this.$mqtt.subscribe('greenhouseVidi/#')
  }
};
</script>
