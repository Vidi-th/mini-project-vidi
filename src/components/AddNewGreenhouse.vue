<template>
    <v-container>
        <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
            >
            <template v-slot:activator="{on}">
                <v-btn
                v-on="on"
                >
                <v-icon>mdi-home-automation</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                <span class="text-h5">Add New Greenhouse Environment</span>
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-text-field
                        label="Greenhouse Name"
                        v-model="greenhouse_name"
                        hint="GH_Surabaya"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-text-field
                        label="Address"
                        v-model="greenhouse_address"
                        hint="Jl. Sumatra No.14 Madiun"
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
                    @click="dialog = false"
                >
                    Close
                </v-btn>
                <ApolloMutation
                :mutation="gql => gql`
                    mutation MyMutation($nama: String!, $alamat: String!) {
                        insert_green_house_one(object: {name_gh: $nama, adress_gh: $alamat}) {
                            name_gh
                            adress_gh
                        }
                    }
                `"
                :variables="addGH"
                >
                <template v-slot="{ mutate, error}">
                <!-- Error -->
                <div v-if="error" class="error apollo">An error occurred
                    {{ error }}
                </div>
                <!-- Mutate -->
                    <v-btn
                        color="#94B447"
                        text
                        @click="mutate(); dialog = false;"
                    >
                        Save
                    </v-btn>
                </template>
                </ApolloMutation>
                </v-card-actions>
            </v-card>
            </v-dialog>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        dialog: false,
        greenhouse_name :"",
        greenhouse_address :"",
    }),
    computed:{
        addGH(){
            return{
                nama: this.greenhouse_name,
                alamat: this.greenhouse_address
            }
        },
    }
}
</script>