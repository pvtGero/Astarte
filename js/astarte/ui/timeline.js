/*global astarte*/
/*global L*/

astarte.Timeline = L.Class.extend({
	
	// -----------------------------------------------------------------
	options: {
		
	},
	
	// -----------------------------------------------------------------
	objNetwork: {
		"map" : null,
	},
	
	// -----------------------------------------------------------------
	initialize: function(DOMid, options){
		this.setOptions(options);
		this._timeline = $("#"+DOMid).slider({
			"range" : true,
			"animate" : true,
			"min" : 0,
			"max" : 100,
			"values" : [0, 100]	
		});
		
		this._timeline.on("slide", {caller: this}, function(event, ui){
			
			var timeline = event.data.caller;
			var interval = timeline._max - timeline._min;
			
			var minTime = new Date(timeline._min + (interval * ui.values[0] / 100));
            var maxTime = new Date(timeline._min + (interval * ui.values[1] / 100));
            
            var minTimeFormat = minTime.toJSON().slice(0, 10) + " " + minTime.toJSON().slice(11, 19);
            var maxTimeFormat = maxTime.toJSON().slice(0, 10) + " " + maxTime.toJSON().slice(11, 19);
			
			timeline._curMin = minTimeFormat;
			timeline._curMax = maxTimeFormat;
			
			var map = astarte.util.findFirstObjNetwork(timeline, ["map"]);
			map.redraw(minTimeFormat, maxTimeFormat);
			
		});
		
		this._curMin = "0";
		this._curMax = "9999";
				
		return this;
	},
	
	// -----------------------------------------------------------------
	setOptions: function(options){
		L.setOptions(this, options);
		return this;
	},
	
	// -----------------------------------------------------------------
	setMap: function(map){
		this.objNetwork["map"] = map; 	
	},
	
	// -----------------------------------------------------------------
	getSlider: function(){
		return this._timeline;
	},
	
	// -----------------------------------------------------------------
	setMax: function(max){
		this._max = new Date(max).getTime();
	},
	
	// -----------------------------------------------------------------
	setMin: function(min){
		this._min = new Date(min).getTime();
	},
	
	// -----------------------------------------------------------------
	getCurMin: function(){
		return this._curMin;
	},
	
	// -----------------------------------------------------------------
	getCurMax: function(){
		return this._curMax;
	}
	
});