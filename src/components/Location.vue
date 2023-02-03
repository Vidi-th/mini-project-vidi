<template>
    <v-container>
        
        <ApolloQuery 
        :query="gql => gql`
            query AdressGH($nama: String!) {
                green_house(where: {name_gh: {_eq:$nama}}) {
                    id
                    adress_gh
                }
            }
        `"
        :variables="greenhouseComputed"
      >

      <template v-slot="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">Pilih Green House Dahulu
        </div>

        <!-- Result -->
        <div v-else-if="data.green_house" class="result apollo">
            <div v-if="data.green_house !=''">
                <div v-for="(item,index) in data.green_house" :key="index">
                    {{item.adress_gh}}
                </div>
            </div>
        </div>
        <!-- No result -->
        <div v-else class="no-result apollo">Pilih Green House Dahulu</div>
      </template>
      </ApolloQuery>

    </v-container>
</template>

<script>

export default {
    components: {

    },

    data() {
        return {

        };
    },

    methods: {
        onUpdated(previousResult, { subscriptionData }) {
            return {
                green_house: subscriptionData.data.green_house
            }
        },
        changeIdGH(param){
            this.$store.dispatch('selectIdGH', param);
        },
    },

    computed:{
        greenhouseComputed(){
            if(this.greenhouseStore == null){
                return {nama: "belumdiinput"}
            }
            return {nama: this.greenhouseStore}
        },

        greenhouseStore(){
            return this.$store.state.selectGH;
        }
    },
}
</script>