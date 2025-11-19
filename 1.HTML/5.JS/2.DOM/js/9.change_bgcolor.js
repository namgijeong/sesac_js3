
function changeBGColor(){
    const colors= ["red", "blue","green"];

    // if (document.body.style.backgroundColor == "red"){
    //     document.body.style.backgroundColor="blue";
    // } else if (document.body.style.backgroundColor == "blue") {
    //     document.body.style.backgroundColor = "green";
    // }
    // else {
    //     document.body.style.backgroundColor="red";
    // }

    if (document.body.style.backgroundColor == colors[0]){
        document.body.style.backgroundColor= colors[1];
    } else if (document.body.style.backgroundColor == colors[1]) {
        document.body.style.backgroundColor = colors[2];
    }
    else {
        document.body.style.backgroundColor=colors[0];
    }

    //이걸 어떻게 더 깔끔하고 이쁘게 만들까??
}

let current_index = 0;

// function changeBGColor2(){
//     const colors= ["red", "blue","green"];

//     if (current_index == colors.length){
//         current_index = 0;
//     }

//     document.body.style.backgroundColor= colors[current_index];

//     current_index ++;
    
// }

// function changeBGColor3(){
//     const colors= ["red", "blue","green"];

//     if (current_index == colors.length){
//         current_index = 0;
//     }

//     document.body.style.backgroundColor= colors[current_index++];
// }

function changeBGColor4(){
    const colors= ["red", "blue","green","purple","orange"];

    document.body.style.backgroundColor= colors[current_index];

    current_index = (current_index + 1) % colors.length;
}
