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
	
}


function update_Bars(jsonData){	

	var labels = jsonData.map(function(e) {
	   return e.specilite;
	});
	
	var data = jsonData.map(function(e) {
	   return e.nom;
	});
	
	
	new Chart(document.getElementById("bar-chart"), {
		type: 'bar',
		data: {
		  labels: labels,
		  datasets: [
			{
			  label: "Population (millions)",
			  backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
			  data: data
			}
		  ]
		},
		options: {
		  responsive: false,
		  maintainAspectRatio: true,	
		  legend: { display: false },
		  title: {
			display: true,
			text: 'Predicted world population (millions) in 2050'
		  }
		}
	});
}

function update_Lines(jsonData){
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
				text: 'World population per region (in millions)'
			},
			legend:{
				position:'top'
			}
		}
	});
}

function update_Pie(jsonData){
	var labels = jsonData.map(function(e) {
	   return e.region;
	});
	
	var data = jsonData.map(function(e) {
	   return e.population;
	});
	
	new Chart(document.getElementById("pie-chart"), {
		type: 'pie',
		data: {
		  labels: labels,
		  datasets: [{
			label: "Population (millions)",
			backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#d3b37e","#c45850"],
			data: data
		  }]
		},
		options: {
		  responsive: false,
		  maintainAspectRatio: true,
		  title: {
			display: false,
			text: 'Predicted world population (millions) in 2050'
		  },
		  legend:{
			position:'right'
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





