/*global astarte*/
/*global L*/

astarte.Timeline = L.Class.extend({
	
	// -----------------------------------------------------------------
	options: {
		
	},
	
	// -----------------------------------------------------------------
	objNet: {
		"map" : null,
	},
	
	// -----------------------------------------------------------------
	initialize: function(DOMid, options){
		this.setOptions(options);
		
		this._DOMcontainer = $("#"+DOMid);
		this._timeDisplay = $("<p></p>").appendTo(this._DOMcontainer);
		this._timeline = $("<div id='timeline'></div>").appendTo(this._DOMcontainer);
		
		this._timeline.slider({
			"range" : false,
			"animate" : true,
			"min" : 0,
			"max" : 1000,
			"values" : [0, 1000],
			
		});
		
		this._timeline.on("slidechange slide", {caller: this}, function(event, ui){
			
			var timeline = event.data.caller;
			var interval = timeline._max - timeline._min;
			
			var minTime = new Date(timeline._min + (interval * ui.values[0] / 1000));
            var maxTime = new Date(timeline._min + (interval * ui.values[1] / 1000));
			
            var minTimeFormat = astarte.util.dateToString(minTime); 
            var maxTimeFormat = astarte.util.dateToString(maxTime);
			
			timeline._curMin = minTimeFormat;
			timeline._curMax = maxTimeFormat;
		
			timeline._timeDisplay.html(timeline._curMin + " / " + timeline._curMax);
			
			var map = astarte.ffon(timeline, ["map"]);
			map.redraw(minTimeFormat, maxTimeFormat);
			
		});
		
		this._curMin = "0";
		this._curMax = "9999";
		this._timeDisplay.html(this._curMin + " / " + this._curMax);
		
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
	},
	
	// -----------------------------------------------------------------
	setObjNet: function(obj){
		$.extend(this.objNet, obj);
		return this;
	},
	
});