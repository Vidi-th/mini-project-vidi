<template>
    <v-container>
        
        <ApolloQuery 
        :query="gql => gql`
            query MyQuery($nama: String!) {
                green_house(where: {nama: {_eq:$nama}}) {
                    Alamat
                }
                }
        `"
        :variables="greenhouseComputed"
      >

      <template v-slot="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occurred
          {{ error }}
        </div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">
            <div v-if="data.green_house !=''">
                <div v-for="(item,index) in data.green_house" :key="index">
                    {{item.Alamat}}
                </div>
            </div>
            <div v-else>{{"Pilih Green House Dahulu"}}</div>
        </div>
        <!-- No result -->
        <div v-else class="no-result apollo">Pilih Green House Dahulu</div>
      </template>
      <ApolloSubscribeToMore
        :document="
          (gql) => gql`
            subscription MySubscription {
              green_house {
                nama
                id
              }
            }
          `
        "
        :updateQuery="onUpdated"
      />
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
    },

    computed:{
        greenhouseComputed(){
            if(this.greenhouseStore == ""){
                return {nama: "tidakada"}
            }
            return {nama: this.greenhouseStore}
        },

        greenhouseStore(){
            return this.$store.state.selectGH;
        }
    },
}
</script>