<template>
    <v-container>
        <div
        class="d-flex justify-center mb-12"
        >
            <v-spacer class="order-1 pa-2"></v-spacer>

            <div class="order-2 pa-2">
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
                <v-row
                  align="center"
                  justify="space-around"
                >
                  <v-btn
                    tile
                    color="success"
                    @click="dialog1 = true"
                  >
                    <v-icon left>
                      mdi-pencil
                    </v-icon>
                    Edit Delay
                  </v-btn>
                </v-row>
            </div>
            <v-dialog
            v-model="dialog1"
            persistent
            max-width="600px"
            >
            <v-card>
                <v-card-title>
                <span class="text-h5">Edit Delay for Actuactor</span>
                </v-card-title>
                <v-card-text>
                <span class="text-h7">Before</span>
                <br>
                <span class="text-h8">{{"id Greenhouse = "}}</span>
                <span class="text-h8">{{idgreenhouseStore}}</span>
                <v-container>
                    <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-text-field
                        label="Delay actuactor"
                        v-model="delay1"
                        readonly
                        ></v-text-field>
                    </v-col>
                    </v-row>
                </v-container>
                <span class="text-h7">Edit Here</span>
                <v-container>
                    <v-row>
                        <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-text-field
                        label="ID Greenhouse"
                        v-model="idGreenhouse"
                        type="number"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-text-field
                        label="Delay actuactor"
                        v-model="editDelay"
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
                    @click="dialog1 = false"
                >
                    Close
                </v-btn>
                <v-btn
                    color="#94B447"
                    text
                    @click="mutate(); dialog1 = false; resetEdit()"
                >
                    Update
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
            <v-spacer class="order-3 pa-2"></v-spacer>

            <div class="order-4 pa-2">
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
      dialog1: false,
      delay1: null,
      editDelay: null,
    };
  },
  methods: {

  },
  computed: {
    greenhouseStore(){
        return this.$store.state.selectGH;
    },
    greenhouseComputed(){
        if(this.greenhouseStore == null){
            return {nama: "tidakada"}
        }
        return {nama: this.greenhouseStore}
    },
    idgreenhouseStore(){
        return this.$store.state.selectIdGH;
    },
  },
}
</script>