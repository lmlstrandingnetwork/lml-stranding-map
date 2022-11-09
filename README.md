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

>DataCleaning - *Includes a python script that merges stranding data currently on the website with a separate domoic acid csv file*
>>cleanup.py - *python script*
>functions - *Config files for Firebase, Axios, and Algolia*
>>src
>index.ts - *Database config and functions*
>public - *Images and scalable vector graphics used on the website*
>>screenshots - *Screenshots of the website*
>src - *Javascript and css files for the website*
>>Components - *Main Javascript and css files for the display and logic of the website*

