<template>
    <v-container>
        <ApolloQuery
        :query="gql => gql`
            query MyQuery($nama: String!) {
                green_house(where: {nama: {_eq: $nama}}) {
                    sensors {
                        humidity
                        id
                        id_gh
                    }
                }
            }
        `"
        :variables="greenhouseComputed"
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
            <div v-if="data.green_house !=''">
                <div v-if="data.green_house[0].sensors !=''">
                    <div
                    v-for="(item, index) in lastarr(data.green_house[0].sensors)" 
                    :key=index
                    >
                        <div> 
                        <v-img
                        alt="IoT Humidity"
                        class=" white--text align-center"
                        contain
                        src="@/assets/cardHumidity.jpg"
                        max-width="250px"
                        >
                            <v-card-title class="display-1 text-right pl-6"> {{item.humidity}}%</v-card-title>
                        </v-img>
                        </div>
                    </div>
                 </div>
                 <div v-else>
                     <div> 
                        <v-img
                        alt="IoT Humidity No Sensor"
                        class=" white--text align-center"
                        contain
                        src="@/assets/card_empty.png"
                        max-width="250px"
                        >
                            <v-card-title class="pl-12 display-1"> {{"No Sensor"}}</v-card-title>
                        </v-img>
                        </div>
                 </div>
            </div>

            <div v-else class="no-result apollo">
                <v-img
                alt="No Data"
                class=" white--text align-center"
                contain
                src="@/assets/cardHumidity.jpg"
                max-width="250px"
                >
                    <v-card-title class="display-0 text-right pl-3"> {{"No Data"}}</v-card-title>
                </v-img>
                
            </div>
        </div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
      <!-- <ApolloSubscribeToMore
        :document="
          (gql) => gql`
            subscription MySubscription {
                sensors {
                    humidity
                }
            }
          `
        "
        :updateQuery="onUpdated" -->
      <!-- /> -->
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
            console.log(lastElement);
            return lastElement;
        },
        onUpdated(previousResult, { subscriptionData }) {
            return {
                sensors: subscriptionData.data.sensors
            }
        },
    },
    computed:{
        greenhouseComputed(){
            if(this.greenhouseStore == ""){
                return {nama: "tidakada"}
            }
            return {nama: this.greenhouseStore}
        },

        greenhouseStore(){
            return this.$store.state.selectGH;
        }
    },
}
</script>