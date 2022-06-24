<template>
  <div class="autorization"><InputForm /></div>
  <router-view />
</template>

<script>
import InputForm from "../components/InputForm/InputForm.vue";

// @ is an alias to /src
export default {
  components: {
    InputForm,
  },
};
</script>
<style lang="scss">
.autorization {
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
