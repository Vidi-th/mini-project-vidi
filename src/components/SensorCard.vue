<template>
    <v-container>
        <ApolloQuery
        :query="gql => gql`
            query DataSensor($nama: String!) {
                green_house(where: {name_gh: {_eq: $nama}}) {
                    sensors {
                        soil_moisture
                        light_brightness
                        humidity
                        co2
                        soil_temp
                        id_sensor
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
                <div v-show = "hidden">
                        {{cardNull=false}}
                    </div>
                <div v-if="data.green_house[0].sensors !=''">
                    <div
                    v-for="(item, index) in lastarr(data.green_house[0].sensors)" 
                    :key=index
                    >
                    
                    </div>
                 </div>

                 <div v-else>
                    <div v-show = "hidden">
                        {{changeActive()}}
                        {{cardNull=false}}
                    </div>
                 </div>
            </div>

            <div v-else class="no-result apollo">
                <div v-show = "hidden">
                        {{cardNull=true}}
                    </div>
                <div class="d-flex justify-center mb-12"
                >
                    <v-spacer class="order-1 pa-2"></v-spacer>
                    <v-img
                    class=" order-2 white--text align-center"
                    contain
                    src="../assets/card_mini-min.png"
                    max-width="450px"
                    >
                        <v-card-title class="display-3 text-right pl-12"> {{"Select Your"}}</v-card-title>
                        <v-card-title class="display-3 text-right pl-12"> {{"Greenhouse"}}</v-card-title>
                    </v-img>
                    <v-spacer class="order-3 pa-2"></v-spacer>
                </div>
            </div>
        </div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
      <ApolloSubscribeToMore
        :document="
          (gql) => gql`
            subscription DataSensor($nama: String!) {
                green_house(where: {name_gh: {_eq: $nama}}) {
                    sensors {
                        soil_moisture
                        light_brightness
                        humidity
                        co2
                        soil_temp
                        id_sensor
                        id_gh
                    }
                }
            }
          `
        "
        :variables="greenhouseComputed"
        :updateQuery="onUpdated"
      />
      </ApolloQuery>

        <div v-if="cardActive"
        class="d-flex justify-center mb-12"
        >
            <v-spacer class="order-1 pa-2"></v-spacer>

            <v-img
            class="order-2 pa-2 white--text align-center"
            alt="IoT Soil Moisture"
            contain
            src="../assets/card-soil-min.png"
            max-width="450px"
            >
                <div class="d-flex justify-center mb-6">
                    <v-card-title class="display-3">{{moistFromStore}}%</v-card-title>
                </div>
            </v-img>

            <v-spacer class="order-3 pa-2"></v-spacer>
            
            <v-img
            class="order-4 pa-2 white--text align-center"
            alt="IoT Light Brightness"
            contain
            src="../assets/card-light-min.png"
            max-width="450px"
            >
                <div class="d-flex justify-center mb-6">
                    <v-card-title class="display-3"> {{lightFromStore}}</v-card-title>
                </div>
            </v-img>

            <v-spacer class="order-5 pa-2"></v-spacer>
            </div>

            <div v-if="cardActive"
            class="d-flex justify-center mb-6"
            >
                <v-spacer class="order-1 pa-2"></v-spacer>

                <div class="order-2 pa-2">
                    <v-img
                    class=" white--text align-center"
                    contain
                    src="../assets/cardHumidity-min.jpg"
                    max-width="250px"
                    >
                        <v-card-title class="display-1 text-right pl-6"> {{humidityFromStore}}%</v-card-title>
                    </v-img>
                </div>
                <v-spacer class="order-3 pa-2"></v-spacer>

                <div class="order-4 pa-2">
                    <v-img
                    class=" white--text align-center"
                    contain
                    src="../assets/cardCO2-min.jpg"
                    max-width="250px"
                    >
                        <v-card-title class="display-0 text-right pl-4"> {{co2FromStore}} ppm </v-card-title>
                    </v-img>
                </div>

                <v-spacer class="order-5 pa-2"></v-spacer>

                <div class="order-6 pa-2">
                    <v-img
                    class=" white--text align-center"
                    contain
                    src="../assets/cardSoilTemp-min.jpg"
                    max-width="250px"
                    >
                        <v-card-title class="display-1 text-right pl-6"> {{tempFromStore}} °C </v-card-title>
                    </v-img>
                </div>
                <v-spacer class="order-7 pa-2"></v-spacer>
        </div>
        <div v-if='!cardActive && !cardNull'>
            <div
            class="d-flex justify-center mb-6"
            >
                <v-spacer class="order-1 pa-2"></v-spacer>
                
                <v-img
                class="order-2 pa-2 white--text align-center"
                alt="IoT Soil Moisture No Sensor"
                contain
                src="../assets/card-soil-min.png"
                max-width="450px"
                >
                    <v-card-title class="pl-16 display-3"> {{"No Sensor"}}</v-card-title>
                </v-img>

                <v-spacer class="order-3 pa-2"></v-spacer>

                <v-img
                class="order-4 pa-2 white--text align-center"
                alt="IoT Light Brightness No Sensor"
                contain
                src="../assets/card-light-min.png"
                max-width="450px"
                >
                    <v-card-title class="pl-16 display-3"> {{"No Sensor"}}</v-card-title>
                </v-img>

                <v-spacer class="order-5 pa-2"></v-spacer>
            </div>

            <div
            class="d-flex justify-center mb-6"
            >
                <v-spacer class="order-1 pa-2"></v-spacer>

                <v-img
                class="order-2 white--text align-center"
                alt="IoT Humidity No Sensor"
                contain
                src="../assets/card_empty-min.png"
                max-width="250px"
                >
                    <v-card-title class="pl-12 display-1"> {{"No Sensor"}}</v-card-title>
                </v-img>

                <v-spacer class="order-3 pa-2"></v-spacer>

                <v-img
                class="order-4 white--text align-center"
                alt="IoT CO2 No Sensor"
                contain
                src="../assets/card_empty-min.png"
                max-width="250px"
                >
                    <v-card-title class="pl-12 display-1"> {{"No Sensor"}}</v-card-title>
                </v-img>

                <v-spacer class="order-5 pa-2"></v-spacer>

                <v-img
                class="order-6 white--text align-center"
                alt="IoT Soil Temp No Sensor"
                contain
                src="../assets/card_empty-min.png"
                max-width="250px"
                >
                    <v-card-title class="pl-12 display-1"> {{"No Sensor"}}</v-card-title>
                </v-img>

                <v-spacer class="order-7 pa-2"></v-spacer>
            </div>
        </div>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        node: 1,
        green_house:{},
        cardActive : false,
        cardNull : false,
        subMqtt: null,
    }),
    methods:{
        lastarr(data){
            let lastElement =[];
            lastElement[0] = data[data.length - 1];
            this.cardActive = true;
            this.$store.dispatch('updateMoist', lastElement[0].soil_moisture);
            this.$store.dispatch('updateLight', lastElement[0].light_brightness);
            this.$store.dispatch('updateHumidity', lastElement[0].humidity);
            this.$store.dispatch('updateTemp', lastElement[0].soil_temp);
            this.$store.dispatch('updateCo2', lastElement[0].co2);
            return lastElement;
        },
        onUpdated(previousResult, { subscriptionData }) {
            return {
                green_house: subscriptionData.data.green_house
            }
        },
        changeActive(){
            this.cardActive = false;
        },
        changeCardnull(){
            this.cardNull = !this.cardNull;
        }
    },
    computed:{
        greenhouseComputed(){
            if(this.greenhouseStore == null){
                return {nama: "tidakada"}
            }
            return {nama: this.greenhouseStore}
        },

        greenhouseStore(){
            return this.$store.state.selectGH;
        },

        humidityFromStore(){
            return this.$store.state.humidityNow;
        },

        moistFromStore(){
            return this.$store.state.moistNow;
        },

        lightFromStore(){
            return this.$store.state.lightNow;
        },

        tempFromStore(){
            return this.$store.state.tempNow;
        },

        co2FromStore(){
            return this.$store.state.co2Now;
        },
    },
}
</script>