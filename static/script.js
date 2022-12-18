loadData();

function loadData(){	
	// Requ�te AJAX get Persons
	httpRequest = new XMLHttpRequest();	
	httpRequest.open('GET', '/api/data');
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            
            jsonData1 = JSON.parse(httpRequest.response);
			// update_Bars(jsonData1);
		    update_BigNumbers(jsonData1);	
            console.log(jsonData1);		

		}
	};
	httpRequest.send();

	httpRequest2 = new XMLHttpRequest();	
	httpRequest2.open('GET', '/api/data2');
	httpRequest2.onreadystatechange = function () {
		if (httpRequest2.readyState === 4 && httpRequest2.status === 200) {
			jsonData2 = JSON.parse(httpRequest2.response);
			update_Lines(jsonData2);
		}
	};
	httpRequest2.send();

	httpRequest3 = new XMLHttpRequest();	
	httpRequest3.open('GET', '/api/data3');
	httpRequest3.onreadystatechange = function () {
		if (httpRequest3.readyState === 4 && httpRequest3.status === 200) {
			jsonData1 = JSON.parse(httpRequest3.response);
			update_Pie(jsonData1);
		}
	};
	httpRequest3.send();





	
}




function update_Lines(jsonData){
	console.log(jsonData);
	var labels = jsonData.years;
	
	for(d of jsonData.datasets){
		d.fill = false;				  
		d.borderColor = '#'+Math.floor(Math.random()*16777215).toString(16);
		d.borderWidth=2;
		d.radius=1;			
	}			
	
	var data = jsonData.datasets;

	new Chart(document.getElementById("line-chart"), {
		type: 'line',
		data: {
			labels: labels,
			datasets: data
		},
		options: {						
			responsive: false,
			maintainAspectRatio: true,
			title: {
				display: false,
				text: 'Univerty sytendt by major (in millions)'
			},
			legend:{
				position:'top'
			}
		}
	});
}




function update_BigNumbers(jsonData){	
	var i=1;
	for(d of jsonData){		
		region = document.getElementById("region"+i);	
		
		
		label = region.getElementsByClassName("regionLabel")[0];
		pop = region.getElementsByClassName("regionPop")[0];
		
		label.innerText = d["specialite"];
		pop.innerText = d["number"];
				
		i++;
	}
	
	
}


function update_Pie(jsonData){
	var labels = jsonData.map(function(e) {
	   return e.sexe;
	});
	
	var data = jsonData.map(function(e) {
	   return e.number;
	});
	
	new Chart(document.getElementById("pie-chart"), {
		type: 'pie',
		data: {
		  labels: labels,
		  datasets: [{
			label: "Population (millions)",
			backgroundColor: ["#FFC0CB	", "#1A1ADA"],
			data: data
		  }]
		},
		options: {
		  responsive: false,
		  maintainAspectRatio: true,
		  title: {
			display: false,
			text: 'number of student by sex'
		  },
		  legend:{
			position:'right'
		  }
		}
	});	
}






