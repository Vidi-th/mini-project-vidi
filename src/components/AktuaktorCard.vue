<template>
    <v-container>
        <div
        class="d-flex justify-center mb-12"
        >
            <v-spacer class="order-1 pa-2"></v-spacer>

            <div class="order-2 pa-2">
                <div>{{kranNow()}}</div>
                <v-img
                v-if="modeKran == true"
                alt="IoT Greenhouse Card"
                contain
                src="@/assets/KranOpen.png"
                max-width="200px"
                />

                <v-img
                v-if="modeKran == false"
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

            <div class="order-6 pa-2">
                <div>{{bulbNow()}}</div>
                <v-img 
                v-if="modeBulb"
                alt="IoT Greenhouse Card"
                contain
                src="@/assets/mist-maker1.png"
                max-width="200px"
                />

                <v-img v-if="!modeBulb"
                alt="IoT Greenhouse Card"
                contain
                src="@/assets/mist-maker1.png"
                max-width="200px"
                />
            </div>
            <v-spacer class="order-7 pa-2"></v-spacer>

            <div class="order-8 pa-2">
                <div>{{bulbNow()}}</div>
                <v-img 
                v-if="modeBulb"
                alt="IoT Greenhouse Card"
                contain
                src="@/assets/fan_vector.png"
                max-width="200px"
                />

                <v-img v-if="!modeBulb"
                alt="IoT Greenhouse Card"
                contain
                src="@/assets/fan_vector.png"
                max-width="200px"
                />
            </div>
            <v-spacer class="order-9 pa-2"></v-spacer>
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
      if((this.tresholdMoist) > (this.moistFromStore) && (this.tresholdHumidity) > (this.humidityFromStore)){
        this.modeKran = true;
      }
      else {this.modeKran = false;}
    },
    bulbNow(){
      if((this.tresholdLight) > (this.lightFromStore) && (this.tresholdTemp) > (this.tempFromStore)){
        this.modeBulb = true;
      }
      else {this.modeBulb = false;}
    },
  },
  computed: {
    tresholdMoist(){
      return this.$store.state.tresholdMoist;
    },
    tresholdLight(){
      return this.$store.state.tresholdLight;
    },
    tresholdHumidity(){
      return this.$store.state.tresholdHumidity;
    },
    tresholdTemp(){
      return this.$store.state.tresholdTemp;
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