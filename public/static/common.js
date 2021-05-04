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
