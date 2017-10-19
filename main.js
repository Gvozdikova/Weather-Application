

$(document).ready(function()
{
	var city;
	var currently;
	var update;
	var temp;
	$("#btn").on("click", function()
	{
	getForeCast();
	});
	$("#changer").on('click', function()
	{
		changeTemp();
	});
	

	function getForeCast()
	{

		if (navigator.geolocation) 
		{
  		navigator.geolocation.getCurrentPosition(function(position) 
    		{
    		var a = position.coords.latitude;
    		var b = position.coords.longitude;
    		//a = a.toString().substring(0,7);
    		//b = b.toString().substring(0,7);
			
			$.ajax({
				url: "http://maps.google.com/maps/api/geocode/json?latlng=" + a + ',' + b + '&sensor=false',
				dataType: "json",
				success: function (response) {
					for (var i=0; i<response.results[0].address_components.length; i++){
						if (response.results[0].address_components[i].types[0] == "administrative_area_level_1")
						{
							city = response.results[0].address_components[i].long_name;
							break;
						}
						
					}
					
					return city;
				}
				
			});
				
				



			$.ajax({
			url:"https://api.darksky.net/forecast/" + "1e72570268c171867ae8bd1eea8d3257/" + a + "," + b,
			dataType: "jsonp",
			success: function(response) {
				//timezone = response.timezone;
				
				currently = response.currently.summary;
				update  = response.currently.time;
				var myDate = new Date( update *1000);
                myDate = myDate.toLocaleString();
                temp = response.currently.temperature;
                changer = response.currently.temperature; //will create a global variable to use it in changeTemp()

				$("#updated").text("Updated: " + myDate);
				$("#location").text("Your location: " + city);
				//$("#location").text("Your location: " + timezone);
				$("#forecast").text("It is : " + currently);
				$("#temp").text("Temperature : " + temp + "°F");
				$("#changer").css('display', "block");
				$("#changer").text("in Celcium");

					var arr = currently.toString().split(' ');
					for (i = 0; i<arr.length; i++)
					{
						if (arr[i] == "Clear")
						{
							$("#main").css("background-image", "url('images/clear.jpg')");
							$("#dog").attr("src","clear.png");
						}else if (arr[i] == "Cloudy") 
						{
							$("#main").css("background-image", "url('images/cloudy.jpg')");
							$("#dog").attr("src","cloudy.png");
						}else if(arr[i] == "Rain")
						{
							$("#main").css("background-image", "url('images/rainy.jpg')");
						}
					}

				}


			});
		
			});
		}

	};
});
function changeTemp()
{ 
	var text = $("#changer").html();
	if (text == "in Celcium")
	{
	changer = (changer-32) * 5 / 9;
	changer = changer.toString().substring(0,4);
	$("#temp").text("Temperature : " + changer + "°C");
	$("#changer").text("in Fahrenheit");
	} else
	{
	changer = changer* 9 / 5 + 32;
	changer = changer.toString().substring(0,6);
	$("#temp").text("Temperature : " + changer + "°F");
	$("#changer").text("in Celcium");

	}
	
	
};