<template>
  <div>
    <h1>Component Zone</h1>
    <h1>{{name}}</h1>
    <v-card-actions>
          <v-btn color="blue" @click="callMain()" class="btn">callmain</v-btn>
        </v-card-actions>
  </div>
</template>

<script>
import { EventBus } from '@/EventBus'
export default {
    props:['name'],
    methods:{
        callMain(){
            // this.$emit('display')
            EventBus.$emit('test1')
        }
    }
}
</script>

<style>

</style>