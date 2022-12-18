from flask import Flask, render_template, request
from flask import redirect
from flask import jsonify
import json


# Step_1
from flaskext.mysql import MySQL

app = Flask(__name__)
# Step_2
mysql = MySQL()

# Step_4
app.config['MYSQL_DATABASE_HOST'] 	  = 'localhost'
app.config['MYSQL_DATABASE_PORT'] 	  = 3307
app.config['MYSQL_DATABASE_USER'] 	  = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'pass_root'
app.config['MYSQL_DATABASE_DB'] 	  = 'db_university'

# Step_3
mysql.init_app(app)

"""
data1= [
	{
		"region": "Africa",
		"population": 2475
	},{
		"region": "Asia",
		"population": 5267
	},{
		"region": "Europe",
		"population": 734
	},{
		"region": "Latin America",
		"population": 784
	},{
		"region": "North America",
		"population": 433
	}
]

data2 ={						
		"years": [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
		"datasets":[{
						"label": "Africa",
						"data": [86,114,106,106,107,111,133,221,783,2478]								
					},{
						"label": "Asia",
						"data": [282,350,411,502,635,809,947,1402,3700,5267]								
					},{
						"label": "Europe",
						"data": [168,170,178,190,203,276,408,547,675,734]									
					},{
						"label": "Latin America",
						"data": [40,20,10,16,24,38,74,167,508,784]									
					},{
						"label": "North America",
						"data": [6,3,2,2,7,26,82,172,312,433]		
					}]
	}

"""


app = Flask(__name__)


@app.route('/')
def index():
	return render_template('index.html')
	
@app.route('/api/data')
def doGetData():
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("select count(*) as number,  specialite from resultats group by specialite")	

	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
					
	return jsonify(json_data)
	
	#data_JSON = json.dumps(data2)	
	#sreturn data_JSON 	
	


@app.route('/api/data3')
def doGetData3():
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT count(*) as number, sexe  FROM resultats  group by sexe")	

	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
					
	return jsonify(json_data)
	
	#data_JSON = json.dumps(data2)	
	#sreturn data_JSON 	




@app.route('/api/data2')
def doGetData2():
	
	data = {"years":[], "datasets":[]}
	
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT DISTINCT annee FROM resultats")	

	years_tuple = cursor.fetchall()
	years_list =  [item[0] for item in years_tuple]
	data["years"]=years_list	

	cursor.execute("SELECT DISTINCT specialite FROM resultats")	

	region_tuple = cursor.fetchall()
	region_list =  [item[0] for item in region_tuple]
	
	for region in region_list:
		# cursor.execute("SELECT population FROM population_stats WHERE region='"+region+"'")	
		cursor.execute("SELECT count(*) as number  FROM  resultats   WHERE specialite='"+region+"'")	

		population_tuple = cursor.fetchall()

		c=[]

		for y in years_list:
			cursor.execute("SELECT count(*) as number  FROM  resultats   WHERE specialite='"+region+"' and annee='"+str(y)+"' ")	

			student_by_year = cursor.fetchall()
			student_by_year_list = [item[0] for item in student_by_year]

			c.append(student_by_year_list[0])
		
		population_list =  [item[0] for item in population_tuple]
		data["datasets"].append({"label":region, "data":c})	
	
	data_JSON = json.dumps(data)	
	return data_JSON 	

# new

#number of total students

@app.route('/api/data4')
def doGetData4():
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("select count(*) as number from resultats ")	

	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
					
	return jsonify(json_data)


#number of new students

@app.route('/api/data5')
def doGetData5():
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("select count(*) as number from resultats WHERE annee = 2021 ")	

	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
					
	return jsonify(json_data)


# number of stuetsnt by major 


@app.route('/api/data6')
def doGetData6():
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("select count(*) as number,  specialite from resultats group by specialite")	

	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
					
	return jsonify(json_data)


# the evolution of number of students by major

@app.route('/api/data7')
def doGetData7():
	
	data = {"years":[], "datasets":[]}
	
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("select DISTINCT annee from resultats")	

	years_tuple = cursor.fetchall()
	years_list =  [item[0] for item in years_tuple]
	data["years"]=years_list	

	cursor.execute("SELECT DISTINCT specialite FROM resultats")	

	region_tuple = cursor.fetchall()
	region_list =  [item[0] for item in region_tuple]
	
	for region in region_list:
		cursor.execute("select count(*) as number, annee  from resultats where specialite= '"+region+"' group by annee ")	
		population_tuple = cursor.fetchall()
		population_list =  [item[0] for item in population_tuple]
		data["datasets"].append({"label":region, "data":population_list})	
	
	data_JSON = json.dumps(data)	
	return data_JSON 	




if __name__ == '__main__':
	app.run(debug=True, port=5000)
	
	