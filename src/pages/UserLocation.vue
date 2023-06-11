<template>
  <div>
    <section class="ui two column centered grid">
      <div class="column">
        <form class="ui segment large form">
          <div class="ui message red" v-show="error">{{ error }}</div>
          <div class="ui segment">
            <div class="ui grid">
              <div class="field thirteen wide column">
                <div
                  class="ui icon right input large"
                  :class="{ loading: spinner }"
                >
                  <GmapAutocomplete
                    @place_changed="setPlace"
                    @keyup.enter="enterPressed"
                    :value="address"
                    :select-first-on-enter="true"
                  >
                  </GmapAutocomplete>
                  <i
                    class="link icon map marker alternate teal"
                    @click="getUserLocation"
                  ></i>
                </div>
              </div>
              <div class="three wide column">
                <button class="ui button large teal" @click="addLocation">
                  SEARCH
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
    <section class="ui two column centered grid">
      <GmapMap id="map" class="column" :center="center" :zoom="14">
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
        ></GmapMarker>
      </GmapMap>
      <div id="table" class="column" v-show="places.length > 0">
        <div class="ui grid">
          <div class="four column row">
            <div class="left floated column">
              <h1 class="">Location Table</h1>
            </div>
            <div class="right floated column">
              <button
                class="ui button large right floated black"
                @click="deleteData"
              >
                DELETE ALL
              </button>
            </div>
          </div>
        </div>
        <Pagination
          :totalRecords="tableData.length"
          :perPageOption="10"
          v-model="pagination"
        />
        <Table
          v-if="tableData.length > 0"
          :theData="computedTableData"
          :config="config"
        />
        <div class="ui clearing divider"></div>   
      </div>
    </section>
  </div>
</template>

<script>
import "@/pages/UserLocation.css";
import Table from "../components/Table";
import Pagination from "../components/Pagination";

export default {
  components: {
    Table,
    Pagination
  },
  data() {
    return {
      center: { lat: 43.751007, lng: -79.290437 },
      address: "",
      error: "",
      spinner: false,
      currentPlace: null,
      markers: [],
      places: [],
      pagination: { page: 1, perPage: 10},
      tableData: [],
      config: [
        {
          key: "isChecked",
          title: "Is Checked",
          type: "checkbox"
        },
        {
          key: "address",
          title: "Address",
          type: "text"
        },
        {
          key: "lat",
          title: "Latitude",
          type: "text"
        },
        {
          key: "lng",
          title: "Longitude",
          type: "text"
        }
      ]
    };
  },
  computed: {
    computedTableData(){
      const firstIndex = (this.pagination.page -1) * this.pagination.perPage;
      const lastIndex = this.pagination.page * this.pagination.perPage;
      return this.tableData.slice(firstIndex, lastIndex);
    }
  },
  mounted() {},
  methods: {
    getUserLocation() {
      this.spinner = true;
      if (navigator.geolocation) {
        this.geolocate();
      } else {
        this.spinner = false;
        this.error = "Your browser does not support getting current location";
      }
    },
    setPlace(place) {
      this.currentPlace = place;
      this.address = this.currentPlace.formatted_address;
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.getCurrentLocation(this.center.lat, this.center.lng);
          this.spinner = false;
        },
        error => {
          if (error.message.includes("denied")) {
            this.spinner = false;
            this.error =
              "Permission is denied to get the current location. Pleae type the location below and press the enter key or click the SEARCH button.";
          }
        }
      );
    },
    enterPressed() {
      this.addLocation();
    },
    addLocation() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.center = marker;
        this.places.push(this.currentPlace);
        this.markers.push({ position: marker });
        this.addTableData();
      }
    },
    getCurrentLocation(lat, lng) {
      this.$axios
        .get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            lat +
            ", " +
            lng +
            "&key=" +
            process.env.VUE_APP_GEO_API_KEY
        )
        .then(response => {
          if (response.data.error_message) {
            this.spinner = false;
            this.error = response.data.error_message;
          } else {
            this.spinner = false;
            this.currentPlace = response.data.results[0];
            this.address = this.currentPlace.formatted_address;
            const marker = {
              lat: lat,
              lng: lng
            };
            this.center = marker;
            this.places.push(this.currentPlace);
            this.markers.push({ position: marker });
            this.addTableData();
          }
        })
        .catch(error => {
          this.spinner = false;
          this.error = error.error_message;
        });
    },
    addTableData() {
      let newData = {
        isChecked: false,
        address: this.address,
        lat: this.center.lat,
        lng: this.center.lng
      };
      this.tableData.push(newData);
      this.currentPlace = null;
    },
    deleteData() {
      this.currentPlace = null;
      this.markers = [];
      this.places = [];
      this.tableData = [];
      this.address = "";
      this.pagination.page = 1;
    }
  }
};
</script>
