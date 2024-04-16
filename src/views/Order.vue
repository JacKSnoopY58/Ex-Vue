<template>
    <div>
        <h1>Apicon Employee</h1>

        <v-row>
            <v-col cols="3" v-for="(item, index) in apidata" :key="index">
                <v-img :src="item.img" height="300" />
                <v-img :src="'http://localhost:3000/images/' + item.Image" height="250" width="250"></v-img>
                <v-card-title primary-title>
                    {{ item.Pname }}
                </v-card-title>
                <!-- <div>
                    <v-btn icon @click="decrementQuantity">
                        <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <span>{{ quantity }}</span>
                    <v-btn icon @click="incrementQuantity">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </div> -->

                <v-card-actions>
                    <!-- <v-btn color="green" @click="Addproduct(item)">Add Product</v-btn> -->

                    <!-- <v-btn color="red" @click="deleteItem(item)">Delete</v-btn> -->
                </v-card-actions>


            </v-col>
        </v-row>


    </div>
</template>

<script>
import Cookies from 'js-cookie';

export default {
    data() {
        return {
            token: Cookies.get('token'),
            id: '',
            quantity: 1,
            apidata: [],
            // role: '',
            dialogedit: false,
            dialogDelete: false,
            postdata: {
                _id: '',
                Pname: '',
                price: '',
                stock: '',
                image: null
            },
            postdata2: {
                Pname: '',
                price: '',
                stock: '',
                image: null
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
        incrementQuantity() {
            this.quantity++;
        },
        decrementQuantity() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        },

        getData() {
            console.log(this.token)
            this.axios.get('http://localhost:3000/api/v1/orders', {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
                .then(response => {
                    this.apidata = response.data.data;
                    console.log(this.apidata)
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        async Addproduct(item) {
            this.postdata = { ...item }; 
            // console.log(this.quantity);
            console.log(this.postdata);
            try {
                const response = await this.axios.post(
                    'http://localhost:3000/api/v1/product/addcart',
                    {
                        productId: this.postdata._id,
                        Amount: this.quantity
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${this.token}`
                        }
                    }
                );

                console.log(response.data);
                this.getData();

                this.postdata = { ...this.postdata2 };
                this.dialogedit = false; 
            } catch (error) {
                console.error(error);
            }
        },
        closeItem(item) {
            this.id = item._id;
            this.postdata = { ...item };
            this.dialogedit = false;
        },

        toggleName() {
            this.$refs.fileInput.value = '';
            this.postdata = { ...this.postdata2 };
            this.dialogedit = !this.dialogedit;
        },

        cancleDelete() {
            this.dialogDelete = !this.dialogDelete;
        },
        saveSelect() {
            if (this.id !== '') {
                alert('update');
            } else {
                alert('new item');
            }
        }
    }
}
</script>

<style></style>
