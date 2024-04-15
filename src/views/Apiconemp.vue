<template>
    <div>
        <h1>Apicon Page</h1>

        <v-row>
            <v-col cols="3" v-for="(item, index) in apidata" :key="index">
                <v-img :src="item.img" height="300" />
                <v-img
                    src="http://www.the-sun.com/wp-content/uploads/sites/6/2023/10/www-instagram-com-monkeycatluna-hl-851711797.jpg"
                    height="250" width="250"></v-img>
                <v-card-title primary-title>
                    {{ item.Pname }}
                </v-card-title>
                <v-card-actions>
                    <v-btn color="blue" @click="editItem(item)">Edit</v-btn>

                    <v-btn color="red" @click="deleteItem(item)">Delete</v-btn>
                </v-card-actions>


            </v-col>
        </v-row>

        <v-dialog v-model="dialogedit" max-width="500px">
            <v-card>
                <v-card-title>
                    {{ savemode }}
                </v-card-title>
                <v-col cols="6">
                    <v-text-field name="Productname" label="Productname" id="Productname" v-model="postdata.Pname">
                    </v-text-field>

                    <v-text-field name="Productprice" label="Productprice" id="price" v-model="postdata.price">
                    </v-text-field>

                    <v-text-field name="Productstock" label="Productstock" id="stock" v-model="postdata.stock">
                    </v-text-field>
                </v-col>
                <v-btn color="success" @click="Savebutton(postdata)">Save</v-btn>
                <v-btn color="red" @click="toggleName()">Cancel</v-btn>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
                <v-card-title>
                    Delete ID: {{ postdata._id }}
                </v-card-title>
                <v-col cols="6">
                    <!-- <v-text-field name="Productname" label="Productname" id="Productname" v-model="postdata.Pname">
                    </v-text-field> -->
                    <!-- <v-card-title>
                   Product Name: {{ postdata.Pname }}
                </v-card-title> -->
                </v-col>
                <v-btn color="red" @click="deleteButton(postdata._id)">Confirm</v-btn>
                <v-btn color="blue" @click="cancleDelete()">Cancel</v-btn>
            </v-card>
        </v-dialog>

        <v-btn color="success" @click="getData2()">Call API</v-btn>
        <v-btn color="success" @click="newItem()">Create</v-btn>
    </div>
</template>

<script>
import Cookies from 'js-cookie';

export default {
    data() {
        return {
            token: Cookies.get('token'),
            id: '',
            apidata: [],
            // role: '',
            dialogedit: false,
            dialogDelete: false,
            postdata: {
                _id: '',
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
        newItem() {
            this.id = '';
            this.postdata = { ...this.postdata2 };
            this.dialogedit = true;
        },
        editItem(item) {
            this.id = item._id;
            this.postdata = { ...item };
            this.dialogedit = true;
        },
        deleteItem(item) {
            this.id = item._id;
            this.postdata = { ...item };
            this.dialogDelete = true;
        },
        closeItem(item) {
            this.id = item._id;
            this.postdata = { ...item };
            this.dialogedit = false;
        },
        async Savebutton(item) {
            this.postdata = { ...item };
            if (this.id !== '') {
                alert('update');
                console.log(this.postdata._id);
                try {
                    const { data } = await this.axios.put(
                        'http://localhost:3000/api/v1/product/' + this.postdata._id,
                        {
                            Pname: this.postdata.Pname,
                            price: this.postdata.price,
                            stock: this.postdata.stock
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${this.token}`
                            }
                        }
                    );
                    console.log(data);
                    this.getData();
                    this.dialogedit = false;
                } catch (error) {
                    console.log(error);
                }
                
            } else {
                alert('new item');
                try {
                    const { data } = await this.axios.post(
                        'http://localhost:3000/api/v1/product',
                        {
                            Pname: this.postdata.Pname,
                            price: this.postdata.price,
                            stock: this.postdata.stock
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${this.token}`
                            }
                        }
                    );
                    console.log(data);
                    this.getData();
                    this.dialogedit = false;
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async deleteButton(id) {
            console.log(id);
            try {
                const response = await this.axios.delete(
                    'http://localhost:3000/api/v1/product/' + id,
                    {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    }
                );
                console.log(response.data);
                this.getData();
                this.dialogDelete = false;
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        },
        toggleName() {
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
