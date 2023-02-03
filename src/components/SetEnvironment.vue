<template>
    <v-container>
        <ApolloQuery
        :query="gql => gql`
            query MyQuery($nama: String!) {
                treshold(where: {green_house: {name_gh: {_eq: $nama}}}) {
                    id_treshold
                    humidity
                    co2
                    light
                    moist
                    plant_name
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
            {{resetEnv()}}
        </div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo"> 
            <div v-if="data != []">
                <div
                v-for="(item, index) in data" 
                :key=index
                >
                    {{lastarr(item)}}
                </div>
            </div>
            <div v-else>
                {{resetEnv()}}
            </div>
        </div>

        <!-- No result -->
        <div v-else class="no-result apollo">{{resetEnv()}}</div>
      </template>
      <ApolloSubscribeToMore
        :document="
          (gql) => gql`
            subscription MySubscription($nama: String!) {
                treshold(where: {green_house: {name_gh: {_eq: $nama}}}) {
                    humidity
                    co2
                    id_treshold
                    light
                    moist
                    plant_name
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
                <span class="text-h7">Before</span>
                <br>
                <span class="text-h8">{{"id Greenhouse = "}}</span>
                <span class="text-h8">{{idgreenhouseStore}}</span>
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
                        label="ID Greenhouse"
                        v-model="idGreenhouse"
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
                        sm="4"
                        md="3"
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
                        sm="4"
                        md="3"
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
                        sm="4"
                        md="3"
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
                        sm="4"
                        md="3"
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
                    mutation MyMutation($object: treshold_insert_input = {}) {
                        insert_treshold_one(object: $object) {
                            id_treshold
                        }
                    }
                    `"
                    :variables="{
                        object: {
                            id_greenHouse: idGreenhouse,
                            plant_name: editNamaTumbuhan,
                            co2: editCo2,
                            humidity: editHumidity,
                            light: editLight,
                            moist: editSoilMoist,
                            temp: editTemp
                        }
                    }"
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
        editHumidity:null,
        editCo2:null,
        editLight:null,
        editSoilMoist:null,
        editTemp:null,
        editNamaTumbuhan:"",
        idGreenhouse:null,
    }),
    methods:{
        lastarr(data){
            if(data == ''){
                this.nama_tumbuhan = "";
                this.humidity = 0;
                this.light = 0;
                this.soilMoist = 0;
                this.temp = 0;
                this.co2 = 0;
            }
            else{
                let lastElement =[];
                lastElement = data[data.length - 1];
                this.nama_tumbuhan = lastElement.plant_name;
                this.humidity = lastElement.humidity;
                this.light = lastElement.light;
                this.soilMoist = lastElement.moist;
                this.temp = lastElement.temp;
                this.co2 = lastElement.co2;
                console.log(" Publish to : greenhouseVidi/Treshold/" + this.idgreenhouseStore);
                this.$mqtt.publish('greenhouseVidi/Treshold/' + this.idgreenhouseStore, this.soilMoist +';' + this.temp + ';' + this.light + ';' + this.humidity + ';' + this.co2) 
            }
        },
        onUpdated(previousResult, { subscriptionData }) {
            return {
                treshold: subscriptionData.data.treshold
            }
        },
        publishMQTT () {
            
        },
        resetEdit(){
            this.editNamaTumbuhan = "";
            this.editHumidity = null;
            this.editLight = null;
            this.editSoilMoist = null;
            this.editTemp = null;
            this.editCo2 = null;
            this.idGreenhouse = null;
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
        },
    },
    computed:{
        updateEnv(){
            return{
                id_greenHouse: this.idGreenhouse,
                plant_name: this.editNamaTumbuhan,
                co2: this.editCo2,
                humidity: this.editHumidity,
                light: this.editLight,
                soil: this.editSoilMoist,
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
                soil: this.editSoilMoist,
                temp: this.editTemp
            }
        },
        greenhouseStore(){
            return this.$store.state.selectGH;
        },
        greenhouseComputed(){
            if(this.greenhouseStore == null){
                return {nama: "tidakada"}
            }
            return {nama: this.greenhouseStore}
        },
        idgreenhouseStore(){
            return this.$store.state.selectIdGH;
        },
    }
}
</script>