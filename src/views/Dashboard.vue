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
            v-bind="attrs"
            v-on="on"
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
            <v-icon class="order-1 pa-2">mdi-map-marker-radius</v-icon>
            <span class="order-2 pa-2">{{"Bumi Marina Emas"}}</span>
            <v-spacer class="order-3 pa-2"></v-spacer>
            <v-spacer class="order-4 pa-2"></v-spacer>
            <v-row class="order-5 pa-2">
                <v-dialog
                v-model="dialog"
                persistent
                max-width="600px"
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    dark
                    v-bind="attrs"
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
                            type="number"
                            hint="75"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                            label="Humidity"
                            type="number"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                            label="CO2"
                            type="number"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                            <v-text-field
                            label="Soil Temperature"
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
                    <v-btn
                        color="#94B447"
                        text
                        @click="dialog = false"
                    >
                        Save
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
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
    },
    data: () => ({
        dialog: false,
    }),
}
</script>