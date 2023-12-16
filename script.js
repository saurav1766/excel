
let colname = document.querySelector(".column-name-container");

let rowname = document.querySelector(".raw-name-container");

let cell = document.querySelector(".input-cells")

for (let j = 1; j <= 100; j++) {

    let ans = ""
    let i = j;

    while (i > 0) {
        let rem = i % 26;
        if (rem == 0) {
            ans = "Z" + ans;
            i = Math.floor(i / 26) - 1;
        }
        else {
            ans = String.fromCharCode(rem - 1 + 65) + ans;
            i = Math.floor(i / 26);
        }

    }
    let col = document.createElement('div');
    let row = document.createElement('div');
    col.setAttribute("class", `column-name`)
    row.setAttribute("class", `row-name`)
    col.setAttribute("id", `colid-${ans}`)
    row.setAttribute("id", `rowid-${j}`)
    col.innerHTML = ans;
    row.innerHTML = j;
    rowname.appendChild(row)
    colname.appendChild(col)

}

for (let i = 1; i <= 100; i++) {
    let cel= document.createElement('div')
    cel.setAttribute("class","cell-raw")

    for (let j = 1; j <= 100; j++) {
        let cells = document.createElement('div')
        cells.setAttribute("class", `colid-id-${i} cell-id-${j} cells`)
        cells.setAttribute("contenteditable","true")
        cel.appendChild(cells)
    
    }
    cell.appendChild(cel)
}
document.addEventListener("click",function(e){
      console.log(e,this);
})
 
