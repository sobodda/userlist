function createTableRow(cellValueArray, tag){
    therow = document.createElement("tr");
    for (var k = 0; k < cellValueArray.length; k++) {
        var thecell = document.createElement(tag);
        var celltext = document.createTextNode(cellValueArray[k]);
        thecell.appendChild(celltext);
        therow.appendChild(thecell);
    }
    return therow;
}

function birthday(birthdate){
    /*The value should identify if the user’s birthday: 
    a) already happened, 
    b) is today(!), or 
    c) has yet to occur, based on today’s date for the current year.
    */
   var today = new Date();
   var thisyearsbday = new Date(today.getFullYear(), new Date(birthdate).getMonth(), new Date(birthdate).getDate());
   console.log(today + "  " + thisyearsbday);
   if(today>thisyearsbday){
        return "Birthday already happened";
   }else if(today==thisyearsbday){
        return "HAPPY BIRTHDAY!"
   }else{
       return "Birthday hasn't happened"
   }
}

$.ajax({
    url: 'https://randomuser.me/api/?results=20&nat=us,ca',
    dataType: 'json',
    success: function(data) {
        console.log(data);
        var results = data.results;
        
        var thebody = document.getElementsByTagName("body")[0];
        thetable = document.createElement("table");
        thetbody = document.createElement("tbody");

        var headerArray = new Array("Gender", "First Name", "Last Name", "Country", "Date of Birth", "Birthday");
        var newrow = createTableRow(headerArray, "th");
        thetbody.appendChild(newrow);
            
        for(var i = 0; i < results.length; i++) {
            var user = results[i];
            birthday(user.dob.date);
            var userInfoArray = new Array(user.gender, user.name.first, user.name.last, user.location.country, new Date(user.dob.date).toLocaleDateString("en-US"), birthday(user.dob.date));
            var newrow = createTableRow(userInfoArray, "td");
            thetbody.appendChild(newrow);
            
        }
        thetable.appendChild(thetbody);
        thebody.appendChild(thetable);
    }
  });
        