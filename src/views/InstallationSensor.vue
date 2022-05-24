<template>
    <v-container fluid>
        <div
        class="d-flex justify-start mb-8"
        >
            <h1 class="order-1 mx-auto"> INSTALLATION NODE SENSOR</h1>
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
        
        <div class="text-h5"> 1. Arrange the electrical circuit as shown below</div>
        
        <v-card class="ma-10">
            <v-img
              src="@/assets/Node_Module.jpg"
              height="600"
              contain
              class="grey darken-4 "
            ></v-img>
            <v-card-title class="text-h6 mx-auto">
              Picture 1. electrical circuit with ESP-32 Microcontroller
            </v-card-title>
        </v-card>
        
        <div class="text-h5"> 2. Download the following link and open with arduino ide app</div>
        <v-btn
        :loading="loading"
        :disabled="loading"
        href="https://github.com/Vidi-th/HardwareTA/archive/refs/heads/main.zip"
        color="blue-grey"
        class="ma-6 white--text"
        @click="loader = 'loading'"
        >
        Download Source Code
            <v-icon
                right
                dark
            >
                mdi-cloud-upload
            </v-icon>
        </v-btn>

        <div class="text-h5"> 3. Change the greenhouse variable in the code</div>
        <v-card class="ma-10">
            <v-img
              src="@/assets/editSetupGH.jpg"
              height="600"
              contain
              class="grey darken-4 "
            ></v-img>
            <v-card-title class="text-h6 mx-auto">
              Picture 2. Microcontroller code for setting up greenhouse
            </v-card-title>
        </v-card>

        <div class="text-h5"> 4. Change the node sensor variable in the code</div>
        <v-card class="ma-10">
            <v-img
              src="@/assets/editSetupNodes.jpg"
              height="600"
              contain
              class="grey darken-4 "
            ></v-img>
            <v-card-title class="text-h6 mx-auto">
              Picture 2. Microcontroller code for setting up node sensor
            </v-card-title>
        </v-card>

        <div class="text-h5 mb-15"> 5. Upload the code to ESP-32 microcontroller and check the dashboard</div>
    </v-container>
</template>

<script>
  export default {
    data () {
      return {
        loader: null,
        loading: false,
      }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      },
    },
  }
</script>