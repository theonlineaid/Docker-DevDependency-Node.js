const express = require('express');
const os = require('os');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 7000;

// Middleware to parse JSON request bodies
app.use(express.json());

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`mongodb://onlineaid:password@mongo:27017/?authSource=admin`, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        console.error("Error connecting to MongoDB",)
    }
}

// mongodb+srv://omorfarukdev:qZQKznbIqZoQVTfq@cluster0.4snxc.mongodb.net/

app.get('/', (req, res) => {

    function linearSearch(arr, target, len = arr.length) {
        for (let i = 0; i < len; i++) {
            if (arr[i] == target)
                return i;
        }
        return -1;
    }


    // Driver code
    let arr = [2, 3, 4, 10, 40, 70, 100];
    // let len = arr.length;
    let target = 4;

    // Function call
    let result = linearSearch(arr, target);

    if (result === -1) {
        console.log("Element is not present in array")
    } else {
        console.log("Element is present at index " + result)
    }




    function iterativeBinarySearch(arr, target) {
        let left = 0;
        let right = arr.length - 1;

        while (left <= right) {
            let mid = Math.floor((left + right) / 2); //10

            // console.log(mid)

            if (arr[mid] === target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return -1;
    }

    const output = iterativeBinarySearch(arr, target);
    console.log(output)

    res.send('Welcome to the Express server! development v2 ' + os.hostname);
})


app.get('/get-data', (req, res) => {
    res.json({ message: "hi" });
});

app.listen(PORT, () => {
    connectDB()
    console.log(`Express server listening ${PORT}`)
});

