
<template>
  <v-row justify="center" align="center">
    <v-col cols="14" xs="14" md="4">
      <v-container class="pa-2">
        <v-card class="elevation-6">
          <v-toolbar dark color="primary">
            <v-toolbar-title class="font-weight-bold">Login</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <p>{{ text }}</p>
          </v-card-text>

          <v-form ref="loginForm" v-model="valid" lazy-validation>
            <v-text-field
              class="pa-1"
              outlined
              prepend-icon="person"
              name="login"
              label="Email"
              v-model="email"
              :rules="loginEmailRules"
              type="text"
            ></v-text-field>

            <v-text-field
              outlined
              class="pa-1"
              prepend-icon="lock"
              v-model="password"
              :rules="[rules.required, rules.min]"
              name="password"
              label="Password"
              type="password"
            ></v-text-field>
          </v-form>

          <v-card-actions class="pa-2">
            <v-spacer></v-spacer>
            <v-btn block :disabled="!valid" @click="login" color="primary"
              >Login</v-btn
            >
          </v-card-actions>
        </v-card>
        <!-- <v-btn @click="facebook"  class="ml-10 mt-5" fab>
                        <v-icon  color="blue" >facebook</v-icon>
                        </v-btn> -->
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mt-5 ml-10"
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Registrartion
            </v-btn>
          </template>
          <v-form ref="valid">
            <v-card>
              <v-card-title>
                <span class="text-h5">User Profile</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="firstname"
                        :rules="[rules.required]"
                        label="First name*"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="middlename"
                        :rules="[rules.required]"
                        label="Middle name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="lastname"
                        :rules="[rules.required]"
                        label="Last name*"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="registeremail"
                        :rules="loginEmailRules"
                        label="Email*"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="registerpassword"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        hint="At least 8 characters"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        block
                        v-model="verify"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, passwordMatch]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Confirm Password"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">
                  Close
                </v-btn>
                <v-btn color="blue darken-1" text @click="submit"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </v-container>
    </v-col>
  </v-row>
</template> 
<script>
import axios from "axios";

export default {
  data() {
    return {
      show1: false,
      signout: false,
      dialog: false,
      text: "",
      userid: Math.floor(Math.random() * 100000),
      email: "",
      invalidemail:"",
      password: "",
      firstname: "",
      lastname: "",
      middlename: "",
      registeremail: "",
      registerpassword: "",
      verify: "",
      valid: "",
      loginEmailRules: [
        (v) => !!v || "Required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid" || this.invalidemail,
      ],
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => (v && v.length >= 8) || "Min 8 characters",
      },
    };
  },
  computed: {
    passwordMatch() {
      return () =>
        this.registerpassword === this.verify || "Password must match";
    },
  },
  methods: {
    async login() {
      if (this.$refs.loginForm.validate()) {
        await axios
          .post("http://localhost:3000/login", {
            email: this.email,
            password: this.password,
          })
          .then((Response) => {
            console.log(Response.data);
            this.$store.dispatch("loginuser", Response.data);
            if(Response.data=="Invalid Password"){
              console.log("Invalid Password")
            }
            else{
              
              console.log("Successfully logged in")
              this.$router.push('/home')
            }
            
          })
        
        // console.log(this.email, this.password);
      }
    },

    submit() {
      if (this.$refs.valid.validate()) {
        axios
          .post("http://localhost:3000/registration", {
            userid: this.userid,
            registeremail: this.registeremail,
            firstname: this.firstname,
            lastname: this.lastname,
            middlename: this.middlename,
            registerpassword: this.registerpassword,
          })
          .then(async (Response) => {
            if(Response.data=="alredyregister"){
            this.invalidemail="alredy Register"

            }
            console.log(Response.data);
          });
        console.log(
          this.registeremail,
          this.firstname,
          this.lastname,
          this.middlename,
          this.registerpassword
        );
        // this.dialog = false;
      }
    },
  },
};
</script>