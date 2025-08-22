const dataHolder = document.getElementById("data");
const resume = document.querySelector(".resume-container")

/* function handleData() {
  const query = document.location.search.substring(1);
  const dataArr = query.split("&");
  const data = dataArr.map(d => d.split("="));
  data.forEach((e, i) => {
    const p = document.createElement("p")
    p.innerHTML = `${decodeURIComponent(e[0])}: ${decodeURIComponent(e[1])}`
    dataHolder.appendChild(p)
  })
} */

function handleData() {
  const query = document.location.search.substring(1);
  const data = JSON.parse(decodeURIComponent(query.split("=")[1]));
  console.log(data);


  resume.innerHTML = renderResume(data)
}

handleData();
