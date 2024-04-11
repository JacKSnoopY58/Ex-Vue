<template>
    <div>
      <h1>Apicon Page</h1>
  
      <v-row>
        <v-col cols="3" v-for="(item, index) in apidata" :key="index">
          <v-img :src="item.img" height="300"/>
          <v-img src="https://www.the-sun.com/wp-content/uploads/sites/6/2023/10/www-instagram-com-monkeycatluna-hl-851711797.jpg" height="250" width="250"></v-img>
          <v-card-title primary-title>
            {{ item.Pname }}
          </v-card-title>
          <v-card-actions>
            <v-btn color="blue" @click="editItem(item)">Edit</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
  
      <v-dialog v-model="dialogedit" max-width="500px">
        <v-card>
          <v-card-title>
            {{ savemode }}
          </v-card-title>
          <v-col cols="6">
            <v-text-field
              name="Productname"
              label="Productname"
              id="Productname"
              v-model="postdata.Pname">
            </v-text-field>
  
            <v-text-field
              name="Productprice"
              label="Productprice"
              id="price"
              v-model="postdata.price">
            </v-text-field>  
          </v-col>
          <v-btn color="success" @click="displayAlert(postdata.Pname)">Save</v-btn>
          <v-btn color="red" @click="toggleName()">Cancel</v-btn>
        </v-card>
      </v-dialog>
  
      <v-btn color="success" @click="getData()">Call API</v-btn>
      <v-btn color="success" @click="newItem()">Create</v-btn>
        
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        id:'',
        apidata: [],
        dialogedit: false, 
        postdata: {
          Pname: '',
          price: '',
          stock: ''
        },
        postdata2: {
          Pname: '',
          price: '',
          stock: ''
        },
      };
    },
    computed: {
      savemode() {
        return this.id === '' ? 'NewItem' : 'Edit Item';
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        this.axios.get('http://localhost:3000/api/v1/product')
          .then(response => {
            console.log('data:', response.data.data);
            this.apidata = response.data.data;
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      },
      newItem() {
        this.id = '';
        this.postdata = { ...this.postdata2};
        this.dialogedit = true;
      },
      editItem(item) {
        this.id = item._id;
        this.postdata = { ...item};
        this.dialogedit = true;
      },
      closeItem(item) {
        this.id = item._id;
        this.postdata = { ...item};
        this.dialogedit = false;
      },
      displayAlert(username) {
        alert(username);
      },
      toggleName() {
        this.dialogedit = !this.dialogedit;
      },
      saveSelect () {
        if (this.id !== '') {
          alert('update');
        } else {
          alert('new item');
        }
      }
    }
  }
  </script>
  
  <style>
  </style>
  