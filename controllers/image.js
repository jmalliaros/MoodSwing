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
var songMood = 0;

var songFeatures = { audio_features: 
   [ { "danceability": 0.808,
       "energy": 0.626,
       "key": 7,
       "loudness": -12.733,
       "mode": 1,
       "speechiness": 0.168,
       "acousticness": 0.00187,
       "instrumentalness": 0.159,
       "liveness": 0.376,
       "valence": 0.369,
       "tempo": 123.99,
       "type": "audio_features",
       "id": "4JpKVNYnVcJ8tuMKjAj50A",
       "uri": "spotify:track:4JpKVNYnVcJ8tuMKjAj50A",
       "track_href": "https://api.spotify.com/v1/tracks/4JpKVNYnVcJ8tuMKjAj50A",
       "analysis_url": "http://echonest-analysis.s3.amazonaws.com/TR/WhpYUARk1kNJ_qP0AdKGcDDFKOQTTgsOoINrqyPQjkUnbteuuBiyj_u94iFCSGzdxGiwqQ6d77f4QLL_8=/3/full.json?AWSAccessKeyId=AKIAJRDFEY23UEVW42BQ&Expires=1458063189&Signature=JRE8SDZStpNOdUsPN/PoS49FMtQ%3D",
       "duration_ms": 535223,
       "time_signature": 4 
     }]};

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
        console.log(err);
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
          url: 'http://b8de3098.ngrok.io/images'

        },
        json: true
      }

      return request(options)
      .then(function(data) {
        //console.log('azure data:', data);
 
        faceEmotion = data;
        //console.log(faceEmotion[0].scores.happiness*100);
          
        //Mathematical Model for mood from face
        mood = c[0]*faceEmotion[0].scores.happiness
                -c[1]*faceEmotion[0].scores.sadness
                -c[2]*faceEmotion[0].scores.anger
                -c[3]*faceEmotion[0].scores.fear
                +c[4]*faceEmotion[0].scores.surprise
                +c[10];
        
        console.log("mood: " + mood);
        
        //alter duration based on satisfaction 
        dur = c[5]*faceEmotion[0].scores.contempt
                *faceEmotion[0].scores.neutral
                /faceEmotion[0].scores.disgust;
        
        console.log(dur + " seconds");
        //console.log(songFeatures.audio_features[0]);
        songMood = c[6]*songFeatures.audio_features[0].danceability 
                    +c[7]*songFeatures.audio_features[0].mode
                    +c[8]*songFeatures.audio_features[0].tempo
                    +c[9]*songFeatures.audio_features[0].valence;
        
        console.log("song mood: " + songMood);
        res.status(200).json(data)
      })
      .catch(function(err) {
        console.log('error:', err.error)
        res.status(500).json(err.error)
      })
      
      
    });
      
    

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
var processEmotions = function(result) {
  var emotion
  var high = 0

  for (var key in result) {
    if (result[key] > high) {
      emotion = key
    }
  }

  return { emotion: emotion }
}
