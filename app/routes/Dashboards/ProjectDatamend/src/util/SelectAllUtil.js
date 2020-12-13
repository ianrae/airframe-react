

const SelectAllUtil = {
  calcSetAll: (ar, count, flag) => {
    console.log("calcSetAll..");
    if (flag) {
      return count + 1 === ar.length;
    } else {
      return false;
    }
  },
  count: (ar) => {
    console.log("count..");
    const xx = ar.filter(x => x === true);
    return xx.length;
  },
  setSelectAllEx: (flag, flags, setFlags) => {
    console.log("axllex " + flag);
    const clone = [...flags];
    for(let i = 0; i < flags.length; i++) {
      clone[i] = flag;
    }
    setFlags(clone);
    return clone;
  },
  setOneFlag: (i, flag, flags, setFlags) => {
    console.log("setOneFlag " + flag);
    const clone = [...flags];
    clone[i] = flag;
    setFlags(clone);
  },

}

Object.freeze(SelectAllUtil);
export default SelectAllUtil;
