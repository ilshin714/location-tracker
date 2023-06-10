<template>
  <section class="ui two column centered grid">
    <div class="column">
      <form class="ui segment large form">
        <div class="ui message red" v-show="error">{{ error }}</div>
        <div class="ui segment">
          <div class="ui grid">
            <div class="field thirteen wide column">
              <div class="ui icon right input large" :class="{loading:spinner}">
                <input type="text" placeholder="Please enter your location" v-model="address" />
                <i class="link icon map marker alternate teal" @click="getUserLocation" ></i>  
              </div>
            </div>
            <div class="three wide column">
              <button class="ui button large teal">SEARCH</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
    data() {
      return {
        address: "",
        error: "",
        spinner: false
      };
    },
  methods: {
    getUserLocation() {
      this.spinner = true;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.getCurrentLocation(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        error => {
          if(error.message.includes("denied")){
            this.spinner = false;
            this.error = "Permission is denied to get the current location. Pleae type the location."
          }
        });
      } else {
        this.spinner = false;
        this.error = "Your browser does not support getting current location";
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
            this.address = response.data.results[0].formatted_address;
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
