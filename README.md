# Long Marine Lab Stranding Map
A tool for visualizing marine mammal stranding data collected by the Long Marine Lab in Santa Cruz county.

![screenshot01](/public/screenshots/screenshot01.png)


## Demo
The current production build can be currently viewed at: [https://lmlstrandingmap.herokuapp.com/](https://lmlstrandingmap.herokuapp.com/)


## Key Features
#### Marker Clustering
Groups data points together and shows count of standings when zoomed out.
![marker-clustering](/public/screenshots/marker-clustering.png)

#### Heatmap
Highlights density and magnitude of strandings in a particular area.
![Heatmap](/public/screenshots/heatmap.png)

#### Time Slider
Plays through stranding data through the years.

![Time Slider 2](/public/screenshots/time-slider02.png)

#### File Upload
After logging in, lab technicians can upload new stranding data to the database.
![File Upload](/public/screenshots/file-upload.png)


## Built with
- [Urbica React Map GL](https://urbica.github.io/react-map-gl/) - React Component Library for Mapbox GL JS.
- [Firebase](https://firebase.google.com/) - Cloud storage, authentication, and backend code hosting.
- [Algolia](https://algolia.com/) - Fast, realtime search integration for Firebase Realtime Database.
- [Heroku](https://heroku.com/) - Application hosting, automated builds and deployments.


## License
[MIT](https://choosealicense.com/licenses/mit/)

# Table of Contents
<details open><summary>lml-stranding-map</summary><blockquote>

<details><summary>DataCleaning</summary><blockquote>

cleanup.py - *python script*
</blockquote></details>

<details><summary>functions</summary><blockquote>
<details><summary>src</summary><blockquote>

index.ts - *Database config and functions*
</blockquote></details>

.eslintrc.json  
index.js  
package-lock.json  
package.json  
tsconfig.json  
tslint.json
</blockquote></details>

<details><summary>public</summary><blockquote>
<details><summary>screenshots</summary><blockquote>

file-upload.png  
heatmap.png  
marker-clustering.png  
screenshot01.png  
time-slider01.png  
time-slider02.png
</blockquote></details>

baskin-logo-banner-2021.png  
baskin-logo-banner-new.jpg  
baskin-logo-banner.png  
dead_seal_image.jpg  
favicon.ico  
index.html  
logo192.png  
logo512.png  
long-marine-stranding-program.png  
long-marine-stranding-program.svg  
manifest.json  
red-pin.svg  
robots.txt  
seal-face-svgrepo-com.svg  
seal-grey-svgrepo-com.svg  
seal-svgrepo-com.svg  
seal.png
</blockquote></details>

<details><summary>src</summary><blockquote>
<details><summary>Components</summary><blockquote>

About.css  
About.js - *Recognition page for teams that have worked on the website*  
CaseStudyPage.css  
CaseStudyPage.js - *"Stranding Story" case study page displaying stranding field number, photo, and writeup*
CaseStudyPopup.css  
CaseStudyPopup.js - *"Stranding Story" popup for map pins*
ClusteredMarkers.css  
ClusteredMarkers.js  
Content.css  
Content.js - *Layout of non-map portion of the page (sidebar, slider toggles)*
DropdownRefinementList.css  
DropdownRefinementList.js  
Filter.js  
Footer.css  
Footer.js  
Legend.css  
Legend.js  
Login.js  
LoginStyles.css  
Map.js  
MarkerSVG.js  
NavMenu.css  
NavMenu.js - *Top NavBar of page above map*
Sidebar.css  
Sidebar.js  
Signup.js  
StarSVG.js  
StrandingPopup.css  
StrandingPopup.js - *Stranding info popup for map pins*  
TimeSlider.css  
TimeSlider.js - *Year filter slider and play button*  
UploadDomoicAcidPopup.js - *Allows LML to upload domoic acid data in csv format for previously uploaded strandings*  
UploadPopup.css  
UploadPopup.js - *Allows LML to upload stranding data in csv format*  
faq.js  
heatmapLayer.js
</blockquote></details>

<details><summary>config</summary><blockquote>

Fire.js
</blockquote></details>

App.js  
App.test.js  
Auth.js  
PrivateRoute.js  
api.js  
index.css  
index.js  
logo.svg  
serviceWorker.js  
setupTests.js
</blockquote></details>

.firebaserc  
README.md  
app.json  
firebase.json  
geojson.py  
netlify.toml  
package-lock.json  
package.json
</blockquote></details>  

<details><summary>Template</summary><blockquote>

text
</blockquote></details>

[Reference used to build table of contents](https://gist.github.com/pierrejoubert73/902cc94d79424356a8d20be2b382e1ab)
