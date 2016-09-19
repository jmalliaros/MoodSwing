/**
 * Image methods controller
 */

var fs = require('fs')
var indico = require('indico.io')
indico.apiKey = 'e77398fb1e34de03ac0b22d09d5fd21a'
var request = require('request-promise')
var path = require('path')

var songMood = []
var songlist = ["song1","song1","song1","song1","song1","song1","song1"]; //mp3 files
var c = [1,1,0.8,1,1,1,0.2,1,1,1,0.2,0.4];

//obtained using feature request in spotify
var songFeatures = {
  "audio_features" : [ {
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
    "danceability" : 0.448,
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
    "danceability" : 0.752,
    "energy" : 0.757,
    "key" : 1,
    "loudness" : -6.819,
    "mode" : 1,
    "speechiness" : 0.153,
    "acousticness" : 0.286,
    "instrumentalness" : 0,
    "liveness" : 0.0886,
    "valence" : 0.862,
    "tempo" : 149.911,
    "type" : "audio_features",
    "id" : "6NPVjNh8Jhru9xOmyQigds",
    "uri" : "spotify:track:6NPVjNh8Jhru9xOmyQigds",
    "track_href" : "https://api.spotify.com/v1/tracks/6NPVjNh8Jhru9xOmyQigds",
    "analysis_url" : "https://api.spotify.com/v1/audio-analysis/6NPVjNh8Jhru9xOmyQigds",
    "duration_ms" : 233305,
    "time_signature" : 4
  }, {
    "danceability" : 0.436,
    "energy" : 0.375,
    "key" : 6,
    "loudness" : -13.856,
    "mode" : 1,
    "speechiness" : 0.0284,
    "acousticness" : 0.165,
    "instrumentalness" : 0,
    "liveness" : 0.294,
    "valence" : 0.496,
    "tempo" : 107.386,
    "type" : "audio_features",
    "id" : "6goeZIjtOmlhX9gp1rh4X3",
    "uri" : "spotify:track:6goeZIjtOmlhX9gp1rh4X3",
    "track_href" : "https://api.spotify.com/v1/tracks/6goeZIjtOmlhX9gp1rh4X3",
    "analysis_url" : "https://api.spotify.com/v1/audio-analysis/6goeZIjtOmlhX9gp1rh4X3",
    "duration_ms" : 184880,
    "time_signature" : 4
  }, {
    "danceability" : 0.767,
    "energy" : 0.830,
    "key" : 0,
    "loudness" : -5.715,
    "mode" : 1,
    "speechiness" : 0.0749,
    "acousticness" : 0.0123,
    "instrumentalness" : 0,
    "liveness" : 0.191,
    "valence" : 0.745,
    "tempo" : 113.030,
    "type" : "audio_features",
    "id" : "6JV2JOEocMgcZxYSZelKcc",
    "uri" : "spotify:track:6JV2JOEocMgcZxYSZelKcc",
    "track_href" : "https://api.spotify.com/v1/tracks/6JV2JOEocMgcZxYSZelKcc",
    "analysis_url" : "https://api.spotify.com/v1/audio-analysis/6JV2JOEocMgcZxYSZelKcc",
    "duration_ms" : 236002,
    "time_signature" : 4
  }, {
    "danceability" : 0.316,
    "energy" : 0.945,
    "key" : 4,
    "loudness" : -3.169,
    "mode" : 0,
    "speechiness" : 0.124,
    "acousticness" : 0.00895,
    "instrumentalness" : 0.00000185,
    "liveness" : 0.396,
    "valence" : 0.303,
    "tempo" : 189.931,
    "type" : "audio_features",
    "id" : "0COqiPhxzoWICwFCS4eZcp",
    "uri" : "spotify:track:0COqiPhxzoWICwFCS4eZcp",
    "track_href" : "https://api.spotify.com/v1/tracks/0COqiPhxzoWICwFCS4eZcp",
    "analysis_url" : "https://api.spotify.com/v1/audio-analysis/0COqiPhxzoWICwFCS4eZcp",
    "duration_ms" : 235893,
    "time_signature" : 4
  }, {
    "danceability" : 0.649,
    "energy" : 0.815,
    "key" : 3,
    "loudness" : -3.796,
    "mode" : 0,
    "speechiness" : 0.0415,
    "acousticness" : 0.00125,
    "instrumentalness" : 0.0000431,
    "liveness" : 0.671,
    "valence" : 0.774,
    "tempo" : 126.030,
    "type" : "audio_features",
    "id" : "455AfCsOhhLPRc68sE01D8",
    "uri" : "spotify:track:455AfCsOhhLPRc68sE01D8",
    "track_href" : "https://api.spotify.com/v1/tracks/455AfCsOhhLPRc68sE01D8",
    "analysis_url" : "https://api.spotify.com/v1/audio-analysis/455AfCsOhhLPRc68sE01D8",
    "duration_ms" : 230747,
    "time_signature" : 4
  }, {
    "danceability" : 0.806,
    "energy" : 0.609,
    "key" : 0,
    "loudness" : -7.223,
    "mode" : 1,
    "speechiness" : 0.0824,
    "acousticness" : 0.00801,
    "instrumentalness" : 0.0000815,
    "liveness" : 0.0344,
    "valence" : 0.832,
    "tempo" : 114.988,
    "type" : "audio_features",
    "id" : "32OlwWuMpZ6b0aN2RZOeMS",
    "uri" : "spotify:track:32OlwWuMpZ6b0aN2RZOeMS",
    "track_href" : "https://api.spotify.com/v1/tracks/32OlwWuMpZ6b0aN2RZOeMS",
    "analysis_url" : "https://api.spotify.com/v1/audio-analysis/32OlwWuMpZ6b0aN2RZOeMS",
    "duration_ms" : 269667,
    "time_signature" : 4
  }, {
    "danceability" : 0.599,
    "energy" : 0.490,
    "key" : 7,
    "loudness" : -8.390,
    "mode" : 1,
    "speechiness" : 0.109,
    "acousticness" : 0.308,
    "instrumentalness" : 0.00000326,
    "liveness" : 0.164,
    "valence" : 0.728,
    "tempo" : 143.321,
    "type" : "audio_features",
    "id" : "4ulUxJwGJeCkthwblfTN0j",
    "uri" : "spotify:track:4ulUxJwGJeCkthwblfTN0j",
    "track_href" : "https://api.spotify.com/v1/tracks/4ulUxJwGJeCkthwblfTN0j",
    "analysis_url" : "https://api.spotify.com/v1/audio-analysis/4ulUxJwGJeCkthwblfTN0j",
    "duration_ms" : 166533,
    "time_signature" : 5
  }, {
    "danceability" : 0.344,
    "energy" : 0.325,
    "key" : 11,
    "loudness" : -10.005,
    "mode" : 0,
    "speechiness" : 0.0287,
    "acousticness" : 0.348,
    "instrumentalness" : 0.0239,
    "liveness" : 0.0686,
    "valence" : 0.0801,
    "tempo" : 118.556,
    "type" : "audio_features",
    "id" : "20EpQjfV7B4ZQJkIdHO1Tw",
    "uri" : "spotify:track:20EpQjfV7B4ZQJkIdHO1Tw",
    "track_href" : "https://api.spotify.com/v1/tracks/20EpQjfV7B4ZQJkIdHO1Tw",
    "analysis_url" : "https://api.spotify.com/v1/audio-analysis/20EpQjfV7B4ZQJkIdHO1Tw",
    "duration_ms" : 312307,
    "time_signature" : 4
  }, {
    "danceability" : 0.599,
    "energy" : 0.785,
    "key" : 3,
    "loudness" : -4.013,
    "mode" : 1,
    "speechiness" : 0.0309,
    "acousticness" : 0.448,
    "instrumentalness" : 0.00336,
    "liveness" : 0.151,
    "valence" : 0.534,
    "tempo" : 140.046,
    "type" : "audio_features",
    "id" : "0mUyMawtxj1CJ76kn9gIZK",
    "uri" : "spotify:track:0mUyMawtxj1CJ76kn9gIZK",
    "track_href" : "https://api.spotify.com/v1/tracks/0mUyMawtxj1CJ76kn9gIZK",
    "analysis_url" : "https://api.spotify.com/v1/audio-analysis/0mUyMawtxj1CJ76kn9gIZK",
    "duration_ms" : 233640,
    "time_signature" : 4
  } ]
}

// some hacky shit
function init(){
    //fill songmood array for each song
    for(var i = 0; i < songFeatures.audio_features.length; i++) {
      songMood.push((((c[6]*songFeatures.audio_features[i].danceability 
        +c[7]*songFeatures.audio_features[i].mode
        +c[8]*songFeatures.audio_features[i].tempo
        +c[9]*songFeatures.audio_features[i].valence) /
        Math.sqrt(c[6]*Math.pow(songFeatures.audio_features[i].danceability,2)
          +Math.pow(c[7]*songFeatures.audio_features[i].mode,2)
          +Math.pow(c[8]*songFeatures.audio_features[i].tempo,2)
          +Math.pow(c[9]*songFeatures.audio_features[i].valence,2)))-1)*100);
    }
}

init();

module.exports = {

  /**
   * Endpoint that returns the current uploaded image
   * @param  {[object]} req
   * @param  {[object]} res
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

        var mood = 0;
        var dur = 0;
        var lastValue = 1;
        var songIndex = 0;
        data.emotion = dominantEmotion(data)

        //Mathematical Model for mood from face
        mood = (c[0]*data.scores.happiness
                -c[1]*data.scores.sadness
                -c[2]*data.scores.anger
                // -c[3]*data.scores.fear
                // +c[4]*data.scores.surprise
                +c[11]*data.scores.neutral)/
                (Math.pow(c[0]*data.scores.happiness,2)
                +Math.pow(c[1]*data.scores.sadness,2)
                +Math.pow(c[2]*data.scores.anger,2)
                +Math.pow(c[11]*data.scores.neutral,2))-0.5
        
        data.mood = mood
        
        // alter duration based on satisfaction 
        // dur = c[5]*data.scores.contempt
        //         *data.scores.neutral / data.scores.disgust
                
        console.log(songMood)
        //for each song, check if mood is close to song mood 
        songMood.forEach(function(el, i, arr) {
            
            if (Math.abs(mood-el) < lastValue){
                lastValue = Math.abs(mood-el);
                songIndex = i;
            }
            if (i = arr.length - 1){
                //return songIdex
                data.songIndex = songIndex
            }
        })
        
        console.log(data)
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
