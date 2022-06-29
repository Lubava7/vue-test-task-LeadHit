<template>
  <div class="info">jikjikjik</div>
</template>
<script>
import Vue from "vue";
import axios from "axios";

// const Leadhit_Site_Id = "5f8475902b0be670555f1bb3";
// const API_KEY = "5f8475902b0be670555f1bb3:eEZn8u05G3bzRpdL7RiHCvrYAYo";
const BASE_URL = "https://track-api.leadhit.io/client/test_auth";

new Vue({
  el: ".info",
  data() {
    return {
      info: null,
      header: "header",
    };
  },
  mounted() {
    axios.get(BASE_URL).then((res) => (this.info = res));
  },
});
</script>
<style lang="scss">
.info {
  border: 2px solid black;
  height: 20px;
  width: 100px;
}
</style>
