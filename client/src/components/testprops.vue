<template>
  <v-container>
    <v-card>
      <v-list-item class="grey lighten-4">
        <v-list-item-content>{{ btnText.id }}</v-list-item-content>
        <v-list-item-content>{{ btnText.name }}</v-list-item-content>
      </v-list-item>
    </v-card>
  </v-container>
</template>
<script>
export default {
  props: {
    btnText: Array,
  },
  data() {
    return {};
  },
  mounted() {
    console.log("test", this.test);
  },
};
</script>
