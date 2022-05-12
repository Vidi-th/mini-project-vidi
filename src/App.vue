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
            src="@/assets/Logo.png"
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
          v-for="item in items"
          :key="item.title"
          link
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

    <v-container fluid>
    <v-layout row>
    <v-app-bar
      app
      color="#DBE0E1"
    >
        <v-col
          cols="12"
          sm="6"
          md="4"
        >
          <v-text-field
            label="Search Sensor"
            filled
            rounded
            dense
          ></v-text-field>
        </v-col>

      <v-spacer></v-spacer>
      <v-col
          cols="12"
          sm="5"
          md="3"
        >
        <v-btn
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-bell-badge</v-icon>
        </v-btn>
        <div class="text-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-home-automation</v-icon>
                <span class="mr-2">GH Surabaya</span>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in itemGH"
                :key="index"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-col>
    </v-app-bar>
    </v-layout>
    </v-container>

    <v-main>
      <dashboard/>
    </v-main>
  </v-app>
</template>

<script>
import Dashboard from './views/Dashboard.vue';

export default {
  name: 'App',

  components: {
    Dashboard,
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
};
</script>
