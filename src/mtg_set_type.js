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
    var cpt=1;
        loadJSON(function(response) {
            // Parse JSON string into object
            var actual_JSON = JSON.parse(response);
   // console.log(actual_JSON);
            $( "#yolo" ).append( "<p>use carte;</p><br />");
            $( "#yolo" ).append( "<p>DELETE FROM MTG_set_type;</p><br />");

            var arr = []; //tableau permettant d'éviter les doublons

            $.each(actual_JSON, function( nameCard, objectCard ) {



                if (!(typeof objectCard.type === "undefined")) {
                    if( arr.indexOf(objectCard.type)=== -1 ) { //si on est pas dans un doublon
                        arr.push(objectCard.type);
                        objectCard.type = objectCard.type.replace(/'/g, " ");
                        $("#yolo").append("<p>INSERT INTO MTG_set_type(MTG_id_set_type,MTG_nom_set_type) VALUES ('"+cpt+"','" + objectCard.type + "');</p> <br />");
                        cpt++
                    }
                }
/**
                console.log("INSERT INTO MTG_set(MTG_ID_SET,MTG_nom_set,MTG_code_set,MTG_gathererCode_set, MTG_oldCode_set, MTG_magicCardsInfoCode_set,MTG_releaseDate_set,MTG_onlineOnly_set) VALUES ("+cpt+",'"+objectCard.name+"'"+","+"'"+objectCard.code+"'"+","+"'"+objectCard.gathererCode+"'"+","+"'"+objectCard.oldCode+"'"+","+"'"+objectCard.magicCardsInfoCode+"'"+","+"'"+objectCard.releaseDate+"'"+", "+objectCard.onlineOnly+");");
   **/ ;
            //   $.each(objectCard["cards"], function( index, value) {
                  //  console.log(value);
             //   });
            });

        });

});