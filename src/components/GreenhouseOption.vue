<template>
    <v-container class="pa-0">
        <v-toolbar
          color="#E5E5E5"
          class="rounded-xl"
        >
          <v-col
          cols="12"
          sm="6"
          md="8"
          >
          </v-col>

          <v-col
            cols="6"
            md="4"
          >
            <div
            class="d-flex"
            >
              <div class="order-1 pa-2">
                <v-btn>
                  <v-icon>mdi-bell-badge</v-icon>
                </v-btn>
              </div>

              <div class="order-2 pa-2">
                <AddNewGH/>
              </div>
              
              <div class="order-3 pa-2 mt-4">
                <v-select
                :items="greenhouseItem"
                label="Select Green House"
                v-model="select"
                return-object
                single-line
                item-color="#E5E5E5"
                >{{changeGH(select)}}</v-select>
              </div>

            </div>
            </v-col>
       </v-toolbar>
      <ApolloQuery
        :query="gql => gql`
            query GreenHouseName {
              green_house {
                id
                name_gh
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
          <div
          v-for="(item, index) in data.green_house"
          :key="index"
          >
          {{addData(item.name_gh,index)}}
          </div>
        </div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
      <ApolloSubscribeToMore
        :document="
          (gql) => gql`
            subscription MySubscription {
              green_house {
                id
                name_gh
              }
            }
          `
        "
        :updateQuery="onUpdated"
      />
      </ApolloQuery>
      
    </v-container>
</template>

<script>
import AddNewGH from "@/components/AddNewGreenhouse.vue"

export default {
  components: {

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

<style scoped>
.order-1{
  display: flex;
  align-items: center;
}

.order-2{
  display: flex;
  align-items: center;
}

.order-3{
  display: flex;
  align-items: center;
}
</style>