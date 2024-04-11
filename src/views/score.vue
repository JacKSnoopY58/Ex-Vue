<template>
    <div class="container">
      <v-flex xs4>
        <v-text-field v-model="score" label="Score" class="text-field"></v-text-field>
        <v-card-actions>
          <v-btn color="blue" @click="submitScore" class="btn">Submit</v-btn>
        </v-card-actions>
        <div v-if="grade" class="grade">Grade: {{ grade }}</div>
       
      </v-flex>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        score: "",
        grade: ""
      };
    },
  
    methods: {
      submitScore() {
        const score = parseInt(this.score);
        if (isNaN(score) || score < 0 || score > 100) {
          this.grade = "Please Enter a Number between 0 and 100";
        } else if (score >= 80) {
          this.grade = "A";
        } else if (score >= 70) {
          this.grade = "B";
        } else if (score >= 60) {
          this.grade = "C";
        } else if (score >= 50) {
          this.grade = "D";
        } else {
          this.grade = "F";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; 
  }
  
  .v-flex {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .text-field {
    font-size: 18px; 
    margin-bottom: 20px;
  }
  
  .btn {
    font-size: 18px; 
    margin-bottom: 20px;
  }
  
  .grade {
    font-size: 24px; 
    font-weight: bold;
    color: #4caf50;
    margin-top: 20px;
  }
  </style>
  