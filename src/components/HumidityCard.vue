<template>
    <v-container>
        <ApolloQuery
        :query="gql => gql`
            query MyQuery {
                sensor {
                    humidity
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
            alt="IoT Humidity"
            class=" white--text align-center"
            contain
            src="@/assets/cardHumidity.jpg"
            max-width="250px"
            >
                <v-card-title class="display-1 text-right pl-6"> {{item.humidity}}%</v-card-title>
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
                    humidity
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
    setup() {
        
    },
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