
/*
let SHEET_ID ='1k6o9VBgXhCP7prSjikkIdmQPYEQT3VT-qPxPyF5y63w/edit#gid=0';
let SHEET_TITLE ='Hoja 1';
let SHEET_RANGE ='A1:b10';
let  FULL_URL = ('https://docs.google.com/spreadsheets/d/'+ SHEET_ID+ '/gviz/tq?sheet='+SHEET_TITLE+'&range='+SHEET_RANGE);
*/


fetch(FULL_URL)  
.then(resp => resp.text())
.then (resp => {
    let data = JSON.parse(rep.substr(47).slice(0,-2))
    for (let item of data.table.rows) {
        for (let cell of item.c) {
            if (cell && cell.v && typeof cell.v !== 'string') {
                
            }
        }
    }
})
// no funciona por conflicto CORS de google