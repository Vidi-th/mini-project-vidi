<template>
    <v-container>
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
                        v-model="plant_name"
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
                    mutation MyMutation($co2: Int, $humidity: Int, $light: Int, $plant_name: String, $soil_moist: Int, $temp: Int) {
                        update_threshold_by_pk(pk_columns: {id: 1}, _set: {co2: $co2, humidity: $humidity, light: $light, plant_name: $plant_name, soil_moist: $soil_moist, temp: $temp}) {
                            plant_name
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
                        @click="mutate(); dialog = false"
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
        plant_name:"",
    }),
    computed:{
        updateEnv(){
            return{
                co2: this.co2,
                humidity: this.humidity,
                light: this.light,
                plant_name: this.plant_name,
                soil_moist: this.soilMoist,
                temp: this.temp
            }
        },
    }
}
</script>