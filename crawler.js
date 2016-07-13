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
            $('div.review-list a.user-display-name').each(function (i, element) {
                users.push($(this).text())});
            $('div.review-list').find('div.review-content').find('p').each(function (i, element) {
                revs.push($(this).text())});


            for(i = 0; users[i] && revs[i]; i++) console.log(users[i] + " wrote:\n" + revs[i] + "\n");

            return {name, users, count, revs};

        }});
}

function parseYelp(url, cb){
    request(url, function(error, response, html) {
        if (!error && response.statusCode == 200){

            var $ = cheerio.load(html);

            cb({
                name : $('h1.biz-page-title').first().text().trim(),
                count : Number($('span.review-count').children().text()),
                users : $('div.review-list a.user-display-name').map((i, element) => $(element).text()),
                revs: $('div.review-list div.review-content p').map((i, element) => $(element).text())
            });
        } else {
            throw "Couldn't load page";
        }
    });
}

// promise
// underscore ; functional programming


parseYelp("http://www.yelp.com/biz/garaje-san-francisco", function(res){
    seeAvailabilityOpenTable(res.name, function(availability){
        ...
    })
})



parseYelp("http://www.yelp.com/biz/garaje-san-francisco")
    .then(res => parseOpenTable(res.name))
    .then(availability => ...);



request(url, function(error, response, html) {
});

let reqP = (url) => new Promise(function(resolve, reject) {
    request(url, function(error, response, html) {
        if (!error && response.statusCode == 200) {
            resolve(cheerio.load(html));
        } else {
            reject();
        }
    }
});


let getYelpPage = name => reqp("http://www.yelp.com/biz/"+name);
let parseYelpPage = ($) => ({
    name : $('h1.biz-page-title').first().text().trim(),
    count : Number($('span.review-count').children().text()),
    users : $('div.review-list a.user-display-name').map((i, element) => $(element).text()),
    revs: $('div.review-list div.review-content p').map((i, element) => $(element).text())
});

let parseOpenTable = ($) => ({
    name : $('h1.biz-page-title').first().text().trim(),
    count : Number($('span.review-count').children().text()),
    users : $('div.review-list a.user-display-name').map((i, element) => $(element).text()),
    revs: $('div.review-list div.review-content p').map((i, element) => $(element).text())
});

getYelpPage("garaje-san-francisco")
    .then(parseYelpPage)
    .then(function(result) {
        return result.name;
    })
    .then(result => result.name)
    .then(name => reqp("open/"+/name).then(parseOpenTablePage))



var x=12;
var y=15;
return {x:x, y: y};
return {x:x,y:y};


// Promise

loadUser(id)
    .map(user => user.map(u => u.name))


// int => Promise<Option<User>>



loadUser(id)
    .flatMap(user => loadPrimaryCareDoctor(user))

// int => Promise<Option<Physician>>

// monad: Haskel, Scala
// Promise