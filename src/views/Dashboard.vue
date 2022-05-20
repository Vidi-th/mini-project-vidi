<template>
    <v-container fluid>
        <div
        class="d-flex justify-start mb-4"
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


            <div class="order-4 pa-2">
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    class="order-3 pa-2"
                    v-bind="attrs"
                    v-on="on"
                    >
                    <v-icon>mdi-bell-badge</v-icon>
                    </v-btn>
                    <v-btn
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-icon>mdi-home-automation</v-icon>
                        <span class="mr-2">GH Surabaya</span>
                    </v-btn>
                </template>
                <v-list>
                <v-list-item
                    v-for="(item, index) in itemGH"
                    :key="index"
                >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
                </v-list>
            </v-menu>
            </div>
            </v-toolbar>
        </div>

        <v-icon>mdi-map-marker-radius</v-icon>
        <span>{{"Bumi Marina Emas"}}</span>

        <div
        class="d-flex justify-center mb-12"
        >
            <v-spacer class="order-1 pa-2"></v-spacer>
            
            <v-card class="order-2 pa-2">
                <v-img
                    alt="IoT Soil Moisture"
                    class="white--text align-start"
                    contain
                    src="@/assets/card.jpg"
                    transition="scale-transition"
                    max-width="450px">
                        <v-card-title> Soil Moisture</v-card-title>
                </v-img>
            </v-card>

            <v-spacer class="order-3 pa-2"></v-spacer>

            <v-card class="order-4 pa-2 ">
                <v-img
                alt="IoT Light Brightness"
                class="white--text align-start"
                contain
                src="@/assets/card.jpg"
                transition="scale-transition"
                max-width="450px">
                    <v-card-title> Light Brightness</v-card-title>
                </v-img>
            </v-card>
            <v-spacer class="order-5 pa-2"></v-spacer>
        </div>
        <div
        class="d-flex justify-center mb-6"
        >
            <v-spacer class="order-1 pa-2"></v-spacer>

            <div class="order-2 pa-2">
                <v-img
                alt="IoT Humidity"
                class=" white--text align-center"
                contain
                src="@/assets/card3.jpg"
                transition="scale-transition"
                max-width="250px"
                >
                    <v-card-title> Humidity </v-card-title>
                </v-img>
            </div>

            <v-spacer class="order-3 pa-2"></v-spacer>

            <div class="order-4 pa-2">
                <v-img
                alt="IoT CO2"
                class="white--text align-center"
                contain
                src="@/assets/card3.jpg"
                transition="scale-transition"
                max-width="250px"
                >
                    <v-card-title> CO2 </v-card-title>
                </v-img>
            </div>

            <v-spacer class="order-5 pa-2"></v-spacer>

            <div class="order-6 pa-2">
                <v-img
                alt="IoT Greenhouse Card"
                class="white--text align-center"
                contain
                src="@/assets/card3.jpg"
                transition="scale-transition"
                max-width="250px"
                >
                    <v-card-title> Soil</v-card-title>
                    <v-card-title> Temperature</v-card-title>
                </v-img>
            </div>
            <v-spacer class="order-7 pa-2"></v-spacer>
        </div>
        <div
        class="d-flex justify-center mb-12"
        >
            <v-spacer class="order-1 pa-2"></v-spacer>
            <v-img
            alt="IoT Greenhouse Card"
            class="order-2 pa-2"
            contain
            src="@/assets/KranOpen.png"
            transition="scale-transition"
            max-width="200px"
            />
            <v-spacer class="order-3 pa-2"></v-spacer>
            <v-img
            alt="IoT Greenhouse Card"
            class="order-4 pa-2"
            contain
            src="@/assets/BulbOn.png"
            transition="scale-transition"
            max-width="200px"
            />
            <v-spacer class="order-5 pa-2"></v-spacer>
        </div>
    </v-container>

</template>

<script>
export default {
    setup() {
        
    },
    data: () => ({
        itemGH: [
            { title: 'GH Surabaya' },
            { title: 'GH Madiun' },
            { title: 'Add New +' },
        ],
    }),
}
</script>