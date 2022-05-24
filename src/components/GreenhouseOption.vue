<template>
    <v-container class="pa-0">
      <div
      class="d-flex"
      >
      
      <AddNewGH class="order-1 mt-4"/>

      <ApolloQuery
        :query="gql => gql`
            query GreenHouse {
              green_house {
                nama
                id
              }
            }
        `"
      >

      <template v-slot="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occurred
          {{ error }}
        </div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">
          <GreenhouseItem 
          v-for="(item, index) in data.green_house"
          :key="index"
          :data="item"
          :id="index"
          @list-greenhouse="addData"
          />
        </div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
      <ApolloSubscribeToMore
        :document="
          (gql) => gql`
            subscription MySubscription {
              green_house {
                nama
                id
              }
            }
          `
        "
        :updateQuery="onUpdated"
      />
      </ApolloQuery>
      <v-select class="order-2 mt-7"
          :items="greenhouseItem"
          label="Select Green House"
          v-model="select"
          return-object
          single-line
          item-color="#E5E5E5"
          >{{changeGH(select)}}</v-select>
      </div>
    </v-container>
</template>

<script>
import GreenhouseItem from "@/components/GreenhouseOptionItem.vue"
import AddNewGH from "@/components/AddNewGreenhouse.vue"

export default {
  components: {
    GreenhouseItem,
    AddNewGH,
  },
  
  data() {
    return {
      select:"",
      greenhouseItem: [],
      green_house:{},
    };
  },

  methods: {
    addData(param, id){
      if(id>=this.greenhouseItem.length){
        this.greenhouseItem.push(param);
      }
    },

    changeGH(param){
      this.$store.dispatch('selectGH', param);
    },

    onUpdated(previousResult, { subscriptionData }) {
        return {
            green_house: subscriptionData.data.green_house
        }
    },
  }
}
</script>