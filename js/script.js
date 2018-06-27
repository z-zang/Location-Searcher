
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // Get Google Map image background and set it
    var gMapsUrl ='http://maps.googleapis.com/maps/api/streetview?size=600x400&location='
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ',' + cityStr;
    $body.append('<img class="bgimg" src="' + gMapsUrl + address +'">');

    // Get NYtimes articles
    var NYurl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    NYurl += '?' + $.param({
      'api-key': "c30bc2661f5246e2afd81364198f8ae7",
      'q': cityStr + " " + streetStr
    });

    $.getJSON(NYurl, function(data) {

      $.each( data.response.docs, function( key, val ) {

        var newNYT =
        `<div class="article">
        <h2>${val.headline.main}</2>
        <h4>${val.byline.original}</h4>
        <p>${val.snippet}</p>
        <a href="${val.web_url}" target="_blank" class="btn">View Article</a>
        </div>
        `
        $( "#nytimes-articles" ).append(newNYT);

      });

      }).fail(function(){
      console.log("error");
      $( "#nytimes-header" ).text("<h1>New York Times Articles could not be loaded</h1>")});


      // Get Wikipedia articles
      var wikiURL = 'https://en.wikipediaasdf.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&formatversion=2&origin=*&callback=wikiCallback';

      $.ajax({
        dataType: "jsonp",
        url: wikiURL,
        success: function(data){

          $.each( data[1], function(key, val) {

            var newWiki =
            `
            <a href="${data[3][key]}" target="_blank" class="btn">${data[1][key]}</a>
            <br>
            `;

            $( "#wikipedia-links" ).append(newWiki);

          })

        }
      });

    return false;
};

$('#form-container').submit(loadData);
