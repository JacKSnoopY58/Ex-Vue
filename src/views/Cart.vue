<template>
    <div class="slip-container">
        <div class="slip-header">
            <h1>Apicon Employee</h1>
        </div>
        <div class="slip-body">
            <v-row>
                <v-col cols="12" sm="6" md="4" lg="3" v-for="(item, index) in apidata" :key="index">
                    <v-card class="slip-card">
                        <v-img :src="'http://localhost:3000/images/' + item.Pimg" height="150" width="150"></v-img>
                        <v-card-title class="slip-card-title">
                            Product Name: {{ item.Pname }}<br>
                            Qty: {{ item.Amount }}<br>
                            Price: {{ item.price }}<br>
                            Total Price: {{ getTotalPrice(item.Amount, item.price) }}
                        </v-card-title>
                        <v-card-actions class="delete-btn">
                            <v-btn color="red" @click="Deleteproduct(item)" small>Delete</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </div>
        <div class="slip-footer">
            <div>Total Bill Price: {{ getTotalBillPrice() }}</div>
            <v-btn color="green" @click="Confirm()">Confirm Payment</v-btn>
        </div>
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
            this.axios.get('http://localhost:3000/api/v1/products/carts', {
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
        async Deleteproduct(item) {
            this.postdata = { ...item };

            console.log(this.postdata);
            try {
                const response = await this.axios.delete(
                    'http://localhost:3000/api/v1/product/carts/' + this.postdata._id,
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

        async Confirm() {
            try {
                const response = await this.axios.post(
                    'http://localhost:3000/api/v1/product/confirmorder',
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    }
                );
                console.log(response.data);
                this.$router.push('/apiconemp');
            } catch (error) {
                console.error(error);
                
            }
        },
                getTotalPrice(quantity, price) {
            return quantity * price;
        }, 
        getTotalBillPrice() {
            let totalBillPrice = 0;
            for (const item of this.apidata) {
                totalBillPrice += this.getTotalPrice(item.Amount, item.price);
            }
            return totalBillPrice;
        }
    }
}
</script>

<style>
.slip-container {
    max-width: 600px;
    /* Adjust as needed */
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
}

.slip-header {
    text-align: center;
    margin-bottom: 20px;
}

.slip-body {
    margin-bottom: 20px;
}

.slip-card {
    margin-bottom: 20px;
    text-align: center;
    /* Center align content */
}

.slip-card-title {
    font-size: 12px;
    /* Reduce font size */
    line-height: 1.5;
    /* Increase line height */
}

.delete-btn {
    justify-content: center;
}
</style>