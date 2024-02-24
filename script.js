
let defaultproperties = {
    text: "",
    "text-decoration": "",
    "text-align": "left",
    "fontWeight": "",
    "font-family": "Noto-Sans",
    "font-style": "",
    "background-color": "white",
    "color": "black"
};

let celldata = {
    "sheet1": {}
};
let selectedSheet = "sheet1";
let totalSheet = 1;

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
    let cel = document.createElement('div');
    cel.setAttribute("class", "cell-raw");
    cel.setAttribute("id", `id-${i}`);

    for (let j = 1; j <= 100; j++) {
        let celll = document.createElement('div'); // Fix the variable name here
        celll.setAttribute("class", `${i} ${j} cells`);
        celll.setAttribute("id", `${i}-${j}`);
        console.log("hello");
        cel.appendChild(celll);
    }
    document.querySelector(".input-cells").appendChild(cel)
    
}


document.querySelector(".cells").classList.add("select")
cell.addEventListener("click", function (e) {
    if (e.ctrlKey) {
        const [currentraw, currentcol] = getRawCol(e.target);
        let right = document.getElementById(`${currentraw}-${currentcol + 1}`).classList.contains("select");
        if (right) {

            e.target.classList.add("right-cell");
            e.target.classList.add("select");
            document.getElementById(`${currentraw}-${currentcol + 1}`).classList.add("left-cell");

        }

        let bottom = document.getElementById(`${currentraw + 1}-${currentcol}`).classList.contains("select");
        if (bottom) {

            e.target.classList.add("bottom-cell");
            e.target.classList.add("select");
            document.getElementById(`${(currentraw + 1)}-${currentcol}`).classList.add("top-cell");


        }

        let top = document.getElementById(`${currentraw - 1}-${currentcol}`).classList.contains("select");
        if (top) {

            e.target.classList.add("top-cell");
            e.target.classList.add("select");
            document.getElementById(`${currentraw - 1}-${currentcol}`).classList.add("bottom-cell");

        }

        let left = document.getElementById(`${currentraw}-${currentcol - 1}`).classList.contains("select");
        if (left) {

            e.target.classList.add("left-cell");
            e.target.classList.add("select");
            document.getElementById(`${currentraw}-${currentcol - 1}`).classList.add("right-cell");

        }

        e.target.classList.add("select");


    }
    else {

        document.querySelector(".select").classList.remove("select")
        e.target.classList.add("select");
        // updateCssProperty(celldata[selectedSheet][currentraw][currentcol]);
    }
});

function getRawCol(e) {
    let arr = e.getAttribute("id").split("-");
    console.log(arr);
    let raw = parseInt(arr[0]);
    let col = parseInt(arr[1]);
    return [raw, col];
    //return arr;
}

cell.addEventListener("dblclick", (e) => {
    console.log("reached here")
    e.target.setAttribute("contenteditable", "true");


    e.target.focus();
});

function updateCssProperty(value) {



    document.querySelector(".cells.select").style[value.key] = value.val;
    let [rowid, colid] = getRawCol(document.querySelector(".cells.select"));

    //storing properties into object

    if (celldata[selectedSheet][rowid]) {
        if (celldata[selectedSheet][rowid][colid]) {

            celldata[selectedSheet][rowid][colid][value.key] = value.val;

        }
        else {
            celldata[selectedSheet][rowid][colid] = { ...defaultproperties };
            celldata[selectedSheet][rowid][colid][value.key] = value.val;

        }

    }
    else {
        celldata[selectedSheet][rowid] = {};
        celldata[selectedSheet][rowid][colid] = { ...defaultproperties };
        celldata[selectedSheet][rowid][colid][value.key] = value.val;


    }

}

document.querySelector(".icon-bold").addEventListener("click", (e) => {
    document.querySelector(".icon-bold").classList.toggle("selecte");
    updateCssProperty({ key: "fontWeight", val: 'bold' })
   

});

document.querySelector(".icon-italic").addEventListener("click", (e) => {
    updateCssProperty({ key: "font-style", val: 'italic' })
    document.querySelector(".icon-italic").classList.toggle("selecte");


});

document.querySelector(".font-family-selector").addEventListener("click", () => {
    let selectvalue = document.querySelector(".font-family-selector").value;
    updateCssProperty({ key: "font-family", val: selectvalue });
});

document.querySelector(".icon-align_right").addEventListener("click", () => {
    document.querySelector(".icon-align_right").classList.toggle("selecte");
    updateCssProperty({ key: "text-align", val: 'right' });
});

document.querySelector(".icon-align_left").addEventListener("click", () => {
    document.querySelector(".icon-align_left").classList.toggle("selecte");
    updateCssProperty({ key: "text-align", val: 'left' });
});

document.querySelector(".icon-align_center").addEventListener("click", () => {
    document.querySelector(".icon-align_center").classList.toggle("selecte");
    updateCssProperty({ key: "text-align", val: 'center' });
});

document.querySelector(".icon-underline").addEventListener("click", () => {
    updateCssProperty({ key: "text-decoration", val: 'underline' });
});

document.querySelector(".format-color-fill").addEventListener("click", () => {
    document.querySelector(".color-filler").click();
});

document.querySelector(".icon-color_tex").addEventListener("click", () => {
    document.querySelector(".color-filer").click();
    document.querySelector(".color-filer").addEventListener("change", (e) => {
        let colorValue = document.querySelector(".color-filer").value;
        updateCssProperty({ key: "color", val: colorValue });
    });
})

document.querySelector(".color-filler").addEventListener("change", (e) => {
    let colorValue = document.querySelector(".color-filler").value;
    updateCssProperty({ key: "background-color", val: colorValue });
});

document.querySelector(".color-filer").addEventListener("change", (e) => {
    let colorValue = document.querySelector(".color-filler").value;
    updateCssProperty({ key: "color", val: colorValue });
});

document.querySelector(".font-size-selector").addEventListener("click", () => {
    let selectvalue = document.querySelector(".font-size-selector").value;
    updateCssProperty({ key: "font-size", val: `${selectvalue}px` });
});

document.addEventListener("DOMContentLoaded", function () {
    var inputCellContainer = document.querySelector(".input-cells");
    var columnNameContainer = document.querySelector(".column-name-container");
    var rowNameContainer = document.querySelector(".raw-name-container");

    inputCellContainer.addEventListener("scroll", function () {
        columnNameContainer.scrollLeft = inputCellContainer.scrollLeft;
        rowNameContainer.scrollTop = inputCellContainer.scrollTop;
    });
});

document.querySelector(".sheet-bar").addEventListener("click", function (e) {
    let Div = document.createElement('div');
    Div.setAttribute("class", "rename");
    Div.innerHTML = "rename";
    //let sheet = document.getElementsByClassName("sheet").classList.contains("sheet");
    if (e.target.classList.contains("sheet")) {
        document.querySelector(".input-cells").appendChild(Div);
    }
    console.log(e.x,e.y);
  
    

})

document.querySelector(".formula-input-cell").addEventListener("click", function () {
    document.querySelector(".formula-input-cell").classList.add("select");
})
let count = 2;
document.querySelector(".icon-add").addEventListener("click", function (e) {
    console.log("entered");
    let newsheet = `sheet${count}`;
    count = count + 1;
    celldata[newsheet]={};
    console.log("cell created");
    let sheet = document.createElement('div');
    sheet.setAttribute("class", "sheet");
    sheet.innerHTML = newsheet;
    document.querySelector(".sheet-bar").appendChild(sheet);
    selectedSheet = newsheet;
    

    console.log(celldata);
})

console.log(celldata);