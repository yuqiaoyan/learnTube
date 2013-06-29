var timerT = 0;
var numIntervals = 0;
var segment = new Object();
var wordsData;
var wordsIndex = 0;


function getWords(videoID,cb){
      //pass videoID to backend and get 
      $.ajax({
        dataType:"json",
        url: 'data/6uwVhn-APsQ.json',
        success: function(data){
          console.log("+JSON data received")
          wordsData = data;
          cb();
        }
      })
        /*$.getJSON('data/6uwvhn-APsQ.json', function(data) {
          wordsData = data;
          success: function(){
            cb();
          //console.log('JSON data received:', wordsData);
          }
      });*/
}



// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
var videoLoc = "6uwVhn-APsQ";

function onYouTubeIframeAPIReady() {
  console.log("this is videoLoc " + videoLoc)
  player = new YT.Player('player', {
    height: '360',
    width: '640',
    videoId: videoLoc,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
  
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  var videoID = "6uwvhn-APsQ";
  
  //---------------- GET JSON FILE --------------//
  getWords(videoID,function(){
      console.log("+player started")
      event.target.playVideo();
      segment.startTime = 0;

      //maintain intervals
      segment.timeInterval = 10;
      segment.endTime = segment.startTime + segment.timeInterval;
      
      segment.totalVideoTime = player.getDuration();
      segment.currVideoTime = 0;
      
      console.log(segment);
      timerT = setInterval(getVideoTime,3000); //check video time at every ten seconds
      //getVideoTime();

  });   


  
  

  
  //
  
  

  /*while(currVideoTime < totalVideoTime){
    //update the current video time every ten seconds
    setTimeout(currVideoTime = getVideoTime(startTime),10000); 
    
    if(currVideoTime > endTime){
      //get next set of words
      console.log("get next set of words")

      //update our time segment
      startTime = endTime;
      endTime = startTime + timeInterval;
    }
    else{
      //do nothing
      console.log("video ended")
    }words

  }*/

}

function getVideoTime(){
  console.log("+getVideoTime");
  console.log("numIntervals: " + numIntervals);
  numIntervals +=1;
  if(timerT != null){
    console.log("setting interval")
  }
  //console.log("this is segment");
  //console.log(segment);
  if(segment.currVideoTime < segment.totalVideoTime){
      //get next set of words
      console.log("+pre-traverse JSON");
      console.log(wordsData[wordsIndex]);
      console.log("endTime: " + segment.endTime);
      //console.log("currVideoTime: " + segment.endTime);
      console.log("current video time" + segment.currVideoTime)
      
      if(segment.currVideoTime < segment.endTime){
        //do nothing we can print words if the wordsData[wordsIndex].time < segment.endTime
      }
      //the video's current time got ahead of our end time
      
      if(segment.currVideoTime > segment.endTime){
        console.log("+PLAYER IS AHEAD OF OUR END TIME")
        //update the end time
         segment.startTime = segment.endTime;
         segment.endTime = segment.currVideoTime + segment.timeInterval;
      }

      while(wordsData[wordsIndex] != null && wordsData[wordsIndex].time < segment.endTime){
            //wordsIndex++;
          console.log("+PRINT WORDS")

          $.each(wordsData[wordsIndex].words, function(index,value){
                $('<p>'+value+'</p>').appendTo('.words');                
          })
          wordsIndex++;
            
      }

      // console.log("get next set of words")
  }

     /* //update our time segment if the video segment has moved      
      if(segment.currVideoTime > segment.endTime){
        segment.startTime = segment.endTime;
        segment.endTime = segment.startTime + segment.timeInterval;
        console.log(segment)
      }
      
      
    }
  
  */
  //we are at the end of the video
  else{
    console.log("video ended")
    console.log("this is segment.currVideoTime");
    console.log(segment.currVideoTime);
    console.log("this is segment.totalVideoTime");
    console.log(segment.totalVideoTime);
    clearInterval(timerT);
  }
  
  segment.currVideoTime = player.getCurrentTime();


   //console.log(player.getCurrentTime());
   //return player.getCurrentTime();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    console.log("We detected a player state change")
   
  /*
  console.log(player.getDuration()); //displays the total seconds of video*/
  
  
  //  setTimeout(stopVideo, 46000);
//    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}
