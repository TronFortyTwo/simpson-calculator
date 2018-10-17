function init()
{
	sessionStorage.setItem("ptnum", "0");
	sessionStorage.setItem("base", "0");
	sessionStorage.setItem("odd", "false");
}


function addPoint()
{
	let table = document.getElementById("table");
	
	// update pts counter
	let ptnum = Number(sessionStorage.getItem("ptnum"));
	if(sessionStorage.getItem("base") != "0")
	{
		ptnum++;
		sessionStorage.setItem("ptnum", ptnum);
	}
	
	// remove last row (button)
	table.deleteRow(ptnum+1);
	
	// add a new row to the table for the new point
	let new_row = document.createElement("tr");
	
	let cell1 = document.createElement("td");
	let cell2 = document.createElement("td");
	
	if(sessionStorage.getItem("base") != "0")
		cell1.innerHTML = "<center>Distance&nbsp;" + ptnum + "</center>";
	else
		cell1.innerHTML = "<center>Base</center>";
	cell2.innerHTML = "<center><input id='in' type='text' style='width:80%'></center>";
	
	new_row.appendChild(cell1);
	new_row.appendChild(cell2);
	
	table.appendChild(new_row);
	
	// create the new button
	let but_row = document.createElement("tr"); 
	but_row.colspan = "2";
	
	but_row.innerHTML = "<input id='b' type='button' onclick='confirm()' value='OK' style='width:100%'>";
	
	table.appendChild(but_row);
}

function confirm()
{
	let ptnum = Number(sessionStorage.getItem("ptnum"));
	let table = document.getElementById("table");
	
	let input = document.getElementById("in").value;
	input = input.replace(",", ".");
	
	let cell1 = document.createElement("td");
	let cell2 = document.createElement("td");
	
	if( sessionStorage.getItem("base") == "0")
	{
		sessionStorage.setItem("base", input);
		cell1.innerHTML = "<center>Base</center>";
	}
	else
	{
		sessionStorage.setItem("d"+ptnum, input);
		cell1.innerHTML = "<center>Distance&nbsp;" + ptnum + "</center>";
		
		if(sessionStorage.getItem("odd") == "true")
			sessionStorage.setItem("odd", "false");
		else
			sessionStorage.setItem("odd", "true");
	}
	
	// remove old rows
	table.deleteRow(ptnum+2);
	table.deleteRow(ptnum+1);
	
	// create new point row
	let new_row = document.createElement("tr");
	
	cell2.innerHTML = "<center>"+input+"</center>";
	
	new_row.appendChild(cell1);
	new_row.appendChild(cell2);
	
	table.appendChild(new_row);
	
	// create new button
	let but_row = document.createElement("tr"); 
	but_row.colspan = "2";
	
	but_row.innerHTML = "<input id='b' type='button' onclick='addPoint()' value='Add point' style='width:100%'>";
	
	table.appendChild(but_row);
	
	updateArea();
}

function updateArea()
{
	let ptnum = Number(sessionStorage.getItem("ptnum"));
	
	let A = Number(0);
	
	let i;
	
	// add the first
	A += Number(sessionStorage.getItem("d1"));
	console.log(A);
	
	// add the last
	A += Number(sessionStorage.getItem("d"+ptnum));
	console.log(A);
	
	// add all the pari
	for(i=2; i<=ptnum-2; i+=2)
	{
		A += 2 * Number(sessionStorage.getItem("d"+i));
		console.log(A);
	}
	// add all the dispari
	for(i=3; i<=ptnum-1; i+=2)
	{
		A += 4 * Number(sessionStorage.getItem("d"+i));
		console.log(A);
	}
	
	// multiply for the base
	A *= Number(sessionStorage.getItem("base"));
	A /= 3;
	
	if(A < 0)
		A = -A;
	
	if(sessionStorage.getItem("odd") == "true")
		document.getElementById("area").innerHTML = "AREA: EVEN NUMBER OF D";
	else
		document.getElementById("area").innerHTML = "AREA: " + A;
}
