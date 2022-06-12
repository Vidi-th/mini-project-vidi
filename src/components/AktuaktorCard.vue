<template>
    <v-container>
        <div
        class="d-flex justify-center mb-12"
        >
            <v-spacer class="order-1 pa-2"></v-spacer>

            <div class="order-2 pa-2">
                <div>{{kranNow()}}</div>
                <v-img
                v-if="modeKran"
                alt="IoT Greenhouse Card"
                contain
                src="@/assets/KranOpen.png"
                max-width="200px"
                />

                <v-img
                v-if="!modeKran"
                alt="IoT Greenhouse Card"
                contain
                src="@/assets/KranClose.png"
                max-width="200px"
                />
            </div>

            <v-spacer class="order-3 pa-2"></v-spacer>

            <div class="order-4 pa-2">
                <div>{{bulbNow()}}</div>
                <v-img 
                v-if="modeBulb"
                alt="IoT Greenhouse Card"
                contain
                src="@/assets/BulbOn.png"
                max-width="200px"
                />

                <v-img v-if="!modeBulb"
                alt="IoT Greenhouse Card"
                contain
                src="@/assets/BulbOff.png"
                max-width="200px"
                />
            </div>

            <v-spacer class="order-5 pa-2"></v-spacer>
        </div>
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      modeKran: false,
      modeBulb: false,
    };
  },
  methods: {
    kranNow(){
      if((this.tresholdFromStore[0].soil_moist) > (this.moistFromStore) && (this.tresholdFromStore[0].humidity) > (this.humidityFromStore)){
        this.modeKran = true;
      }
      else {this.modeKran = false;}
    },
    bulbNow(){
      if((this.tresholdFromStore[0].light) > (this.lightFromStore) && (this.tresholdFromStore[0].temp) > (this.tempFromStore)){
        this.modeBulb = true;
      }
      else {this.modeBulb = false;}
    },
  },
  computed: {
    tresholdFromStore(){
      return this.$store.state.treshold;
    },
    humidityFromStore(){
      return this.$store.state.humidityNow;
    },
    moistFromStore(){
      return this.$store.state.moistNow;
    },
    lightFromStore(){
      return this.$store.state.lightNow;
    },
    tempFromStore(){
      return this.$store.state.tempNow;
    },
  },
}
</script>