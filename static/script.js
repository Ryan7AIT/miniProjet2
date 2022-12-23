loadData();


function loadData(){	

	line = document.getElementById("bar-chart")
	


	httpRequest = new XMLHttpRequest();	
	httpRequest.open('GET', '/api/data');
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            
            jsonData1 = JSON.parse(httpRequest.response);
			// update_Bars(jsonData1);
		    // update_BigNumbers(jsonData1);	

		}
	};
	httpRequest.send();

	httpRequest2 = new XMLHttpRequest();	
	httpRequest2.open('GET', '/api/data2');
	httpRequest2.onreadystatechange = function () {
		if (httpRequest2.readyState === 4 && httpRequest2.status === 200) {
			jsonData2 = JSON.parse(httpRequest2.response);
			// update_Lines(jsonData2);
		}
	};
	httpRequest2.send();

	httpRequest3 = new XMLHttpRequest();	
	httpRequest3.open('GET', '/api/data3');
	httpRequest3.onreadystatechange = function () {
		if (httpRequest3.readyState === 4 && httpRequest3.status === 200) {
			jsonData1 = JSON.parse(httpRequest3.response);
			// update_Pie(jsonData1);
		}
	};
	httpRequest3.send();


// new


// get number of students 

	httpRequest4 = new XMLHttpRequest();	
	httpRequest4.open('GET', '/api/data4');
	httpRequest4.onreadystatechange = function () {
		if (httpRequest4.readyState === 4 && httpRequest4.status === 200) {
			
			jsonData4 = JSON.parse(httpRequest4.response);
			// update_Bars(jsonData1);
			update_numberOfstudents(jsonData4);	

		}
	};
	httpRequest4.send();


	// get number of new students

	httpRequest5 = new XMLHttpRequest();	
	httpRequest5.open('GET', '/api/data5');
	httpRequest5.onreadystatechange = function () {
		if (httpRequest5.readyState === 4 && httpRequest5.status === 200) {
			
			jsonData5 = JSON.parse(httpRequest5.response);
			// update_Bars(jsonData1);
			update_numberOfNewstudents(jsonData5);	

		}
	};
	httpRequest5.send();


	// number of girls
	httpRequest9 = new XMLHttpRequest();	
	httpRequest9.open('GET', '/api/data9');
	httpRequest9.onreadystatechange = function () {
		if (httpRequest9.readyState === 4 && httpRequest9.status === 200) {
			
			jsonData9 = JSON.parse(httpRequest9.response);
			// update_Bars(jsonData1);
			update_numberOfgirls(jsonData9);	

		}
	};
	httpRequest9.send();

	// number of guys

	// get numbers of sudent by major

	httpRequest6 = new XMLHttpRequest();	
	httpRequest6.open('GET', '/api/data6');
	httpRequest6.onreadystatechange = function () {
		if (httpRequest6.readyState === 4 && httpRequest6.status === 200) {
            
            jsonData6 = JSON.parse(httpRequest6.response);
			update_Bars1(jsonData6)	

		}
	};
	httpRequest6.send();

	// get the percentage of growin student per major (2019,2020,2021)

	httpRequest7 = new XMLHttpRequest();	
	httpRequest7.open('GET', '/api/data7');
	httpRequest7.onreadystatechange = function () {
		if (httpRequest7.readyState === 4 && httpRequest7.status === 200) {
            
            jsonData7 = JSON.parse(httpRequest7.response);
			update_Lines1(jsonData7)	

		}
	};
	httpRequest7.send();


	// number of student by year

	httpRequest8 = new XMLHttpRequest();	
	httpRequest8.open('GET', '/api/data8');
	httpRequest8.onreadystatechange = function () {
		if (httpRequest8.readyState === 4 && httpRequest8.status === 200) {
            
            jsonData8 = JSON.parse(httpRequest8.response);
			update_Bars2(jsonData8)	

		}
	};
	httpRequest8.send();


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
		card = document.getElementById("c"+i);	
		
		
		label = region.getElementsByClassName("regionLabel")[0];
		number = region.getElementsByClassName("StudentsNumber")[0];
		
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






// new ...

function update_numberOfstudents(jsonData){	
	number = document.getElementsByClassName("StudentsNumber")[0];
	number.innerText = jsonData[0]["number"];
	
}

function update_numberOfNewstudents(jsonData){	
	number = document.getElementsByClassName("newStudentsNumber")[0];
	number.innerText = jsonData[0]["number"];
	
}

function update_numberOfgirls(jsonData){	
	number = document.getElementsByClassName("girlsNumber")[0];
	number.innerText = jsonData[0]["number"];

	number = document.getElementsByClassName("boysNumber")[0];
	number.innerText = jsonData[1]["number"];
	
}


function update_Bars1(jsonData){	

	var labels = jsonData.map(function(e) {
	   return e.specialite;
	});
	
	var data = jsonData.map(function(e) {
	   return e.number;
	});
	
	
	new Chart(document.getElementById("bar-chart"), {
		type: 'bar',
		data: {
		  labels: labels,
		  datasets: [
			{
			  label: "Nombre d'etudiants",
			  backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#EADDCA", "#000000"],
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
			text: 'Le Nombre detudiants par specialite'
		  }
		}
	});
}


function update_Lines1(jsonData){
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
				text: 'le nombre destudiant'
			},
			legend:{
				position:'top'
			}
		}
	});
}

function update_Bars2(jsonData){	

	var labels = jsonData.map(function(e) {
	   return e.annee;
	});
	
	var data = jsonData.map(function(e) {
	   return e.number;
	});
	
	
	new Chart(document.getElementById("bar-chart2"), {
		type: 'bar',
		data: {
		  labels: labels,
		  datasets: [
			{
			  label: "Nombre d'etudiants",
			  backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
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
			text: 'Le Nombre detudiants par annee'
		  }
		}
	});
}







// front-end manipulaton

