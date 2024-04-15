<template>
    <div class="main" :style="mainStyle">
        <h1>Welcome!</h1>
        <input type="text" v-model="logindata.username" placeholder="UserName" :style="inputStyle" />
        <br />
        <input type="password" v-model="logindata.password" placeholder="Password" :style="inputStyle" />
        <br />
        <input type="button" value="Done!" class="button" id="done" :style="inputStyle" @click="login" />
        <br />
    </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
    name: "Login",
    props: {
        mainStyle: String,
        inputStyle: String,
    },
    data() {
        return {
 
            logindata: {
                username: '',
                password: '',

            },
        };
    },
    methods: {
        async login() {
            console.log("Username:", this.logindata.username);
            console.log("Password:", this.logindata.password);

            try {
                const { data } = await this.axios.post('http://localhost:3000/api/v1/login',
                    {
                        username: this.logindata.username,
                        password: this.logindata.password,
                    }
                );
                
                Cookies.set('token', data.token);
                if(data.role === 'admin'){
                    this.$router.push('/Apicon');
                }
                
            } catch (error) {
                console.log(error);

            }
        },
    },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

.main {
    background: rgba(255, 255, 255, 0.4);
    position: absolute;
    top: 20%;
    left: 30%;
    width: 40%;
    text-align: center;
    padding: 5px;
    border-radius: 3rem;
    box-shadow: 0px 0px 8px -5px #000000;
    padding-top: 3%;
    padding-bottom: 5%;
    font-family: "Poppins", sans-serif;
}

h1 {
    cursor: default;
    user-select: none;
}

input {
    border-radius: 3rem;
    border: none;
    padding: 10px;
    text-align: center;
    outline: none;
    margin: 10px;
    width: 30%;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
}

input:hover {
    box-shadow: 0px 0px 8px -5px #000000;
}

input:active {
    box-shadow: 0px 0px 8px -5px #000000;
}

#done {
    background: lightgreen;
}

.button {
    cursor: pointer;
    user-select: none;
}

img {
    height: 2.2rem;
    margin: 10px;
    user-select: none;
}

img:hover {
    box-shadow: 0px 0px 8px -5px #000000;
    cursor: pointer;
    border-radius: 200rem;
}
</style>
