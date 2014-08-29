var videoUrl = 'http://www.youtube.com/watch?v=';

var playlist = {
  games: {
    title: 'AVGN Episodes HD',
    id: 'PLbQ-gSLYQEc43owAPTm0JgQufGvCYW0Ap'
  }
};

function getURLForId(id) {
  return 'http://gdata.youtube.com/feeds/api/playlists/' + id + '?v=2&alt=json&callback=?';
}

function fetchPlaylist(id) {
  var url = getURLForId(id);
  
  
  $.getJSON(url, function(data) {
    var list_data= [];
    $.each(data.feed.entry, function(i, item) {
        var feedTitle = item.title.$t;
        var feedURL = item.link[1].href;
        var fragments = feedURL.split("/");
        var videoID = fragments[fragments.length - 2];
        var url = videoUrl + videoID;
        var thumb = "http://img.youtube.com/vi/"+ videoID +"/default.jpg";
        list_data.push('<h3>' + feedTitle + '</h3>');
        list_data.push('<li><a href="', url, ' "title="', feedTitle, '"><img alt="', feedTitle, '" src="', thumb, '"</a></li>');
    });

    document.getElementById('cont').innerHTML = list_data.join(' ');
  });
}

fetchPlaylist(playlist.games.id);

