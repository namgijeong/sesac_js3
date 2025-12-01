// function leftTriangle(num_of_rows){
//     for (let row = 1; row <= num_of_rows; row++){
//         let triangleString = "";
//         for (let column = 1; column <= row; column++){
//             triangleString += "*";
//         }
//         console.log(triangleString);
//     }

// }

// function rightTriangle(num_of_rows){
//     for (let row = 1; row <= num_of_rows; row++){
//         let triangleString = "";
//         for (let column = 1; column <= num_of_rows-row; column++){
//             triangleString += " ";
//         }
//         for (let column = 1; column <= row; column++){
//             triangleString += "*";
//         }
//         console.log(triangleString);
//     }

// }


function leftTriangle(num_of_rows){
    for (let r = 1; r <= num_of_rows; r++){
        console.log("*".repeat(r));
    }
    
}

function rightTriangle(num_of_rows){
    for (let r = 1; r <= num_of_rows; r++){
        console.log(" ".repeat(num_of_rows - r) + "*".repeat(r));
    }
}


leftTriangle(4);
rightTriangle(5);