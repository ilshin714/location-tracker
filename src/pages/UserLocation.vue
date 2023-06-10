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
      <div id="table" class="column teal" v-show="places.length > 0">
        {{ places }}
      </div>
    </section>
  </div>
</template>

<script>
import "@/pages/UserLocation.css";
import axios from "axios";

export default {
  data() {
    return {
      center: { lat: 43.751007, lng: -79.290437 },
      address: "",
      error: "",
      spinner: false,
      currentPlace: null,
      markers: [],
      places: []
    };
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
      this.center = {
        lat: this.currentPlace.geometry.location.lat(),
        lng: this.currentPlace.geometry.location.lng()
      };
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
        this.currentPlace = null;
      }
    },
    getCurrentLocation(lat, lng) {
      axios
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
            this.currentPlace = null;
          }
        })
        .catch(error => {
          this.spinner = false;
          this.error = error.error_message;
        });
    }
  }
};
</script>
