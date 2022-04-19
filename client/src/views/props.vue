<template>
  <v-container>
    <!-- <h1>Hello World</h1> -->
    <v-text-field outlined></v-text-field>
    <testprops v-for="btnText in text" :key="btnText.id" :btnText="btnText" />
    <!-- <v-btn color="primary" @click="text = 'Rahul'">Press Me</v-btn> -->
  </v-container>
</template>
<script>
import testprops from "../components/testprops.vue";
export default {
  components: {
    testprops,
  },
  data() {
    return {
      text: [
        { id: 1, name: "Hello" },
        { id: 2, name: "Rahul" },
      ],
    };
  },
};
</script>
