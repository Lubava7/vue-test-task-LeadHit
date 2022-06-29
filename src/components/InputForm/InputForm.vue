<template>
  <p class="msg">{{ msg }}</p>
  <div class="form">
    <h1>
      Lead
      <p>Hit</p>
    </h1>
    <div class="form-div" @submit.prevent="">
      <input
        v-on:keyup.enter="enterText"
        @click="hideText"
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
  <div id="info">{{ info }}</div>
</template>

<script>
import axios from "axios";

export default {
  name: "checkButton",
  data() {
    return {
      text: "",
      msg: " ",
      info: null,
    };
  },

  mounted() {
    if (localStorage.getItem("leadhit-site-id")) {
      this.$router.push("/analytics");
    }
  },
  // watch: {
  //   text(newText) {
  //     localStorage.text = newText;
  //     console.log("localstorage", newText);
  //   },
  // },
  methods: {
    axiosInfo() {
      axios
        .get("https://track-api.leadhit.io/client/test_auth", {
          headers: {
            "Api-Key": "5f8475902b0be670555f1bb3:eEZn8u05G3bzRpdL7RiHCvrYAYo",
            // "Leadhit-Site-Id": "5f8475902b0be670555f1bb3",
            "Leadhit-Site-Id": this.text,
          },
        })
        .then((res) => {
          if (res.data.message == "ok") {
            localStorage.setItem("leadhit-site-id", this.text);
            this.$router.push("/analytics");
          }
        })
        .catch((error) => alert(error.message));
    },
    checkButton() {
      if (this.text.length < 24 || this.text.length > 24) {
        this.msg = "id сайта должен содержать 24 символа";
      }
      if (this.text.length == 24) {
        this.msg = " ";
        this.axiosInfo();
      }
    },
    inputText(event) {
      console.log(event.target.value);
    },
    hideText() {
      this.msg = " ";
    },
    enterText() {
      this.checkButton();
    },
  },
};
</script>
<style lang="scss">
.msg {
  height: 20px;
}
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
#info {
  height: 400px;
  width: 400px;
  color: black;
}
</style>
