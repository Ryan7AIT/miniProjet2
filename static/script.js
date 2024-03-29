loadData();


function loadData(){	


	// those lines to fix refreshing  bug
	line = document.getElementById("bar-chart")
	chart2 = document.getElementById("bar-chart2")
	line2 = document.getElementById("line-chart")
	chart5 = document.getElementById("bar-chart5")

	line.setAttribute("style", " ")
	line.setAttribute("width", "540")
	line.setAttribute("height", "270")

	chart2.setAttribute("style", " ")
	chart2.setAttribute("width", "410")
	chart2.setAttribute("height", "290")

	line2.setAttribute("style", " ")
	line2.setAttribute("width", "600")
	line2.setAttribute("height", "300")

	chart5.setAttribute("style", " ")
	chart5.setAttribute("width", "510")
	chart5.setAttribute("height", "290")



// get number of students 

	httpRequest4 = new XMLHttpRequest();	
	httpRequest4.open('GET', '/api/data4');
	httpRequest4.onreadystatechange = function () {
		if (httpRequest4.readyState === 4 && httpRequest4.status === 200) {
			
			jsonData4 = JSON.parse(httpRequest4.response);
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


	// number of females students
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

	// number of men students

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

	// get the percentage of growing student per major (2019,2020,2021)

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

	// number of student who got the year and fails

	httpRequest10 = new XMLHttpRequest();	
	httpRequest10.open('GET', '/api/data10');
	httpRequest10.onreadystatechange = function () {
		if (httpRequest10.readyState === 4 && httpRequest10.status === 200) {
			jsonData10 = JSON.parse(httpRequest10.response);
			update_Pie10(jsonData10);
		}
	};
	httpRequest10.send();



	// bar chart of fails and succes


	// number of student by year

	httpRequest11 = new XMLHttpRequest();	
	httpRequest11.open('GET', '/api/data11');
	httpRequest11.onreadystatechange = function () {
		if (httpRequest11.readyState === 4 && httpRequest11.status === 200) {
			
			jsonData11 = JSON.parse(httpRequest11.response);
			update_Bars3(jsonData11)	

		}
	};
	httpRequest11.send();


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
	console.log(jsonData);
	var labels = jsonData.map(function(e) {
	   return e.annee;
	});
	
	var data = jsonData.map(function(e) {
	   return e.nomber_de_success;
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
			  backgroundColor: ["#3e95cd", "#8e5ea2","#13ECD5","#e8c3b9","#EC1313", "#158301", "#000000"],
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
			text: "Nombre d'etudiants par specialitee"
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
			  backgroundColor: ["#0075F9", "#13ECD5","#EC1313"],
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
			text: 'Nombre étudiants par années'
		  }
		}
	});
}




// pie 10 

function update_Pie10(jsonData){
	var labels = jsonData.map(function(e) {
	   return e.sexe;
	});
	
	var data = jsonData.map(function(e) {
	   return e.nomber_de_success;
	});
	
	new Chart(document.getElementById("pie-chart"), {
		type: 'pie',
		data: {
		  labels: labels,
		  datasets: [{
			label: "Nombre d'etudiant",
			backgroundColor: ["#24addc	", "#24dc51"],
			data: data
		  }]
		},
		options: {
		  responsive: true,
		  maintainAspectRatio: true,
		  title: {
			display: true,
			text: "nombre d'hommes et de femmes"
		  },
		  legend:{
			position:'right'
		  }
		}
	});	
}



// bar 3 (fails and succed)

function update_Bars3(jsonData){

	var labels = jsonData.map(function(e) {
	   return e.annee;
	});
	
	var data = jsonData.map(function(e) {
	   return e.nomber_de_success;
	});

	var data2 = jsonData.map(function(e) {
		return e.nomber_de_failed;
	 });
	
	
	new Chart(document.getElementById("bar-chart5"), {
		type: 'bar',
		data: {
		  labels: labels,
		  datasets: [
			{
			  label: "Nombre d'etudiants réussit",
			  backgroundColor: ["#13ECD5", "#13ECD5","#13ECD5"],
			  data: data,
			  stack: 'Stack 0'
			}
			,
			{
			label: "Nombre d'etudiants échoué",
			backgroundColor: ["#EC1313", "#EC1313","#EC1313"],
			data: data2,
			stack: 'Stack 1'
			}
			
		  ]
		},
		options: {
			scales: {
				x: {
				  stacked: true,
				}
			  },	
		  responsive: false,
		  maintainAspectRatio: true,	
		  legend: { display: false },
		  title: {
			display: true,
			text: "nombre d'étudiants qui ont échoué et réussi par an"
		  }
		}
	});
}



























// front-end manipulaton

let scrollpos = window.scrollY

const nav = document.querySelector("nav")
const scrollChange = 50

const add_class_on_scroll = () => nav.classList.add("opacity")
const remove_class_on_scroll = () => nav.classList.remove("opacity")

window.addEventListener('scroll', function() {
  scrollpos = window.scrollY;

  if (scrollpos >= scrollChange) { add_class_on_scroll() }
  else {remove_class_on_scroll()}
  
})


function showModel() {
	var element = document.getElementById("seetings_model");
	element.classList.toggle("hidden");
 }

 var light = document.getElementById("light");

 light.addEventListener('click', function(){
	r.style.setProperty('--blue', 'rgb(59 130 246)');
	r.style.setProperty('--white', 'rgb(255 255 255)');
	r.style.setProperty('--grey', 'rgb(243 244 246)');
	r.style.setProperty('--bgrey', 'rgb(75 85 99)');
	r.style.setProperty('--black', 'rgb(17 24 39)');

	var dark = document.getElementById("dark");

	dark.style.backgroundColor= "black"
	dark.style.color= "white"


	var light = document.getElementById("light");

	light.style.color = "black"
	light.style.backgroundColor= "white"



 });

 var r = document.querySelector(':root');


 var dark = document.getElementById("dark");

 dark.addEventListener('click', function(){
	r.style.setProperty('--white', 'rgb(17 24 39)');
	r.style.setProperty('--blue', 'rgb(59 130 246)');
	r.style.setProperty('--grey', 'rgb(75 85 99)');
	r.style.setProperty('--bgrey', 'rgb(75 85 99)');
	r.style.setProperty('--black', 'rgb(255 255 255)');

	var light = document.getElementById("light");

	light.style.color = "black"
	light.style.backgroundColor= "white"






 });



 // Get the root element

// Create a function for getting a variable value
function myFunction_get() {
  // Get the styles (properties and values) for the root
  var rs = getComputedStyle(r);
  // Alert the value of the --blue variable
  alert("The value of --blue is: " + rs.getPropertyValue('--blue'));
}

// Create a function for setting a variable value
function myFunction_set() {
  // Set the value of variable --blue to another value (in this case "lightblue")
  r.style.setProperty('--blue', 'lightblue');
}

