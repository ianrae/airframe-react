

const GridUtil = {
  calcRows: (res) => {
    console.log('rows: ' + res.grid.rows.length);
    let xrowData = [];
    for(let i = 0; i < res.grid.rows.length; i++) {
      let rowObj = {i: i, data: []};
      //console.log(i);
      let row = res.grid.rows[i];
      for(let j = 0; j < row.cells.length; j++) {
        let cell = row.cells[j];
        rowObj.data.push(cell.val);
      }
      xrowData.push(rowObj);
    }
    return xrowData;
  },

  calcHdrs: (res) => {
    let hdrs = [];
    for(let i = 0; i < res.grid.hdrList.length; i++) {
      let row = res.grid.hdrList[i];
      hdrs.push(row.fieldName);
    }
    return hdrs;
  }

}

Object.freeze(GridUtil);
export default GridUtil;
