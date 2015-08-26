var infoBubble = new astarte.InfoBubble("info-bubble", {});

var broker = new astarte.Broker({}, {});

var markerCreator = new astarte.MarkerCreator({});

var timeline = new astarte.Timeline("timeline-container", {});

var analizer = new astarte.ValAnalizer({}, {});

var map = new astarte.Map('map', 'mapbox.streets-satellite', {
	"broker" : broker,
	"timeline" : timeline,
	"info_bubble" : infoBubble,
},{
	"zoomControl" : false,
	"attributionControl" : false,
	"contextmenu" : true,
}).setView([38.71297, -9.15977], 15);

broker.setObjNet({
	"map" : map,
});
timeline.setObjNet({
	"map" : map,
});
infoBubble.setObjNet({
	"map" : map,
});

var filter = new astarte.Filter({});
var markerLayer = new astarte.MarkerLayer({
	"map" : map,
	"marker_creator" : markerCreator,
	"val_analizer" : analizer,
	"filter" : filter,
}, {});

map.addDataLayer("markers", markerLayer);

var heatLayer = new astarte.HeatLayer({
	"map" : map,
	"filter" : filter,
	"val_analizer" : analizer,
}, {});

map.addDataLayer("heatmap", heatLayer);

var request = new XMLHttpRequest();

request.onreadystatechange = function(){

    if(request.readyState === 4){
        if(request.status === 200){

            var sources = JSON.parse(request.responseText);

            for(var i = 0; i < sources.length; i++){

                var deviceMac = sources[i].id;

				broker.addSource(deviceMac, "victim");

                for(var j = 0; j < sources[i].positions.length; j++){

                    var lat = sources[i].positions[j].lat;
                    var lng = sources[i].positions[j].lng;
                    var genTime = sources[i].positions[j].gen_time;

                    var data = {};
                    for(var k = 0; k < sources[i].positions[j].data.length; k++){
                        data[sources[i].positions[j].data[k].type] = sources[i].positions[j].data[k].value;
                    }

                    broker.addLocation(deviceMac, lat, lng, genTime, data);

                }

            }

        }
	}

}

request.open("GET", "http://localhost/astarte/index.php/astarte_api/get_all_sources", true);
request.send();