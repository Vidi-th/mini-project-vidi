<template>
    <v-container>
      <div>{{sensorNow()}}</div>
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
    </v-container>
</template>

<script>
export default {
    data() {
    return {
      modeBulb: false,
    };
  },
  methods: {
    sensorNow(){
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
    lightFromStore(){
      return this.$store.state.lightNow;
    },
    tempFromStore(){
      return this.$store.state.tempNow;
    },
  }
}
</script>