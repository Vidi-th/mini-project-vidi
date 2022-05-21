<template>
    <v-container>
        <ApolloQuery
        :query="gql => gql`
            query MyQuery {
                sensor {
                    soil_moisture
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
            <v-list-item 
                v-for="(item, index) in lastarr(data.sensor)" 
                :key=index
            >
            <v-list-item-title> 
                <v-img
                alt="IoT Soil Moisture"
                class="white--text align-center"
                contain
                src="@/assets/cardSoilMoist.jpg"
                max-width="450px"
                >
                <div
                class="d-flex justify-center mb-6"
                >
                    <v-card-title class="display-3">{{item.soil_moisture}}%</v-card-title>
                </div>
                </v-img>
            </v-list-item-title>
            </v-list-item>
        </div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
      <ApolloSubscribeToMore
        :document="
          (gql) => gql`
            subscription MySubscription {
                sensor {
                    soil_moisture
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
export default {
    data: () => ({
        node: 1,
    }),
    methods:{
        lastarr(data){
            let lastElement =[];
            lastElement[0] = data[data.length - 1];
            return lastElement;
        },
        onUpdated(previousResult, { subscriptionData }) {
            return {
                sensor: subscriptionData.data.sensor
            }
        },
    }
}
</script>