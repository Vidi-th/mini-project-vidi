<template>
    <v-container>
      <div>{{sensorNow()}}</div>
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
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      modeKran: false,
    };
  },
  methods: {
    sensorNow(){
      if((this.tresholdFromStore[0].soil_moist) > (this.moistFromStore) && (this.tresholdFromStore[0].humidity) > (this.humidityFromStore)){
        this.modeKran = true;
      }
      else {this.modeKran = false;}
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
  },
}
</script>