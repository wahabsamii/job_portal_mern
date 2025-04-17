import app from './app.js';


app.listen(process.env.PORT, function() {
    console.log(`SERVER IS LISTING ON PORT ${process.env.PORT}`)
})