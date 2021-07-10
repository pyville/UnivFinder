const button = document.querySelector('button')
const univDiv = document.getElementById('univ')
const univSelectBox = document.querySelector('select[name="country"]')
const univTextBox = document.querySelector('input[id="name"]')

const renderUniv = (arr) => {
    const div = document.createElement('div')
    if (arr.length === 0) {
        div.innerText = "대학을 불러오지 못했습니다."
        return div
    }
    arr.forEach((item)=>{
        const para = document.createElement('p')
        para.innerText = `${item.name} (${item.web_pages[0]})`
        div.appendChild(para)
    })
    return div
}

const getUniv = (name, country) => {
    let tempURL = `http://universities.hipolabs.com/search?`
    if (name !== '') {
        tempURL += `name=${name}&`
    }
    if (country !== "all") {
        tempURL += `country=${country}&`
    }
    const requestURL = tempURL.endsWith("&") ? tempURL.slice(0, tempURL.length - 1) : tempURL
    const myRequest = new Request(requestURL)
    univDiv.innerText = "대학을 불러오고 있습니다..."

    fetch(myRequest)
        .then((res)=>res.json())
        .then((obj)=>{
            univDiv.innerHTML = ''
            univDiv.appendChild(renderUniv(obj));
        })
        .catch((error)=>univDiv.innerText = "대학을 불러오지 못했습니다...")
}

button.addEventListener('click', ()=>getUniv(univTextBox.value, univSelectBox.value))
