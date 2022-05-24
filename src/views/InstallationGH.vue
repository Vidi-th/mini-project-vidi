<template>
    <v-container fluid>
        <div
        class="d-flex justify-start mb-8"
        >
            <h1 class="order-1 mx-auto"> INSTALLATION GREEN HOUSE</h1>
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
            </v-card>
        </div>

        <div class="text-h5"> 1. Press the greenhouse icon as shown in the following picture</div>
        <v-card class="ma-10">
            <v-img
              src="@/assets/AddNewGH.jpg"
              height="600"
              contain
              class="grey darken-4 "
            ></v-img>
            <v-card-title class="text-h6 mx-auto">
              Picture 1. Greenhouse icon in dashboard page
            </v-card-title>
        </v-card>

        <div class="text-h5"> 2. Fill in the form according to the request</div>
        <v-card class="ma-10">
            <v-img
              src="@/assets/FormAddGH.png"
              height="600"
              contain
              class="grey darken-4 "
            ></v-img>
            <v-card-title class="text-h6 mx-auto">
              Picture 2. Greenhouse form in dashboard page
            </v-card-title>
        </v-card>

        <div class="text-h5"> 3. Greenhouse has been added to the database, then please do the hardware installation</div>
        <v-btn
        color="blue-grey"
        class="ma-6 white--text"
        @click="press('InstallSensor')"
        >
        Go To Installation Sensor
            <v-icon
                right
                dark
            >
                mdi-arrow-right-bold
            </v-icon>
        </v-btn>

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