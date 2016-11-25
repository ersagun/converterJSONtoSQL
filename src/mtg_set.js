/**
 * Created by Ersagun on 24/11/16.
 */

// A $( document ).ready() block.
$( document ).ready(function() {
    function loadJSON(callback) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'cards2.json', true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }
    var cpt=0;
        loadJSON(function(response) {
            // Parse JSON string into object
            var actual_JSON = JSON.parse(response);
   // console.log(actual_JSON);
            $( "#yolo" ).append( "<p>use carte;</p><br />");
            $( "#yolo" ).append( "<p>DELETE FROM MTG_set;</p><br />");
            $.each(actual_JSON, function( nameCard, objectCard ) {
                //console.log("---------------------------");
               // console.log(objectCard);
                //console.log("---------------------------");
                console.log(objectCard.releaseDate);
                if (typeof objectCard.name === "undefined"){
                    objectCard.name="";
                }else objectCard.name=objectCard.name.replace(/'/g, " ");

                if (typeof objectCard.code === "undefined"){
                    objectCard.code="";
                }else objectCard.code=objectCard.code.replace(/'/g, " ");


                if (typeof objectCard.gathererCode === "undefined"){
                    objectCard.gathererCode="";
                }else  objectCard.gathererCode=objectCard.gathererCode.replace(/'/g, " ");


                if (typeof objectCard.oldCode === "undefined"){
                    objectCard.oldCode="";
                }else objectCard.oldCode=objectCard.oldCode.replace(/'/g, "\\'");

                if (typeof objectCard.magicCardsInfoCode === "undefined"){
                    objectCard.magicCardsInfoCode="";
                }else objectCard.magicCardsInfoCode=objectCard.magicCardsInfoCode.replace(/'/g, " ");

                if (typeof objectCard.releaseDate === "undefined"){
                    objectCard.releaseDate="";
                }else objectCard.releaseDate=objectCard.releaseDate.replace(/'/g, " ");


                if (typeof objectCard.onlineOnly === "undefined"){
                    objectCard.onlineOnly=0;
                }

               var myDate=objectCard.releaseDate;
               myDate=myDate.split("-");
                var newDate=myDate[0]+"-"+myDate[1]+"-"+myDate[2];
    console.log(newDate);

                objectCard.releaseDate=Math.round(new Date(objectCard.releaseDate).getTime()/1000);


                $( "#yolo" ).append( "<p>INSERT INTO MTG_set(MTG_nom_set,MTG_code_set,MTG_gathererCode_set, MTG_oldCode_set, MTG_magicCardsInfoCode_set,MTG_releaseDate_set,MTG_onlineOnly_set) VALUES ('"+objectCard.name+"'"+","+"'"+objectCard.code+"'"+","+"'"+objectCard.gathererCode+"'"+","+"'"+objectCard.oldCode+"'"+","+"'"+objectCard.magicCardsInfoCode+"'"+","+"'"+newDate+"'"+","+objectCard.onlineOnly+");</p> <br />" );
/**
                console.log("INSERT INTO MTG_set(MTG_ID_SET,MTG_nom_set,MTG_code_set,MTG_gathererCode_set, MTG_oldCode_set, MTG_magicCardsInfoCode_set,MTG_releaseDate_set,MTG_onlineOnly_set) VALUES ("+cpt+",'"+objectCard.name+"'"+","+"'"+objectCard.code+"'"+","+"'"+objectCard.gathererCode+"'"+","+"'"+objectCard.oldCode+"'"+","+"'"+objectCard.magicCardsInfoCode+"'"+","+"'"+objectCard.releaseDate+"'"+", "+objectCard.onlineOnly+");");
   **/ cpt++;
            //   $.each(objectCard["cards"], function( index, value) {
                  //  console.log(value);
             //   });
            });

        });

});