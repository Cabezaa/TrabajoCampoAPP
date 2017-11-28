import app from './App'

// const port = process.env.PORT || 3000
var port = process.env.PORT || (process.argv[2] || 3000); // Fix para mocha


app.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
})

module.exports = app;
