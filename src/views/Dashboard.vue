<template>
    <v-container fluid>
        <greenhouse-option/>
        <div
        class="d-flex justify-center mb-6"
        >
            <v-icon class="order-1 pa-2">mdi-map-marker-radius</v-icon>
            <Location class="order-2 pa-2 pt-4"/>
            <v-spacer class="order-3 pa-2"></v-spacer>
            <v-row class="order-4 pa-2">
                <SetEnv/>
            </v-row>
        </div>
        <SensorCard/>
        <AktuaktorCard/>
        <div class="sub">
            <ApolloMutation
                :mutation="gql => gql`
                mutation AddSensor($object: sensor_insert_input = {}) {
                    insert_sensor_one(object: $object) {
                        id_sensor
                    }
                }
                `"
                :variables="{
                    object: {
                        id_gh: idGreenhouse,
                        soil_moisture: soil_moisture,
                        light_brightness: ldr,
                        humidity: dht11,
                        co2: mq135,
                        soil_temp: temp
                    }
                }"
            >
                <template v-slot="{ mutate, error}">
                <!-- Error -->
                <div v-if="error" class="error apollo">An error occurred
                    {{ error }}
                </div>
                <!-- Mutate -->
                <div v-if="subcribeData == true"
                >
                    {{mutate()}}
                    {{changeActive()}}
                </div>  
                </template>
            </ApolloMutation>  
        </div>
    </v-container>

</template>

<script>
import SensorCard from "@/components/SensorCard.vue"
import AktuaktorCard from "@/components/AktuaktorCard.vue"
import GreenhouseOption from '../components/GreenhouseOption.vue'
import Location from "@/components/Location.vue"
import SetEnv from "@/components/SetEnvironment"

export default {
    setup() {
        
    },
    data() {
        return {
            soil_moisture: 0,
            temp: 0,
            ldr: 0,
            dht11: 0,
            mq135: 0,
            idGreenhouse: 0,
            subcribeData: false,
        }
    },
    components:{
        SensorCard,
        AktuaktorCard,
        GreenhouseOption,
        Location,
        SetEnv,
    },
    methods:{
        changeActive(){
            this.subcribeData = false;
        }
    },
    mqtt: {
    /** 'VueMqtt/#' or 'VueMqtt/+' or '+/+' or '#' */
    'greenhouseVidi/+' (data, topic) {
      if (topic.split('/').pop() === 'Publish2') {
        console.log('topic:', 'greenhouseVidi/Publish2');
      }
      this.subMqtt = data + '';
      let arr = this.subMqtt.split(';');
      // The array
      this.soil_moisture = arr[0];
      this.temp = arr[1];
      this.ldr = arr[2];
      this.dht11 = arr[3];
      this.mq135 = arr[4];
      this.idGreenhouse = arr[5];
      this.subcribeData = true;
      console.log('bool:', this.subcribeData);
        }
    }
}
</script>