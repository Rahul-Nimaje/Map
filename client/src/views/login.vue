<template>
  <v-container fluid>
    <div>
      <form @submit.prevent="onUpload">
        <div>
          <v-dialog
            v-model="projectdialog"
            max-width="500px"
            max-height="500px"
          >
            <v-card>
              <v-row justify="center">
                <h1
                  class="light-green--text text--lighten-2 font-weight-bold mt-5"
                >
                  Add New Item
                </h1>
              </v-row>

              <v-text-field v-model="name" class="ma-5" label="Name" outlined>
              </v-text-field>
              <v-textarea
                class="ma-5"
                v-model="address"
                outlined
                label="address"
              >
              </v-textarea>
              <v-text-field
                class="ma-5"
                v-model="email"
                outlined
                label="Email Id"
              ></v-text-field>

              <v-text-field
                class="ma-5"
                v-model="mobileNo"
                outlined
                label="Mobile Number"
              >
              </v-text-field>
              <v-text-field
                class="ma-5"
                v-model="latitudes"
                outlined
                label="Latitude"
              >
              </v-text-field>
              <v-text-field
                class="ma-5"
                v-model="longitudes"
                outlined
                label="Longitude"
              >
              </v-text-field>
              <div>
                <div class="form-group">
                  <input type="file" name="imagesArray" @change="onChange" />
                </div>
                <div class="form-group">
                  <button class="btn btn-success">Submit</button>
                </div>
              </div>

              <v-list-item>
                <v-btn text color="primary" @click="Adduser">Add User</v-btn>
                <v-btn text color="primary" @click="closedialog">Close</v-btn>
              </v-list-item>
            </v-card>
          </v-dialog>
        </div>
      </form>
      <v-card>
        <v-row>
          <v-col cols="8"> </v-col>
          <v-col>
            <v-card-actions>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <v-btn class="primary ma-10" @click="newproject">New Item</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
      <v-data-table
        :headers="headers"
        :items="projectsdata"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:item.imageArray="{ index }">
          {{ index }}
        </template>
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>My CRUD</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Name"
                          outlined
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="12" md="12">
                        <v-textarea
                          outlined
                          v-model="editedItem.address"
                          label="Address"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          outlined
                          v-model="editedItem.email"
                          label="Email"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          outlined
                          v-model="editedItem.mobileNumber"
                          label="Mobile Number"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          outlined
                          v-model="editedItem.latitude"
                          label="Latitude"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          outlined
                          v-model="editedItem.longitude"
                          label="Longitude"
                        ></v-text-field>
                        <div>
                          <div class="form-group">
                            <input
                              type="file"
                              name="imagesArray"
                              @change="onChange"
                            />
                          </div>
                          <div class="form-group">
                            <button class="btn btn-success">Submit</button>
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save()">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="Delete(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary"> Reset </v-btn>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      stacklist: ["node", "angular", "Vue", "Vuetify"],
      name: "",
      address: "",
      email: "",
      userid: "",
      mobileNo: "",
      imageurl: "",
      projecttitles: "",
      createdby: "",
      projectdialog: false,
      createdbye: "",
      projectsdata: [],
      id: Math.floor(Math.random() * 100000),
      panel: "basic",
      search: null,
      date: "",
      latitude: "",
      latitudes: "",
      longitudes: "",
      userdata: [],
      longitude: "",
      dialog: false,
      dialogDelete: false,
      imagesArray: null,
      headers: [
        { text: "Id", value: "id" },
        { text: "Name", value: "name" },
        { text: "Mobile Number", value: "mobileNumber" },
        { text: "Email ID", value: "email" },
        { text: " Address", value: "address" },
        { text: "imagesArray", value: "imagesArray" },
        { text: "Latitude", value: "latitude" },
        { text: "longitude", value: "longitude" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      // editedIndex: -1,
      editedItem: {
        name: "",
        address: "",
        email: 0,
        mobileNo: 0,
      },
      // defaultItem: {
      //   name: '',
      //   calories: 0,
      //   fat: 0,
      //   carbs: 0,
      //   protein: 0,
      // },
      //    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
    };
  },
  mounted() {
    this.alluserdata();
    this.userdatabyid();
  },
  // watch: {
  //   model (val) {
  //     if (val.length > 5) {
  //       this.$nextTick(() => this.model.pop())
  //     }
  //   },

  // },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    async alluserdata() {
      await axios.get("http://localhost:3001/form").then((Response) => {
        console.log("Resonse", Response.data);
        this.projectsdata = Response.data;
        console.log("imagearray", this.projectsdata.imagesArray);
      });
    },
    async userdatabyid() {
      await axios
        .get("http://122.170.1.83:8899/api/v1/user" + this.userid)
        .then((Response) => {
          console.log("Resonse", Response.data);
          this.userdata = Response.data.result;
          console.log(this.projectsdata);
        });
    },
    closedialog() {
      this.projectdialog = false;
    },

    newproject() {
      this.projectdialog = true;
      console.log("testMyProject");
    },

    editItem(item) {
      // this.editedIndex = this.projectsdata.indexOf(item)
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.projectsdata.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.projectsdata.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    onChange(event) {
      this.imagesArray = event.target.files[0];
    },
    onUpload() {
      let formData = new FormData();
      formData.append("imagesArray", this.imagesArray, this.imagesArray.name);

      console.log("ljhlasdlldkjaklja////", formData);

      // axios
      //   .post("http://122.170.1.83:8899/api/v1/user", {
      //     image: this.imagesArray.name,
      //   })
      //   .then((response) => {
      //     console.log(response);
      //   });
    },
    async save() {
      // console.log("imagearray", this.imagesArray, this.imagesArray.name);
      const formData = new FormData();
      console.log("imagearray", this.imagesArray, this.imagesArray.name);
      formData.append("imagesArray", this.imagesArray, this.imagesArray.name);

      formData.append("name", this.editedItem.name);
      formData.append("email", this.editedItem.email);
      formData.append("address", this.editedItem.address);
      formData.append("mobileNumber", this.editedItem.mobileNumber);
      formData.append("latitude", this.editedItem.latitude);
      formData.append("longitude", this.editedItem.longitude);

      this.username = this.editedItem.name;
      console.log("sdssds", this.editedItem._id);
      await axios
        .put("http://localhost:3001/form?id=" + this.editedItem._id, formData, {
          // name: this.editedItem.name,
          // email: this.editedItem.email,
          // mobileNumber: this.editedItem.mobileNumber,
          // latitude: this.editedItem.latitude,
          // longitude: this.editedItem.longitude,
        })
        .then((Response) => {
          console.log("Response", Response);
        });
      this.close();
      // location.reload(true);
    },
    async Delete(value) {
      console.log("valueid", value._id);

      await axios
        .delete("http://localhost:3001/form?id=" + value._id)
        .then((Response) => {
          console.log("Response", Response);
          window.alert("Data Successfully Deleted");
          location.reload(true);
        });
    },
    async Adduser() {
      console.log("imageurl", this.imagesArray);
      const formData = new FormData();
      formData.append("imagesArray", this.imagesArray, this.imagesArray.name);
      formData.append("name", this.name);
      formData.append("email", this.email);
      formData.append("address", this.address);
      formData.append("mobileNumber", this.mobileNo);
      formData.append("latitude", this.latitudes);
      formData.append("longitude", this.longitudes);
      await axios
        .post("http://localhost:3001/form", formData)
        .then(async (Response) => {
          console.log("dss", Response);
        });
      // location.reload(true);
    },

    // onUpload() {
    //   const formData = new FormData()
    //   formData.append('imagesArray', this.imagesArray, this.imagesArray.name)
    //   axios.post('http://122.170.1.83:8899/api/v1/user', formData, {
    //   }).then((response) => {
    //     console.log("dssdsdsd",response)
    //   })
    // }
  },
};
</script>
