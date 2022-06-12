<template>
    <v-container>
        <ApolloQuery
        :query="gql => gql`
            query MyQuery($nama: String!) {
                threshold(where: {green_house: {nama: {_eq: $nama}}}) {
                    co2
                    humidity
                    light
                    plant_name
                    soil_moist
                    temp
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
            <div
            v-for="(item, index) in data" 
            :key=index
            >
                <div v-if="item[0] !=undefined">
                    {{setEnv(item[0])}}
                </div>
                <div v-else>
                    {{resetEnv()}}
                </div>
            </div>
        </div>

        <!-- No result -->
        <div v-else class="no-result apollo"></div>
      </template>
      <ApolloSubscribeToMore
        :document="
          (gql) => gql`
            subscription MySubscription($nama: String!) {
                threshold(where: {green_house: {nama: {_eq: $nama}}}) {
                    co2
                    humidity
                    light
                    plant_name
                    soil_moist
                    temp
                }
            }
          `
        "
        :variables="greenhouseComputed"
        :updateQuery="onUpdated"
      />
      </ApolloQuery>

        <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
            >
            <template v-slot:activator="{on}">
                <v-btn
                dark
                v-on="on"
                >
                <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                <span class="text-h5">Settings Greenhouse Environment</span>
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-text-field
                        label="Plant Name"
                        v-model="nama_tumbuhan"
                        hint="Tomat"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-text-field
                        label="Soil Moisture"
                        v-model="soilMoist"
                        type="number"
                        hint="80"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-text-field
                        label="Light Brightness"
                        v-model="light"
                        type="number"
                        hint="75"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                        label="Humidity"
                        v-model="humidity"
                        type="number"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                        label="CO2"
                        v-model="co2"
                        type="number"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                    >
                        <v-text-field
                        label="Temperature"
                        v-model="temp"
                        type="number"
                        required
                        ></v-text-field>
                    </v-col>
                    </v-row>
                </v-container>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="#94B447"
                    text
                    @click="dialog = false"
                >
                    Close
                </v-btn>
                <ApolloMutation
                :mutation="gql => gql`
                    mutation MyMutation($nama: String!, $co2: Int!, $humidity: Int!, $light: Int!, $plant_name: String!, $soil_moist: Int!, $temp: Int!) {
                    update_threshold(where: {green_house: {nama: {_eq:$nama}}}, _set: {co2: $co2, humidity: $humidity, light: $light, plant_name: $plant_name, soil_moist: $soil_moist, temp: $temp}) {
                        
                }
                `"
                :variables="updateEnv"
                >
                <template v-slot="{ mutate, error}">
                <!-- Error -->
                <div v-if="error" class="error apollo">An error occurred
                    {{ error }}
                </div>
                <!-- Mutate -->
                    <v-btn
                        color="#94B447"
                        text
                        @click="mutate(); dialog = false; addEnvStore()"
                    >
                        Save
                    </v-btn>
                </template>
                </ApolloMutation>
                </v-card-actions>
            </v-card>
            </v-dialog>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        dialog: false,
        humidity:0,
        co2:0,
        light:0,
        soilMoist:0,
        temp:0,
        nama_tumbuhan:"",
    }),
    methods:{
        addEnvStore(){
            this.$store.dispatch('updateTreshold', this.updateEnv);
        },
        setEnv(param){
            if(param.plant_name == undefined){
                this.nama_tumbuhan = "";
                this.humidity = 0;
                this.light = 0;
                this.soilMoist = 0;
                this.temp = 0;
                this.co2 = 0;
            }

            else{
                this.nama_tumbuhan = param.plant_name;
                this.humidity = param.humidity;
                this.light = param.light;
                this.soilMoist = param.soil_moist;
                this.temp = param.temp;
                this.co2 = param.co2;
            }
        },
        resetEnv(){
            this.nama_tumbuhan = "";
            this.humidity = 0;
            this.light = 0;
            this.soilMoist = 0;
            this.temp = 0;
            this.co2 = 0;
        },
        onUpdated(previousResult, { subscriptionData }) {
            return {
                treshold: subscriptionData.data.treshold
            }
        },
    },
    computed:{
        updateEnv(){
            return{
                nama: this.greenhouseStore,
                plant_name: this.nama_tumbuhan,
                co2: this.co2,
                humidity: this.humidity,
                light: this.light,
                soil_moist: this.soilMoist,
                temp: this.temp
            }
        },
        greenhouseStore(){
            return this.$store.state.selectGH;
        },
        greenhouseComputed(){
            console.log(this.greenhouseStore)
            if(this.greenhouseStore == ""){
                return {nama: "tidakada"}
            }
            return {nama: this.greenhouseStore}
        },
    }
}
</script>