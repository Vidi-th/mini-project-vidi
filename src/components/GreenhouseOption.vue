<template>
    <v-container>
      <div
      class="d-flex"
      >

        <v-btn class="order-1 pa-3 mt-7"
        >
        <v-icon>mdi-home-automation</v-icon>
        </v-btn>

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
          {{data.green_house.nama}}
          <!-- <GreenhouseItem
          v-for="(item, index) in data.green_house"
          :key="index"
          :data="item"
          :id="item.id"
          >
          </GreenhouseItem> -->
          <v-list-item 
                v-for="(item, index) in data.green_house" 
                :key=index
            >
            {{addData(item)}}
          </v-list-item>
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
        <v-select class="order-2 pa-3 mt-4"
            v-model="select"
            :items="greenhouseItem.nama"
            item-text="name"
            label="Select"
            return-object
            single-line
            item-color="#E5E5E5"
            ></v-select>
      </div>
    </v-container>
</template>

<script>
//import GreenhouseItem from "@/components/GreenhouseOptionItem.vue"

export default {
  components: {
    // GreenhouseItem,
  },
  
  data() {
    return {
      select:{},
      greenhouseItem: [],
    };
  },

  methods: {
    addData(param){
      this.greenhouseItem.push(param);
      console.log(this.greenhouseItem);
      // this.select = param[0];
      return param;
    },

    onUpdated(previousResult, { subscriptionData }) {
        return {
            green_house: subscriptionData.data.green_house
        }
    },
  }
}
</script>