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
    components:{
        SensorCard,
        AktuaktorCard,
        GreenhouseOption,
        Location,
        SetEnv,
    },
    
}
</script>