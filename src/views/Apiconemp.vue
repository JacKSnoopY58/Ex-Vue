<template>
    <div>
        <h1>Apicon Employee</h1>

        <v-row>
            <v-col cols="3" v-for="(item, index) in apidata" :key="index">
                <v-img :src="'http://localhost:3000/images/' + item.Image" height="250" width="250"></v-img>
                <v-card-title primary-title>
                   ProductName:  {{ item.Pname }} <br>
                   Stock: {{ item.stock }}
                </v-card-title>
                <div>
                    <v-btn icon @click="decrementQuantity(index)">
                        <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <span>{{ quantities[index] }}</span>
                    <v-btn icon @click="incrementQuantity(index)">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
      
                </div>

                <v-card-actions>
                    <v-btn color="green" @click="addProduct(item, index)">Add Product</v-btn>
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
            quantities: [],
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

        incrementQuantity(index) {
            this.$set(this.quantities, index, (this.quantities[index] || 0) + 1);
        },
        decrementQuantity(index) {
            if (this.quantities[index] && this.quantities[index] > 1) {
                this.$set(this.quantities, index, this.quantities[index] - 1);
            }
        },

        getData() {
            console.log(this.token)
            this.axios.get('http://localhost:3000/api/v1/product', {
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
        async addProduct(item, index) {
            const quantity = parseInt(this.quantities[index]);
            console.log(item._id);
            console.log(quantity)
            try {
                const response = await this.axios.post(
                    'http://localhost:3000/api/v1/product/addcart',
                    {
                        productId: item._id,
                        Amount: quantity
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
                this.$set(this.quantities, index, 0);
            } catch (error) {
                console.error('Error adding product:', error);
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
