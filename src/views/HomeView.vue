<template>
  <div class="home">
    <Client></Client>
  </div>
</template>

<script>
// @ is an alias to /src

import Client from "@/components/ClientComponent.vue";
export default {
  name: "HomeView",
  components: {
    Client,
  },
};
</script>
