<template>
  <div>
    <h1>Apicon Page</h1>
    <h1>{{ apidata }}</h1>
    <v-btn color="success" @click="getData()">call api</v-btn>
  </div>
</template>

<script>
export default {
data(){
    return{
        apidata: []
    }
},
    methods:{
        getData(){
            this.axios.get('http://localhost:3000/api/v1/orders').then((response) => {
                console.log('data: ',response.data.data)
                this.apidata = response.data.data;
            })
        }
    }
}
</script>

<style>

</style>