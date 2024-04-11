<template>
  <v-container>
    <div class="head">
      <h1>Profile</h1>
    </div>

    <v-card class="user-card">
      <v-avatar class="image" size="250">
        <v-img :src="user.avatar" height="250" width="250"></v-img>
      </v-avatar>
     
      <v-card-text>
        <v-list>
          <v-list-item>
            <div class="item-title">ชื่อ:</div>
            <div class="item-subtitle">{{ user.name }}</div>
          </v-list-item>

          <v-list-item>
            <div class="item-title">ชื่อเล่น:</div>
            <div class="item-subtitle">{{ user.nickname }}</div>
          </v-list-item>

          <v-list-item>
            <div class="item-title">จบมาจาก:</div>
            <div class="item-subtitle">{{ user.education }}</div>
          </v-list-item>

          <v-list-item>
            <div class="item-title">สาขา:</div>
            <div class="item-subtitle">{{ user.major }}</div>
          </v-list-item>

          <v-list-item>
            <div class="item-title">งานอดิเรก:</div>
            <div class="item-subtitle">{{ user.hobby }}</div>
          </v-list-item>

          <v-list-item>
            <div class="item-title">สิ่งที่ชอบ:</div>
            <div class="item-subtitle">{{ user.like }}</div>
          </v-list-item>

          <!-- <v-list-item>
            <div class="item-title">สิ่งที่ไม่ชอบ:</div>
            <div class="item-subtitle">{{ user.hate }}</div>
          </v-list-item> -->

          <v-list-item>
            <div class="item-title">จุดเด่น:</div>
            <div class="item-subtitle">{{ user.highlights }}</div>
          </v-list-item>
        </v-list>
        
        <v-list-item>
          <div class="icon">
            <a :href="URLGIT" target="_blan">
              <svg-icon type="mdi" :path="Github" size="50px" color="black"></svg-icon>
            </a>
            <a :href="URLIG" target="_blan">
              <svg-icon type="mdi" :path="IG" size="50px" color="hotpink"></svg-icon>
            </a>
          </div>
            
          </v-list-item>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import meImage from "../assets/me.jpg";
import "./style.css";
import SvgIcon from '@jamescoyle/vue-icon';
import {  mdiGithub } from '@mdi/js';
import { mdiInstagram } from '@mdi/js';
export default {
  name: "MyCoolComponent",

  components: {
    SvgIcon
  },

  data() {
    return {
      Github: mdiGithub,
      IG: mdiInstagram,
      URLGIT: 'https://github.com/JacKSnoopY58',
      URLIG: 'https://www.instagram.com/jackzygade/',
      user: {
        name: "นายอิทธิกร ชัยกิตติกุล",
        nickname: "แจ็ค",
        education: "มหาวิทยาลัยสงขลานครินทร์",
        major: "เทคโนโลยีสารสนเทศ (ต่อเนื่อง)",
        hobby: "ฟังเพลง, เล่นเกม, ดูหนัง",
        like: "แมว, Programming",
 
        highlights: "พร้อมจะเรียนรู้สิ่งใหม่ๆ",
        avatar: meImage,
      },
    };
  },
};
</script>

<style scoped>

</style>
