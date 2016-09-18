/**
 * Image methods controller
 */

var fs = require('fs')
var indico = require('indico.io')
indico.apiKey = 'e77398fb1e34de03ac0b22d09d5fd21a'
var request = require('request-promise')
var path = require('path')
var faceEmotion = [];
var c = [1,1,1,1,1,1,1,1,1,1,0.2];
var mood = 0;
var dur = 0;
var songMood = [];
var lastValue = 1;
var songIndex = 0;

var songlist = ["song1","song1","song1","song1","song1","song1","song1"]; //mp3 files

//obtained using feature request in spotify
var songFeatures = {
  "audio_features" : [ {
    "danceability" : 0.463,
    "energy" : 0.804,
    "key" : 4,
    "loudness" : -5.222,
    "mode" : 0,
    "speechiness" : 0.140,
    "acousticness" : 0.0697,
    "instrumentalness" : 0.00873,
    "liveness" : 0.0659,
    "valence" : 0.215,
    "tempo" : 139.904,
    "type" : "audio_features",
    "id" : "6ce17pZwsMcYNab5IaC5MQ",
    "uri" : "spotify:track:6ce17pZwsMcYNab5IaC5MQ",
    "track_href" : "https://api.spotify.com/v1/tracks/6ce17pZwsMcYNab5IaC5MQ",
    "analysis_url" : "https://api.spotify.com/v1/audio-analysis/6ce17pZwsMcYNab5IaC5MQ",
    "duration_ms" : 189973,
    "time_signature" : 4
  }, {
    "danceability" : 0.307,
    "energy" : 0.425,
    "key" : 11,
    "loudness" : -8.924,
    "mode" : 0,
    "speechiness" : 0.0372,
    "acousticness" : 0.271,
    "instrumentalness" : 0.0000309,
    "liveness" : 0.110,
    "valence" : 0.136,
    "tempo" : 108.693,
    "type" : "audio_features",
    "id" : "2nMeu6UenVvwUktBCpLMK9",
    "uri" : "spotify:track:2nMeu6UenVvwUktBCpLMK9",
    "track_href" : "https://api.spotify.com/v1/tracks/2nMeu6UenVvwUktBCpLMK9",
    "analysis_url" : "https://api.spotify.com/v1/audio-analysis/2nMeu6UenVvwUktBCpLMK9",
    "duration_ms" : 236053,
    "time_signature" : 4
  }, {
    "danceability" : 0.682,
    "energy" : 0.595,
    "key" : 5,
    "loudness" : -11.860,
    "mode" : 1,
    "speechiness" : 0.0376,
    "acousticness" : 0.0185,
    "instrumentalness" : 0.00837,
    "liveness" : 0.344,
    "valence" : 0.661,
    "tempo" : 125.982,
    "type" : "audio_features",
    "id" : "1DXK8xsl8K7guWFRbddoVv",
    "uri" : "spotify:track:1DXK8xsl8K7guWFRbddoVv",
    "track_href" : "https://api.spotify.com/v1/tracks/1DXK8xsl8K7guWFRbddoVv",
    "analysis_url" : "https://api.spotify.com/v1/audio-analysis/1DXK8xsl8K7guWFRbddoVv",
    "duration_ms" : 239341,
    "time_signature" : 4
  }, {
    "danceability" : 0.732,
    "energy" : 0.396,
    "key" : 4,
    "loudness" : -9.348,
    "mode" : 0,
    "speechiness" : 0.0286,
    "acousticness" : 0.0841,
    "instrumentalness" : 0.0000358,
    "liveness" : 0.105,
    "valence" : 0.547,
    "tempo" : 90.024,
    "type" : "audio_features",
    "id" : "6i0V12jOa3mr6uu4WYhUBr",
    "uri" : "spotify:track:6i0V12jOa3mr6uu4WYhUBr",
    "track_href" : "https://api.spotify.com/v1/tracks/6i0V12jOa3mr6uu4WYhUBr",
    "analysis_url" : "https://api.spotify.com/v1/audio-analysis/6i0V12jOa3mr6uu4WYhUBr",
    "duration_ms" : 195920,
    "time_signature" : 4
  }, {
    "danceability" : 0.748,
    "energy" : 0.524,
    "key" : 8,
    "loudness" : -5.599,
    "mode" : 1,
    "speechiness" : 0.0338,
    "acousticness" : 0.414,
    "instrumentalness" : 0,
    "liveness" : 0.111,
    "valence" : 0.635,
    "tempo" : 95.010,
    "type" : "audio_features",
    "id" : "7BKLCZ1jbUBVqRi2FVlTVw",
    "uri" : "spotify:track:7BKLCZ1jbUBVqRi2FVlTVw",
    "track_href" : "https://api.spotify.com/v1/tracks/7BKLCZ1jbUBVqRi2FVlTVw",
    "analysis_url" : "https://api.spotify.com/v1/audio-analysis/7BKLCZ1jbUBVqRi2FVlTVw",
    "duration_ms" : 244960,
    "time_signature" : 4
  }, {
    "danceability" : 0.647,
    "energy" : 0.924,
    "key" : 10,
    "loudness" : -4.957,
    "mode" : 1,
    "speechiness" : 0.330,
    "acousticness" : 0.250,
    "instrumentalness" : 0,
    "liveness" : 0.519,
    "valence" : 0.608,
    "tempo" : 173.962,
    "type" : "audio_features",
    "id" : "15JINEqzVMv3SvJTAXAKED",
    "uri" : "spotify:track:15JINEqzVMv3SvJTAXAKED",
    "track_href" : "https://api.spotify.com/v1/tracks/15JINEqzVMv3SvJTAXAKED",
    "analysis_url" : "https://api.spotify.com/v1/audio-analysis/15JINEqzVMv3SvJTAXAKED",
    "duration_ms" : 263373,
    "time_signature" : 4
  }, {
    "danceability" : 0.923,
    "energy" : 0.508,
    "key" : 1,
    "loudness" : -8.668,
    "mode" : 1,
    "speechiness" : 0.0468,
    "acousticness" : 0.104,
    "instrumentalness" : 0.0000121,
    "liveness" : 0.126,
    "valence" : 0.193,
    "tempo" : 108.039,
    "type" : "audio_features",
    "id" : "4bdJHQp90ymjEIkkYhcENB",
    "uri" : "spotify:track:4bdJHQp90ymjEIkkYhcENB",
    "track_href" : "https://api.spotify.com/v1/tracks/4bdJHQp90ymjEIkkYhcENB",
    "analysis_url" : "https://api.spotify.com/v1/audio-analysis/4bdJHQp90ymjEIkkYhcENB",
    "duration_ms" : 126667,
    "time_signature" : 4
  } ]
}


function init(){
    //fill songmood array for each song
    for(var i = 0; i < songlist.length; i++) {
       songMood.push(((c[6]*songFeatures.audio_features[i].danceability 
            +c[7]*songFeatures.audio_features[i].mode
            +c[8]*songFeatures.audio_features[i].tempo
            +c[9]*songFeatures.audio_features[i].valence)
            /Math.sqrt(Math.pow(songFeatures.audio_features[i].danceability,2)
                      +Math.pow(songFeatures.audio_features[i].mode,2)
                      +Math.pow(songFeatures.audio_features[i].tempo,2)
                      +Math.pow(songFeatures.audio_features[i].valence,2))-1)*10);
    }
    console.log(songMood);
}

init();

module.exports = {

  /**
   * [get description]
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  get: function(req, res) {
    return res.sendFile(path.join(__dirname, '../uploads/out.png'))
  },

  /**
   * Endpoint that expects binary data for an image to be
   * forwarded to the indico.io/azure API and analyzed.
   * Processes the json result and returns the dominant
   * emotion as a string.
   * @param  {[object]} req
   * @param  {[object]} res
   */
  post: function (req, res) {
    if (!req.body.imageURI) {
      return res.status(400).json({ error: "Missing imageURI" })
    }

    var base64Data = req.body.imageURI.replace(/^data:image\/png;base64,/, "")

    fs.writeFile(__dirname + '/../uploads/out.png', base64Data, 'base64', function(err) {
      if (err) {
        console.log(err)
        return res.status(500).json(err.error)
      } 
      
      var options = {
        method: 'POST',
        uri: 'https://api.projectoxford.ai/emotion/v1.0/recognize',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': '38201310d25f4271b7e80d2b28a9ba17'
        },
        body: {
          url: 'https://0e295bdc.ngrok.io/images'
        },
        json: true
      }

      return request(options)
      .then(function(data) {
        data = data[0]

        if (!data) {
          return res.sendStatus(200).json(data)
        }

        var c = [1,1,1,1,1,1,1,1,1,1,0.2]
        var mood = 0
        var dur = 0
        var songMood = 0
        data.emotion = dominantEmotion(data)

        //Mathematical Model for mood from face
        mood = c[0]*data.scores.happiness
                -c[1]*data.scores.sadness
                -c[2]*data.scores.anger
                -c[3]*data.scores.fear
                +c[4]*data.scores.surprise
                +c[10]
        
        data.mood = mood
        
        // alter duration based on satisfaction 
        // dur = c[5]*data.scores.contempt
        //         *data.scores.neutral / data.scores.disgust
        
        console.log(dur + " seconds");
        
        //for each song, check if mood is close to song mood 
        songMood.forEach(function(el, i, arr) {
            
            if (Math.abs(mood-el) < lastValue){
                lastValue = Math.abs(mood-el);
                console.log(mood-el);
                songIndex = i;
            }
            if (i = arr.length - 1){
                //return songIdex
                console.log(songIndex);
            }
        });  
        
        console.log("song mood: " + songMood);

        res.status(200).json(data)
      })
      .catch(function(err) {
        console.log('error:', err)
        res.status(500).json(err.error)
      })
      
      
    })
      
    

    // return indico.fer(base64Data)
    // .then(function(data) {
    //   res.status(200).json(processEmotionsbase64Data(data))
    //   return
    // })
    // .catch(function(err) {
    //   res.status(500).json(err.error)
    //   return
    // })
  }
}

/**
 * Takes an object of emotions and
 * their associated values and returns
 * the dominant one
 * @param  {[object]} result
 * @return {[string]}
 */
var dominantEmotion = function(result) {
  if (!result) {
    return
  }

  var emotion
  var high = 0
  var scores = result.scores

  for (var key in scores) {
    if (scores[key] > high) {
      emotion = key
      high = scores[key]
    }
  }

  return emotion
}
