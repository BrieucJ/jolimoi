const convertToRoman = (number) => {
  if (!Number.isInteger(parseFloat(number))) throw new Error("value is not an integer")
  if (number > 3999999) throw new Error("value too large, max is 3 999 999")
  var romanMapping = [
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1]
  ];
  if (number === 0) {
    return '';
  }
  for (let i = 0; i < romanMapping.length; i++) {
    let roman = romanMapping[i][0]
    let arab = romanMapping[i][1]
    if(number >= arab){
      return roman + convertToRoman(number - arab);
    }
  }
}

export default convertToRoman