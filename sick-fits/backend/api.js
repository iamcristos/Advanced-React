var request = require("request");

var options = {
  method: 'GET',
  url: 'https://restcountries-v1.p.rapidapi.com/region/africa',
  headers: {
    'x-rapidapi-host': 'restcountries-v1.p.rapidapi.com',
    'x-rapidapi-key': '1546e3368bmsh77a38aa943766dfp1eaacbjsn91cd69177917'
  }
};

request(options, function (error, response, body) {
    let arr = []
    if (error) throw new Error(error);
    const parse = JSON.parse(body)
    const res = parse.filter(cuntry => {
        if(cuntry.subregion === 'Western Africa') {
            return arr.push({
                country: cuntry.name,
                timezones: cuntry.timezones,
                capital: cuntry.capital
            })
        }
    })
    // console.log(body);
    console.log(arr)
});