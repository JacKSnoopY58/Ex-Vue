<template>
    <v-container>
        <v-card>
            <v-card-title>Order List</v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y
                            min-width="290px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="selectedDate" label="Select Date" prepend-icon="mdi-calendar"
                                    readonly v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="selectedDate" @input="menu = false"></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="12" md="2">
                        <v-btn @click="clearDate">Clear Date</v-btn>
                    </v-col>
                </v-row>
                <v-data-table :headers="headers" :items="filteredOrders" class="elevation-1">
                    <template v-slot:items="props">
                        <td class="pl-4" :key="props.item._id">{{ props.item._id }}</td>
                        <td :key="props.item._id + 'userId'">{{ props.item.userId }}</td>
                        <td :key="props.item._id + 'total'">{{ props.item.total }}</td>
                        <td :key="props.item._id + 'orderDate'">{{ props.item.orderDate }}</td>
                    </template>
                </v-data-table>
            </v-card-text>
            <v-card-actions>
                <div v-if="selectedDate">Daily Total Sum: {{ dailyTotalSum(new Date(selectedDate)) }}</div>
                <div v-else>All Total: {{ totalSum }}</div>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
import Cookies from 'js-cookie';
import { format } from 'date-fns';

export default {
    data() {
        return {
            token: Cookies.get('token'),
            orders: [],
            selectedDate: null,
            menu: false,
            headers: [
                { text: 'ID', value: '_id' },
                { text: 'User ID', value: 'userId' },
                { text: 'Total', value: 'total' },
                { text: 'Date Time', value: 'orderDate' },
            ],
        };
    },
    created() {
        this.fetchOrders();
    },
    methods: {
        fetchOrders() {
            this.axios.get('http://localhost:3000/api/v1/orders', {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
                .then(response => {
                    this.orders = response.data.data.map(order => ({
                        ...order,
                    }));
                })
                .catch(error => {
                    console.error('Error fetching orders:', error);
                });
        },
        clearDate() {
            this.selectedDate = null;
        },
        dailyTotalSum(date) {
            const ordersOnDate = this.orders.filter(order => {
                const orderDate = new Date(order.orderDate).toLocaleDateString();
                return orderDate === date.toLocaleDateString();
            });
            return ordersOnDate.reduce((total, order) => total + order.total, 0);
        },
        formatDate(date) {
            console.log(date);
            return format(new Date(date), 'dd/MM/yyyy');
        }
    },
    computed: {
        totalSum() {
            return this.orders.reduce((total, order) => total + order.total, 0);
        },
        filteredOrders() {
            if (!this.selectedDate) return this.orders;
            return this.orders.filter(order => {
                const orderDate = new Date(order.orderDate).toLocaleDateString();
                const selectedDate = new Date(this.selectedDate).toLocaleDateString();
                return orderDate === selectedDate;
            });
        }
    }
}
</script>

<style></style>
