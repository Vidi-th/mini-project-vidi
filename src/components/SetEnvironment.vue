<template>
    <v-container>
        <ApolloQuery
        :query="gql => gql`
            query SearchID_GH($nama: String!) {
                green_house(where: {nama: {_eq:$nama}}) {
                    id
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
            v-for="(item, index) in data.green_house"
            :key="index"
            >
                {{addIdGreenhouse(item.id)}}
            </div>
        </div>

        <!-- No result -->
        <div v-else class="no-result apollo"></div>
      </template>
      </ApolloQuery>

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
                <div v-if="item[0] != undefined">
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
                <span class="text-h7">Before</span>
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
                        readonly
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
                        readonly
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
                        readonly
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-text-field
                        label="Humidity"
                        v-model="humidity"
                        type="number"
                        readonly
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-text-field
                        label="CO2"
                        v-model="co2"
                        type="number"
                        readonly
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-text-field
                        label="Temperature"
                        v-model="temp"
                        type="number"
                        readonly
                        ></v-text-field>                        
                    </v-col>
                    </v-row>
                </v-container>
                <span class="text-h7">Edit Here</span>
                <v-container>
                    <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-text-field
                        label="Plant Name"
                        v-model="editNamaTumbuhan"
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
                        v-model="editSoilMoist"
                        type="number"
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
                        v-model="editLight"
                        type="number"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-text-field
                        label="Humidity"
                        v-model="editHumidity"
                        type="number"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-text-field
                        label="CO2"
                        v-model="editCo2"
                        type="number"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-text-field
                        label="Temperature"
                        v-model="editTemp"
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
                    mutation UpdateEnv($nama: String!, $co2: Int!, $humidity: Int!, $light: Int!, $plant_name: String!, $soil_moist: Int!, $temp: Int!) {
                    update_threshold(where: {green_house: {nama: {_eq:$nama}}}, _set: {co2: $co2, humidity: $humidity, light: $light, plant_name: $plant_name, soil_moist: $soil_moist, temp: $temp}) {
                        affected_rows
                        }
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
                        @click="mutate(); dialog = false; resetEdit()"
                    >
                        Update
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
        editHumidity:0,
        editCo2:0,
        editLight:0,
        editSoilMoist:0,
        editTemp:0,
        editNamaTumbuhan:"",
        idGreenhouse:0,
    }),
    methods:{
        // addEnvStore(){
        //     console.log(this.updateEnv);
        //     this.$store.dispatch('updateTresholdMoist', this.editSoilMoist);
        //     this.$store.dispatch('updateTresholdLight', this.editLight);
        //     this.$store.dispatch('updateTresholdHumidity', this.editHumidity);
        //     this.$store.dispatch('updateTresholdTemp', this.editTemp);
        // },
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
        
        dataRead(param){
            console.log(param);
        },
        resetEdit(){
            this.editNamaTumbuhan = "";
            this.editHumidity = 0;
            this.editLight = 0;
            this.editSoilMoist = 0;
            this.editTemp = 0;
            this.editCo2 = 0;
        },

        resetEnv(){
            this.nama_tumbuhan = "";
            this.humidity = 0;
            this.light = 0;
            this.soilMoist = 0;
            this.temp = 0;
            this.co2 = 0;
        },
        addIdGreenhouse(param){
            this.idGreenhouse = param;
        }
    },
    computed:{
        updateEnv(){
            return{
                nama: this.greenhouseStore,
                plant_name: this.editNamaTumbuhan,
                co2: this.editCo2,
                humidity: this.editHumidity,
                light: this.editLight,
                soil_moist: this.editSoilMoist,
                temp: this.editTemp
            }
        },
        addEnv(){
            return{
                id_greenhouse: this.idGreenhouse,
                plant_name: this.editNamaTumbuhan,
                co2: this.editCo2,
                humidity: this.editHumidity,
                light: this.editLight,
                soil_moist: this.editSoilMoist,
                temp: this.editTemp
            }
        },
        greenhouseStore(){
            return this.$store.state.selectGH;
        },
        greenhouseComputed(){
            if(this.greenhouseStore == ""){
                return {nama: "tidakada"}
            }
            return {nama: this.greenhouseStore}
        },
    }
}
</script>