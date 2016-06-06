var request = require('request');
var cheerio = require('cheerio');



var url = "http://www.yelp.com/biz/garaje-san-francisco";
crawl();

function crawl() {
    console.log("Visit page: " + url + "\n");
    request(url, function(error, response, html) {
        if (!error && response.statusCode == 200){

            var $ = cheerio.load(html);

            var name = $('h1.biz-page-title').first().text().trim();
            var count = Number($('span.review-count').children().text());
            console.log(name);
            console.log(count + " reviews" + "\n");
            var users = [], revs = [];
            $('div.review-list').find('a.user-display-name').each(function (i, element) {
                users.push($(this).text())});
            $('div.review-list').find('div.review-content').find('p').each(function (i, element) {
                revs.push($(this).text())});


            for(i = 0; users[i] && revs[i]; i++) console.log(users[i] + " wrote:\n" + revs[i] + "\n");

        }});
}