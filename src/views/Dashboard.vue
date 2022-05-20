<template>
    <v-container fluid>
        <div
        class="d-flex justify-start mb-8"
        >
            <v-toolbar
            color="#E5E5E5"
            class="rounded-xl"
            >
            <v-text-field
            class="order-1 pa-2"
            label="Search Sensor"
            hide-details="auto"
            ></v-text-field>

            <v-spacer class="order-2 pa-2"></v-spacer>

            <v-btn
            class="order-3 pa-2"
            >
            <v-icon>mdi-bell-badge</v-icon>
            </v-btn>

            <div class="order-4 pa-2">
            <greenhouse-option/>
            </div>
            </v-toolbar>
        </div>

        <div
        class="d-flex justify-center mb-6"
        >
            <Location/>
            <v-spacer class="order-1 pa-2"></v-spacer>
            <v-row class="order-2 pa-2">
                <SetEnv/>
            </v-row>
        </div>
        
        <div
        class="d-flex justify-center mb-12"
        >
            <v-spacer class="order-1 pa-2"></v-spacer>
            
            <v-card class="order-2 pa-2">
                <SoilMoistCard/>
            </v-card>

            <v-spacer class="order-3 pa-2"></v-spacer>

            <v-card class="order-4 pa-2 ">
                <LightCard/>
            </v-card>
            <v-spacer class="order-5 pa-2"></v-spacer>
        </div>

        <div
        class="d-flex justify-center mb-6"
        >
            <v-spacer class="order-1 pa-2"></v-spacer>

            <div class="order-2 pa-2">
                <HumidityCard/>
            </div>

            <v-spacer class="order-3 pa-2"></v-spacer>

            <div class="order-4 pa-2">
               <CO2Card/>
            </div>

            <v-spacer class="order-5 pa-2"></v-spacer>

            <div class="order-6 pa-2">
                <SoilTempCard/>
            </div>
            <v-spacer class="order-7 pa-2"></v-spacer>
        </div>

        <div
        class="d-flex justify-center mb-12"
        >
            <v-spacer class="order-1 pa-2"></v-spacer>
            <div class="order-2 pa-2">
                <KranCard />
            </div>
            <v-spacer class="order-3 pa-2"></v-spacer>
            <div class="order-4 pa-2">
                <BulbCard />
            </div>
            <v-spacer class="order-5 pa-2"></v-spacer>
        </div>
    </v-container>

</template>

<script>
import SoilMoistCard from "@/components/SoilMoistureCard.vue"
import LightCard from "@/components/LightBrightnessCard.vue"
import HumidityCard from "@/components/HumidityCard.vue"
import CO2Card from "@/components/Co2Card.vue"
import SoilTempCard from "@/components/SoilTempCard.vue"
import BulbCard from "@/components/BulbCard.vue"
import KranCard from "@/components/KranCard.vue"
import GreenhouseOption from '../components/GreenhouseOption.vue'
import Location from "@/components/Location.vue"
import SetEnv from "@/components/SetEnvironment"

export default {
    setup() {
        
    },
    components:{
        SoilMoistCard,
        LightCard,
        HumidityCard,
        CO2Card,
        SoilTempCard,
        BulbCard,
        KranCard,
        GreenhouseOption,
        Location,
        SetEnv,
    },
    
}
</script>