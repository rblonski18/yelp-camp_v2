const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '5fd01abfd536688848ef7fb1',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui corrupti vitae dolore, consequuntur animi ipsam! Soluta suscipit non repudiandae nisi, temporibus esse aspernatur ex provident commodi rem minus blanditiis corporis.',
            price,
            geometry: {
                type: "Point", 
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dnndblktv/image/upload/v1607540302/YelpCamp/zwhahhnfvpkbjd9fjaau.jpg',
                  filename: 'YelpCamp/zwhahhnfvpkbjd9fjaau'
                },
                {
                  url: 'https://res.cloudinary.com/dnndblktv/image/upload/v1607540302/YelpCamp/lkronbos0u3vqa767pem.jpg',
                  filename: 'YelpCamp/lkronbos0u3vqa767pem'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

