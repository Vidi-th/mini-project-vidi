<template>
    <v-container fluid>
        <div
        class="d-flex justify-start mb-8"
        >
            <h1 class="order-1 mx-auto"> INSTALLATION </h1>
        </div>
        <div
        class="d-flex justify-center mb-6"
        >
            <v-card
                class="order-1 mx-auto"
                max-width="400"
            >
                <v-img
                class="white--text align-end"
                height="290px"
                src="@/assets/GreenHouseCard.png"
                >
                </v-img>

                <v-card-subtitle class="pb-0">
                INSTALLATION NEW GREENHOUSE
                </v-card-subtitle>

                <v-card-text class="text--primary">
                <div>contains steps for adding a greenhouse in the database </div>

                <div>and also settings on the sensor node</div>
                </v-card-text>

                <v-card-actions>
                <v-btn
                    color="#94B447"
                    text
                    @click="press('InstallGH')"
                >
                    Explore
                </v-btn>
                </v-card-actions>
            </v-card>

            <v-card
                class="order-2 mx-auto"
                max-width="400"
            >
                <v-img
                class="white--text align-end"
                height="290px"
                src="@/assets/iot-sensor-icon.png"
                >
                </v-img>

                <v-card-subtitle class="pb-0">
                INSTALLATION NEW NODE SENSOR
                </v-card-subtitle>

                <v-card-text class="text--primary">
                <div>contains steps for adding sensor nodes  </div>

                <div>by setting the setup on the ESP32 code</div>
                </v-card-text>

                <v-card-actions>
                <v-btn
                    color="#94B447"
                    text
                    @click="press('InstallSensor')"
                >
                    Explore
                </v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </v-container>
</template>

<script>
export default {
    methods :{
      press(path){
          console.log(path)
      this.$router.push({name: path})
    }
  },
}
</script>