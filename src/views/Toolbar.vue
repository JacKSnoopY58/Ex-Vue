<template>
  <div>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img alt="Vuetify Logo" class="shrink mr-2" contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40" />

        <router-link to="/apicon">
          <v-img alt="Home Page" class="shrink mt-1 hidden-sm-and-down" contain min-width="100"
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png" width="100" />
        </router-link>
      </div>

      <v-spacer></v-spacer>
      <v-btn target="_blank" text>
        <span class="mr-2" @click="order()">Order</span>
        <!-- <v-icon>mdi-open-in-new</v-icon> -->
      </v-btn>
      <v-btn target="_blank" text>
        <span class="mr-2" @click="cart()">Cart</span>
        <!-- <v-icon>mdi-open-in-new</v-icon> -->
      </v-btn>
      
      <v-btn target="_blank" text>
        <span class="mr-2" @click="logout()">Logout</span>
        <!-- <v-icon>mdi-open-in-new</v-icon> -->
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {

  methods: {
    
    logout() {
      Cookies.remove('token')
      this.$router.push('/login');
    },
    cart(){
      this.$router.push('/cart');
    },
    order(){
      this.$router.push('/order');
    }
  }
}
</script>

<style></style>