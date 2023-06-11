# WELCOME

>**Location Tracker is a Vue.js project that tracks user typed location with the help of Goole Maps Api.**  


![image](https://github.com/ilshin714/location-tracker/assets/56660639/2da72811-faa2-4597-8b29-d1e618c9f58f)


## FEATURES 

### 1. GET USER'S CURRENT LOCATION 
- [x] Location Tracker can acquire a user's current location from their browser by clicking the map marker icon in the search input field.

![image](https://github.com/ilshin714/location-tracker/assets/56660639/b22274dd-77a4-40b0-af2f-a46bbe564478)
 
- If a user block the access, it will show a message for the next step 

![image](https://github.com/ilshin714/location-tracker/assets/56660639/fb11ff00-879e-4f3c-99ff-1e87f6510311)

### 2. AUTO COMPLETE SEARCH MODULE AND MARKING TRIGGERED BY ENTER OR SEARCH BUTTON
- [x] Search Module will diplay options from user's input and will be triggered by both button clicks and pressing the enter key on the keyboard.
![image](https://github.com/ilshin714/location-tracker/assets/56660639/3550c54f-70f2-4715-985d-617a6f67aa90)

### 3. DISPLAY LOCATIONS ON A MAP AND ADD MARKERS
- [x] It will display locations and markers when locations changes by clicking "SEARCH" button or pressing "ENTER" key from the searched input.
![image](https://github.com/ilshin714/location-tracker/assets/56660639/b16e3a78-8757-4257-8596-210f2d92d825)


### 4. TABLE WITH PAGINAITION TO SHOW ALL SEARCHED PLACE
- [x] It will display a maximum of 10 records on each page.
![image](https://github.com/ilshin714/location-tracker/assets/56660639/10760849-9756-481c-91e9-98ba0cac2fa9)


- [x] A checkbox at the beginning of each row to let users select multiple records at the same time.
![image](https://github.com/ilshin714/location-tracker/assets/56660639/cb84a24e-d6a6-4320-beea-27dc85170703)

- [x] A delete button on the top will remove all selected records as well as their markers on the map.
![image](https://github.com/ilshin714/location-tracker/assets/56660639/242259d6-51ae-4fef-97e1-c240d593f9f1)

### 5. DISPLAY TIME ON A LOCATION
- [x] It will display the time zone and local time of the latest searched location.
![image](https://github.com/ilshin714/location-tracker/assets/56660639/b9da5c5a-48cc-4230-bf82-96fc6a60658b)

## BUILD SETUP
### Used Dependencides
- "axios": "^1.4.0"
- "vue-browser-geolocation": "^1.8.0"
- "vue2-google-maps": "^0.10.7"

``` bash
# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

```
## Please Enter Your Google Api Key in dev.env.js
![image](https://github.com/ilshin714/location-tracker/assets/56660639/c4a4d77c-3ce2-4ee1-aab2-ac70a6e9172c)


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
