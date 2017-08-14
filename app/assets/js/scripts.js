/*!
 * fastshell
 * Fiercely quick and opinionated front-ends
 * https://HosseinKarami.github.io/fastshell
 * @author Hossein Karami
 * @version 1.0.5
 * Copyright 2017. MIT licensed.
 */
(function ($, window, document, undefined) {
  
    'use strict';
  
      //Hide/Show - Wdw 
      function hideWindowsAndShowOneWindow(sWindowId) {
        $('.wdw').hide(); //fadeout 500 
        $('#' + sWindowId).show(); // fade in 500 
      }
  

      //Storing events 
      var aEvents = []; 
  
      //Chekking for local storage 
      if (localStorage.sEvents) {
        // read the text from the local storage
        // convert that text into an object
        var sEventsFromLocalStorage = localStorage.sEvents; 
        aEvents = JSON.parse(sEventsFromLocalStorage);     
      }
  
  
    $(function () { //Performance in here --> load async first priority 
      // FastShell
    });
  
  
   
  
  //Create 
  /**********************************************************************/
  //Adds events to search -- schedule calendar 
  /**********************************************************************/
  
    for (var i = 0; i < aEvents.length; i++) {  //templating 
      //append  
      $('#lblEvents').append(
        '<tr>' +
        '<th scope="row">'+'<h4>'+aEvents[i].id+'</h4>'+'</th>'+
        '<td>'+'<h4>'+aEvents[i].name+'</h4>'+'</td>'+
        //'<td class="eventPrice">'+eventPriceChange+'</td>'+
        '<td><i class="fa fa-trash" aria-hidden="true"></i></td>'+
        '</tr>'); 	
      }
  
  
      //Add new Event
    $('#postbtn').on('click', function() {
  
      var sEventId = new Date().getTime();
      var sImageUrl = $('#inputpostimg').val();
      var spostevent = $('#inputpostevent').val();
      var sPostDesc = $('#inputpostdesc').val();
      var sPostLocation = $('#inputpostlocation').val(); 
      var sLink = 'link';
  
      //Before .calendar-back 
      $('#lblEvents').append(
        '<tr>' + 
          '<td>'+spostevent+'</td>'+
          '<td>'+sPostLocation+'</td>'+
          '<td>'+sEventId+'</td>'+
          '<td>'+sLink+'</td>'+
          '<td><i class="fa fa-trash" aria-hidden="true"></i></td>'+
        '</tr>');
  
      hideWindowsAndShowOneWindow('wdw-calendar');
  
  
      var jEvent = {};
      jEvent.id = new Date().getTime();
      jEvent.imageUrl = sImageUrl;
      jEvent.postevent = spostevent;
      jEvent.PostDesc = sPostDesc;
      jEvent.sPostLocation = sPostLocation;
      aEvents.push(jEvent);
      //console.log(aEvents);
      //Save to Local storage
      var sFinalEvents = JSON.stringify(aEvents);
      //update the sEvents to local text
      localStorage.sEvents = sFinalEvents;
  
      //Read from localstorage and update on load the search calendar witho bbjects 
    });
  
  
    $('#lblEvents div').each(function( index ) {
      console.log( index + ': ' + $(this).text());
      $(this).css;
    });
      

  
  /**********************************************************************/
  //Functions 
  /**********************************************************************/
  


    //New Updated Search feature 

    $('#searchEvents').on('click', function () {
      //get input value of #search-engine
      var inputSearchField =  $('#searchfront').val();
      var aInput = inputSearchField.split(" ");
      var jResults = [];

      console.log(aInput);
      //Stop 

      //get instance of localStorage   //MIssing put figure cap into localstorage 
      var jTemp = JSON.parse(localStorage.events);
      
      //check each aInput for a match
      aInput.forEach(function(a) {

        var temp = a;

        jTemp.forEach(function(j){

          var name = j.name;
          var topic = j.topic;
          var level = j.level;
          var org = j.speaker_organization;
          var location = j.location;

          compare(temp, name, j, jResults);
          //compare(temp, topic, j, jResults); //this is an array
          compare(temp, level, j, jResults);
          compare(temp, org, j, jResults);
          //compare(temp, location, j, jResults); //this is a JSON object

        });
      });

      //remove duplicates
      console.log(jResults);

      var jResultsFinal = jResults.filter(function(elem, index, self) {
      return index == self.indexOf(elem);
      });

      console.log(jResultsFinal);

      //clear default items from 
      $('#event-listing').empty();

      var baseNumber = jResultsFinal.length / 3;
      console.log('The base number is: ' + baseNumber);

      //append to DOM
      jResultsFinal.forEach(function(j) {
        var aTopics = j.topic;

        console.log(jResultsFinal.length);
        console.log(j.name);

        //get an instance of an event and append it to the DOM..
        $('#event-listing').append('\
            <div class="event-thirds" data-event-id="' + j.id + '">\
              <div>\
                <h1>' + j.name + '</h1>\
                <h2>' + aTopics + '</h2>\
                <h5>' + j.date.day + '-' + j.date.month + '-' + j.date.year + '</h5>\
              </div>\
            </div>\
          ');


      });
  }); //End new search feature 



  if (localStorage.events == null) {
    //import data from data/events.json
    //input into localStorage.events
    //json file will always have data, which is why this method will always work!
    console.log('localStorage.events is empty');
    $.getJSON('assets/data/events.json').done( function(jData) {
      console.log(jData);

      var sData = JSON.stringify(jData);
      localStorage.events = sData;
      console.log('localStorage.events successfully populated');

      var sEvents = localStorage.events;
      var jEvents = JSON.parse(sEvents);

      jEvents.forEach(function(j) {
        if (jEvents.indexOf(j) <= 9) {
          //start
          console.log("works");

          var aTopics = j.topic;

          $('#event-listing').append('\
              <div class="event-thirds" data-event-id="' + j.id + '">\
                <div>\
                  <h1>' + j.name + '</h1>\
                  <h2>' + aTopics + '</h2>\
                  <h5>' + j.date.day + '-' + j.date.month + '-' + j.date.year + '</h5>\
                </div>\
              </div>\
          ');
        }
      });

      initPopData(); //populate data in event-management table
    });
  } else if (localStorage.events) {
    //load everything from localstorage and populate the div with data..
    console.log("localStorage.events has data");
    
    var sEvents = localStorage.events;
    var jEvents = JSON.parse(sEvents);

    jEvents.forEach(function(j) {
      if (jEvents.indexOf(j) <= 9) {
        //start
        console.log("works");

        var aTopics = j.topic;

        $('#event-listing').append('\
            <div class="event-thirds" data-event-id="' + j.id + '">\
              <div>\
                <h1>' + j.name + '</h1>\
                <h2>' + aTopics + '</h2>\
                <h5>' + j.date.day + '-' + j.date.month + '-' + j.date.year + '</h5>\
              </div>\
            </div>\
        ');
        //end
      }
    });

    initPopData();
  }

  

  function initPopData() {
    //since localstorage will always have values,
    //append all of localstorage's content to the corresponding table
    var jEvents = JSON.parse(localStorage.events);
    jEvents.forEach( function(j) {
      $('#event-listing tbody').append('<tr data-event-id="' + j.id + '">\
										<td>' + j.name + '</td>\
										<td>' + j.topic + '</td>\
										<td>' + j.speaker + '</td>\
										<td>' + j.date.day + ' ' + j.date.month + ' ' + j.date.year + '</td>\
										<td>' + j.time_24h.hour + ':' + j.time_24h.minute + '</td>\
										<td>\
											<i class="fa fa-pencil" id="edit-event-icon" aria-hidden="true"></i>\
											<i class="fa fa-trash" id="delete-event-icon" aria-hidden="true"></i>\
										</td>\
									</tr>\
			');
    });
  }



  function compare(inputVal, dataVal, jObj, jData) {
    var inputValLower = inputVal.toLowerCase();
    var dataValLower = dataVal.toLowerCase();
    var bool = dataValLower.includes(inputValLower);

        if (bool == true) {
          console.log('Match made');
          jData.push(jObj);
        } else {
          console.log('False');
        }
  }
  
  
  //on load
  $(document).ready(function() {
     hideWindowsAndShowOneWindow('wdw-home'); 
     $('#wdw-event-listing').fadeIn(500);
  });
  
  
  function isLoggedIn() {
    //if(localStorage.userCreds){
    $('#linkRegister').fadeOut(500);
    $('#linkLogin').fadeOut(500);
    $('#linkLogout').fadeIn(500);
     //}
  }

  
  function searchEventsHome() {
    var input, filter, figclass , figcap ,location,i;
  
    input = document.getElementById('searchfront');
    filter = input.value.toUpperCase(); 
    figclass = document.getElementById('effect-milo'); 
    figcap = figclass.getElementsByTagName('location');

    console.log(figcap);
    //Loop through all fig captions and hide/show
    for(i = 0; i <  figcap.length; i++) {
      location = figcap[i].getElementById('span')[0];
      console.log(location);
      console.log(figcap[i] + figcap);
  
      if(location) {
        if (location.innerHTML.toUpperCase().indexOf(filter) > -1) {
          figcap[i].style.display = '';
          console.log (figcap[i]);
        } else {
          figcap[i].style.display = 'none';
          console.log(figcap[i]);
        }
      }
    }
  
  }
  
  $('#searchfront').keyup(function() {
    searchEventsHome();
  });

  ///------------------------------------//



  //Serach Events Dynamicialy 
  function searchEvents() {
    // Declare variables 
    var input, filter, table, tr, td, i;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    table = document.getElementById('myTable');
    tr = table.getElementsByTagName('tr');
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName('td')[0];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = '';
        } else {
          tr[i].style.display = 'none';
        }
      } 
    }
  }

    //Search Through Table  Events-> 
    $('#myInput').keyup(function() {
      searchEvents();
    });
    
  
  function getPost() {
    var sImageUrl = $('#inputpostimg').val();
    var sposttitel = $('#inputposttitel').val();
    var sPostDesc = $('#inputpostdesc').val();
    var sPostLocation = $('#inputpostlocation').val(); 
  
    //console.log(sImageUrl + sposttitel + sPostDesc + sPostLocation);
    
    var Post = {
      'postimageurl':sImageUrl,
      'posttitel': sposttitel,
      'postdesc': sPostDesc,
      'postloc': sPostLocation
    };
  
    //Div append 
    console.log(Post);
    //Converts to objects  

    swal({
      title: 'Event Created!',
      text: 'Dear Techie, Event has been succesfully scheduled',
      imageUrl: 'https://pixabay.com/get/e837b50a2ff5053ed1534705fb0938c9bd22ffd41cb1134695f9c07da2/computer-1245714_1920.jpg',
      imageWidth: 400,
      imageHeight: 200,
      animation: false
    })

  }
  
  
  $(document).ready(function() {
    loginAdmin();
    
  });
  
  function loginAdmin() {
      var userCredsAdmin = {
      'username': 'username',
      'password': 'password'
    };
    localStorage.setItem('credentials', JSON.stringify(userCredsAdmin)); 		 
  }
  
  
  
   /**********************************************************************/
    //Login on page  
    //Authentication is missing - admin - member
    /**********************************************************************/ 
  $('#loginbtn').on('click', function() {
    var credentials = JSON.parse(localStorage.getItem('credentials')); 
    var credentialsMember = JSON.parse(localStorage.getItem('credentialsMember')); 
    var usernameInput = $('#inputusername').val();
    var password = $('#inputpassword').val();
  
    if(credentials.username === usernameInput && credentials.password === password || credentialsMember.username === usernameInput && credentialsMember.password === password ) {
       console.log('Welcome Mr.   ' + credentials.username);
    
       isLoggedIn();
       $('.brand h1').text('HI ' + credentials.username);

        swal(
          'Welcome!',
          "#Tekhus <3 Tech ",
          'success'
        )
    
        hideWindowsAndShowOneWindow('wdw-index');
    } else {
      console.log('failed login');
    }
  
  
  });
  
  
   /**********************************************************************/
    //Register user on page 
    /**********************************************************************/
  $('#memberbtn').on('click', function() {
  
    var inputfname = $('#inputfnamereg').val();
    var inputlname = $('#inputlnamereg').val();
    var inputemail = $('#inputemailreg').val();
    var inputlocation = $('#inputlocationreg').val();
    var inputusername = $('#inputusernamereg').val();
    var inputpass = $('#inputpasswordreg').val();
  
    var userCreds = {
      'fname' : inputfname,
      'lname': inputlname,
      'email':inputemail,
      'location':inputlocation,
      'usernam': inputusername,
      'password': inputpass,
      
    };
  
    localStorage.setItem('credentialsMember', JSON.stringify(userCreds)); 
  
    console.log('Local Storage store', userCreds);
    hideWindowsAndShowOneWindow('wdw-login');
  
  }); 
  
  
  
   /**********************************************************************/
    //Event Listeners 
    /**********************************************************************/
  
    //Post
    $('#postbtn').on('click', function() {
      getPost(); 
    console.log('post event');
    });
  
  //Nav - Login 
  $('#linkLogin').on('click', function() {
     hideWindowsAndShowOneWindow('wdw-login');
      console.log('Nav - login clicked');
  });
  
  //Nav - Home 
  $('#linkHome').on('click', function() {
    hideWindowsAndShowOneWindow('wdw-home');
    console.log('Nav - Home Clicked ');
  });
  
  
  //Nav - Event
  $('#linkEvents').on('click', function() {
    hideWindowsAndShowOneWindow('wdw-events');
    console.log('Nav - Link Event');
  });
  
  
  //Nav - News 
  $('#linkNews').on('click', function() {
    hideWindowsAndShowOneWindow('wdw-news');
    console.log('Nav - News clicked');
  });
  
  //Nav - Calendar 
  $('#linkCalendar').on('click', function() {
    hideWindowsAndShowOneWindow('wdw-calendar');
    console.log('Nav - Calendar clicked');
  });
  
  //Nav - All Events 
  $('#linkAllEvents').on('click', function() {
    hideWindowsAndShowOneWindow('wdw-all-events');
    console.log('Nav - all events click');
  });
  
  
  //Page - Post an event 
  $('#btnpostevent').on('click', function() {
    hideWindowsAndShowOneWindow('wdw-post-event');
    console.log('Postclicke');
  });
  
  //Post new event from INDex
  $('#postnewevent').on('click', function() {
    hideWindowsAndShowOneWindow('wdw-post-event');
    console.log('Post new event clicked ');
  });

  //Remove Event
  aEvents.indexOf(this); 
  
  $('.fa-fa-trash').click(function() {
    console.log('Trashed clicked', aEvents, aEvents[i], aEvents.length);
    aEvents.splice(1,1);
  });


  //Manage Events 
  $('#manage-events').on('click', function() {
    hideWindowsAndShowOneWindow('wdw-manage-events');
    console.log('manage events clicked ');
  });
  
  //Manage users 
  $('#manage-users').on('click', function() {
    hideWindowsAndShowOneWindow('wdw-manage-users');
    console.log('manage users clicked ');
  });

  // Manage members 
  $('#registermember').on('click', function() {
    // hideWindowsAndShowOneWindow('wdw-manage-members'); 
    hideWindowsAndShowOneWindow('wdw-index'); 
    console.log('manage-members clicked');
  });


$('#linkpartnere').on('click', function() {
  hideWindowsAndShowOneWindow('wdw-partnere'); 
  console.log('partner link clicked ');
});


  //Trash Delete search events
  $('.fa-fa-trash').click(function() {
    $(this).parent().hide();
    console.log('Trash delete clicked ');
  });
  
  // //Delete hide event 
  // $('.d1').on('click', function() {
  //   $(this).parent.hide();
  //   console.log('hiding this ');
  // });
  
  // $('td.hide_on_click').live('click', function(){
  //   // PICK ONE OF THESE:
  //   // $(this).parent('tr').remove(); //completely destroy the tr (remove from DOM)
  //   $(this).parent('tr').hide(); //just hide it from the user
  // });



$('#figure1').on('click', function() {
  swal({
    title: 'Spark Summit ',
    html:
      '<div style="width: 100%"><iframe width="100%" height="600" src="https://www.mapsdirections.info/en/custom-google-maps/map.php?width=100%&height=600&hl=ru&q=San%20fransico+(Spark%20SUmmit%20)&ie=UTF8&t=&z=13&iwloc=A&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"><a href="https://www.mapsdirections.info/en/custom-google-maps/">Create a custom Google Map</a> by <a href="https://www.mapsdirections.info/en/">UK Maps</a></iframe></div><br />',
    showCloseButton: true,
    showCancelButton: true,
    confirmButtonText:
      '<i class="fa fa-thumbs-up"></i> Great!',
    cancelButtonText:
      '<i class="fa fa-thumbs-down"></i>'
  })  
});



$('#figure4').on('click', function() {
  swal({
    title: 'Web Summit ',
    html:
            '<div style="width: 100%"><iframe width="100%" height="600" src="https://www.mapsdirections.info/en/custom-google-maps/map.php?width=100%&height=600&hl=ru&q=lisbon%20portugal+(Web%20Summit%20)&ie=UTF8&t=&z=14&iwloc=A&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"><a href="https://www.mapsdirections.info/en/custom-google-maps/">Create a custom Google Map</a> by <a href="https://www.mapsdirections.info/en/">UK Maps</a></iframe></div><br />',
    showCloseButton: true,
    showCancelButton: true,
    confirmButtonText:
      '<i class="fa fa-thumbs-up"></i> Great!',
    cancelButtonText:
      '<i class="fa fa-thumbs-down"></i>'
  })  
});


$('#figure2').on('click', function() {
  swal({
    title: 'Big Data ',
    html:'<div style="width: 100%"><iframe width="100%" height="600" src="https://www.mapsdirections.info/en/custom-google-maps/map.php?width=100%&height=600&hl=ru&q=Toronto%20canada+(Web%20Summit%20)&ie=UTF8&t=&z=14&iwloc=A&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"><a href="https://www.mapsdirections.info/en/custom-google-maps/">Create a custom Google Map</a> by <a href="https://www.mapsdirections.info/en/">UK Maps</a></iframe></div><br />',
    showCloseButton: true,
    showCancelButton: true,
    confirmButtonText:
      '<i class="fa fa-thumbs-up"></i> Great!',
    cancelButtonText:
      '<i class="fa fa-thumbs-down"></i>'
  })  
});



  //  // When the window has finished loading create our google map below
  //  google.maps.event.addDomListener(window, 'load', init);
   
  //      function init() {
  //          // Basic options for a simple Google Map
  //          // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
  //          var mapOptions = {
  //              // How zoomed in you want the map to start at (always required)
  //              zoom: 11,

  //              // The latitude and longitude to center the map (always required)
  //              center: new google.maps.LatLng(40.6700, -73.9400), // New York

  //              // How you would like to style the map. 
  //              // This is where you would paste any style found on Snazzy Maps.
  //              styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
  //          };

  //          // Get the HTML DOM element that will contain your map 
  //          // We are using a div with id="map" seen below in the <body>
  //          var mapElement = document.getElementById('map');

  //          // Create the Google Map using our element and options defined above
  //          var map = new google.maps.Map(mapElement, mapOptions);

  //          // Let's also add a marker while we're at it
  //          var marker = new google.maps.Marker({
  //              position: new google.maps.LatLng(40.6700, -73.9400),
  //              map: map,
  //              title: 'Snazzy!'
  //          });
  //      }



  
  })(jQuery, window, document);
  