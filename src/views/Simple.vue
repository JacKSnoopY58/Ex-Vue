<template>
  <div>
    <h1>Simple</h1>

    <h1 v-if="check">{{ name }}</h1>
    <v-btn color="blue" @click="toggleName">Show</v-btn>
    <v-btn color="blue" @click="displayHello">Hello</v-btn>
    <v-row>
      <v-col cols="3" v-for="(item, index) in imagestock" :key="index">
        <v-img :src="item.img" height="300" />
        <v-card-title primary-title>
          {{ item.message }}
        </v-card-title>

        <v-card-actions>
          <v-btn color="blue" @click="disPlayAlert(item.message)">Name</v-btn>
        </v-card-actions>
      </v-col>
      <simchild :name="name" />
    </v-row>
  </div>
</template>

<script>
import { EventBus } from "@/EventBus";
import simchild from "../components/SimpleChild.vue";

export default {
  components: { simchild },
  data() {
    return {
      name: "Ittikorn",
      check: true,
      imagestock: [
        {
          message: "Foo",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0ZQha6YdHqW2SKEFo9p2ltHvnDRIps-3w7Q7RAWEluw&s",
        },
        {
          message: "Bar",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGTeq1b0nqicQ4euFmdQaTN2QbYVyB2VnmO_I9gPq6Vw&s",
        },
      ],
    };
  },
  mounted() {
    EventBus.$on("test1", this.display);
  },
  beforeDestroy() {
    EventBus.$off("test1", this.display);
  },
  methods: {
    displayHello() {
      EventBus.$emit("test1");
    },
    disPlayAlert(item) {
      alert("Name: " + item);
    },
    toggleName() {
      this.check = !this.check;
    },
    display() {
      alert("Hello");
    },
  },
};
</script>

<style></style>
