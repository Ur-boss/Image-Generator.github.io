
const API_KEY = ''
const submitButton = document.querySelector('#submit')
const outPutElement = document.querySelector('#output')
const inputElement = document.querySelector('#input1')
const historyElement = document.querySelector('.history')
const buttonElement = document.querySelector('#newchat')
const main1 = document.querySelector('.main1')

//for sidebar
function changeInput(value){
    const inputElement = document.querySelector('#input1')
    inputElement.value = value
}

function openNav() {
  document.getElementById("mySidebar").style.width = "300px";
  document.getElementById("main").style.marginLeft = "0px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}

//sidebar end

async function getMessage(){
    console.log('clicked')
    const options = {
        method: 'POST',
        headers:{
            'Authorization':'Bearer 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',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            model:"gpt-3.5-turbo",
            messages:[{role:"user",content:inputElement.value}],
            max_tokens:100,
        })

    }
    try{
         const response = await fetch('https://api.openai.com/v1/chat/completions', options)
         const data = await response.json()
         console.log(data)
        outPutElement.textContent = data.choices[0].message.content
        if(data.choices[0].message.content && inputElement.value){
            const pElement = document.createElement('p')
            pElement.textContent = inputElement.value
            pElement.addEventListener('click',() => changeInput(pElement.textContent))
            historyElement.append(pElement)
        }
    } catch(error){
        console.error(error)
    }
}

submitButton.addEventListener('click',getMessage);
submitButton.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    getMessage();
  }
});

function clearInput(){
    inputElement.value = ''
    outPutElement.value = ''
    historyElement.value = ''
 }

buttonElement.addEventListener('click', clearInput)


// for pdf input

// var fileUploader =  document.getElementById('fileUpload');
// fileUploader.addEventListener('change', handleFileUpload);

// function handleFileUpload(event){
//   var file = event.target.files[0];
//   var reader = new FileReader();
  
//     reader.onload = function(e) {
//     localStorage.setItem("your-pdf",e.target.result);  
//   };

//   reader.readAsText(file,'base64');
// }

//part2  - to store at local storage
// document.addEventListener("DOMContentLoaded", () =>{
//   const recentImageDataUrl = localStorage.getItem("your-pdf");

//   if(recentImageDataUrl) {
//       document.querySelector("#pdfPlay").setAttribute("src", recentImageDataUrl);
//   }
// });

// document.querySelector("#")

document.querySelector("#fileUpload").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
          // Set the PDF data as the source for the iframe
          document.querySelector("#pdfPlay").setAttribute("src",reader.result);
      });

      // Read the selected PDF file as a data URL
      reader.readAsDataURL(file);
  }
});

function openpdf(){
  document.getElementById("pdfPlay").style.width = "100%";
  document.getElementById("pdfPlay").style.height = "623px";
  var elements = document.getElementsByClassName("select-pdf");
  var area = document.getElementsByClassName("ur-area");
  area[0].style.display ='block';
// Check if elements with the class name "select-pdf" exist
if (elements.length > 0) {
    elements[0].style.visibility = 'hidden';
    elements[0].style.marginTop = "0";
    elements[0].style.padding = "0";  
}
}
