function hello(){
  console.log("Hello World")
}

const elm = document.getElementById("main-header")

import photo from "../media/Avatar.png"
const img = document.createElement("img")
img.src=photo;
elm.appendChild(img); 

export default hello