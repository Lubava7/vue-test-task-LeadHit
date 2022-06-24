<template>
  <div class="form">
    <p>{{ msg }}</p>
    <h1>
      Lead
      <p>Hit</p>
    </h1>
    <div class="form-div" @submit.prevent="">
      <input
        @input="text = $event.target.value"
        class="input"
        type="text"
        placeholder="введите id сайта"
        v-bind:value="text"
      />

      <!-- <router-link to="/analytics"> -->
      <button type="button" @click="checkButton">Войти</button>
      <!-- </router-link> -->
    </div>
  </div>
  <!-- <router-view /> -->
</template>

<script>
export default {
  name: "checkButton",
  data() {
    return {
      text: " ",
      msg: " ",
    };
  },
  methods: {
    checkButton() {
      if (this.text.length < 24 || this.text.length > 24) {
        this.msg = "id сайта должен содержать 24 символа";
      }
    },
    inputText(event) {
      console.log(event.target.value);
    },
  },
};
</script>
<style lang="scss">
.form {
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  h1 {
    color: #ff4402;
    display: flex;
    align-items: center;
    font-weight: 500;
    p {
      color: #2c3236;
      font-weight: 700;
    }
  }

  .form-div {
    border: 2px solid #deecf3;
    border-radius: 2px;
    padding: 5px;
    width: 200px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: #f1f9fc;
    input {
      border: 1px solid #deecf3;
      padding: 2px;
      border-radius: 2px;
    }
    button {
      border-radius: 2px;
      border: 1px solid #deecf3;
      background-color: #00aeef;
      color: #f1f9fc;
    }
  }
}
</style>
