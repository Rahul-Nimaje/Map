<template>
  <div style="height: 700px; width: 100%">
    <l-map
      :zoom="zoom"
      :options="mapOptions"
      style="height: 80%"
      :center="withPopup"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-marker
        v-for="(item, index) in center"
        :key="'marker-' + index"
        :lat-lng="item.location"
        @click="onMarkerClick(item)"
      >
        <l-popup>
          <div>
            <v-card>
              <v-col cols="6">
                <v-list-item>
                  <v-img :src="item.imageurl"></v-img>
                </v-list-item>
                <v-list-item>
                  <span class="green--text font-weight-bold">Address:</span>
                  <span class="red--text font-weight-bold ml-5">{{
                    item.address
                  }}</span>
                </v-list-item>
                <v-list-item>
                  <span class="green--text font-weight-bold">Email:</span>
                  <span class="red--text font-weight-bold ml-5">{{
                    item.email
                  }}</span>
                </v-list-item>
                <v-list-item>
                  <span class="green--text font-weight-bold">Latitude:</span>
                  <span class="red--text font-weight-bold ml-5">{{
                    item.latitude
                  }}</span>
                </v-list-item>
                <v-list-item>
                  <span class="green--text font-weight-bold">Longitude:</span>
                  <span class="red--text font-weight-bold ml-5">{{
                    item.longitude
                  }}</span>
                </v-list-item>
              </v-col>
            </v-card>
          </div>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import axios from "axios";
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";

export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  data() {
    return {
      latitude: 0,
      longitude: 0,
      technicianlocation: [],
      projectsdata: [],
      lat_lang: {},
      markers: [
        { technicianlocation: latLng(48.8197017, 20.3561233) },
        { technicianlocation: latLng(48.8597017, 20.34561233) },
      ],
      zoom: 13,
      center: [],
      userdata: [],
      long: {},
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(47.41322, -1.219482),
      withTooltip: latLng(47.41422, -1.250482),
      currentZoom: 11.5,
      currentCenter: latLng(47.41322, -1.219482),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5,
      },
      showMap: true,
    };
  },
  mounted() {
    this.userget();
    console.log("bbhbcs", this.markers);
    console.log("sucee", this.center);
  },
  methods: {
    async userget() {
      console.log("sddsdsdcs");
      await axios.get("http://localhost:3001/form").then((Response) => {
        console.log("Resonse", Response.data);
        this.projectsdata = Response.data;
        console.log("dsdsdsdd", this.projectsdata);
        console.log("dsdsdsdd", this.projectsdata.imagesArray);

        if (this.projectsdata.length >= 0) {
          for (let i in this.projectsdata) {
            var technicianlocation = {};
            console.log("dadad", this.projectsdata[i].imagesArray);
            this.name = this.projectsdata[i].name;
            this.latitude = this.projectsdata[i].latitude;
            this.longitude = this.projectsdata[i].longitude;
            technicianlocation.latitude = this.latitude;
            technicianlocation.longitude = this.longitude;
            technicianlocation.location = latLng(this.latitude, this.longitude);
            let text = this.projectsdata[i].imagesArray.toString();
            console.log("imagetest", text);
            technicianlocation.imageurl = text;
            technicianlocation.address = this.projectsdata[i].address;
            technicianlocation.email = this.projectsdata[i].email;
            console.log("test me", technicianlocation);
            this.center.push(technicianlocation);
          }

          console.log("Center", this.center);
        }
      });
    },
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert("Click!");
    },
    async onMarkerClick(value) {
      console.log("kjbjkbjbjk", value.id);
      var id = value.id;
      await axios
        .get("http://122.170.1.83:8899/api/v1/user/" + id)
        .then((Response) => {
          console.log("Resonse", Response.data);
          this.projectsuserdatadata = Response.data.result;
          console.log("userdata", this.userdata);
        });
    },
  },
};
</script>
