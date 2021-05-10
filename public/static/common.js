const id = document.getElementById.bind(document);

const seterror = e => {
	id("errors").textContent = e.message;
	id("errors").setAttribute("shown", "true");
}

const setresult = m => {
	id("result").textContent = m;
	id("result").setAttribute("shown", "true");
}

const apiCall = async (endpoint, method = "GET", body) => {
	if(body instanceof HTMLFormElement){
		newBody = new URLSearchParams(new FormData(body));
		body = newBody;
	}
	
	const res = await fetch("api/" + endpoint, {
		method,
		body
	});
	
	if(!res.ok){
		throw new Error(await res.text());
	}
	
	if(res.status === 204){
		return;
	}
	
	return await res.json();
}

const api = async (endpoint, method, body) => {
	let res;
	try {
		res = await apiCall(endpoint, method, body);
	} catch (e) {
		seterror(e);
		return;
	}
	
	return res;
}

const plainattr = ["className", "textContent"];

const c = (type, attr, ...children) => {
	const el = document.createElement(type);
	
	if(typeof(attr) !== "object"){
		el.textContent = attr;
	}else{
		for(const i in attr){
			if(i.startsWith("on") || plainattr.indexOf(i) >= 0){
				el[i] = attr[i];
			}else if(i === "style"){
				for(const a in attr[i]){
					el.style[a] = attr[i][a];
				}
			}else{
				el.setAttribute(i, attr[i]);
			}
		}
	}
	
	for(const e of children){
		el.appendChild(e);
	}
	
	return el;
}

const add = async () => {
	const res = await api(endpoint, "POST", id("form"));
	
	if(res){
		setresult(JSON.stringify(res));
	}
	
	getlist();
}

const deleteObj = async id => {
	const res = await api(endpoint + "/" + id, "DELETE");
	
	if(res){
		setresult(JSON.stringify(res));
	}
	
	getlist();
}

const createObjElement = obj => {
	return c("div", {
		className: "object"
	},
		create(obj),
		c("button", {
			textContent: "Delete",
			onclick: () => deleteObj(obj[window.primaryKey || endpoint + "_id"])
		})
	);
}

const getlist = async () => {
	const res = await api(endpoint + "s");
	
	// clear the list first
	id("list").innerHTML = "";
	
	if(res){
		for(const i of res){
			id("list").appendChild(createObjElement(i));
		}
	}
}

window.onload = getlist;
