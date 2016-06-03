var request = require('request');
var cheerio = require('cheerio');

var url = "http://www.yelp.com/biz/garaje-san-francisco";
crawl();

function crawl() {
    console.log("Visit page:" + url);
    request(url,
        function(error, response, body) {
            var $ = cheerio.load(body);
            console.log($);
        }
    );
}
