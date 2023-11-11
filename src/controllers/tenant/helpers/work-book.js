const xlsx = require('xlsx');

const getSheetToJson = (workBook = {}, sheetName = '') => {
  return xlsx.utils.sheet_to_json(workBook.Sheets[sheetName]);
}

const parseMenu = (data = []) => {
  const menu = [];
  data.map((element) => {
    const [item, price, description, currency, negative] = Object.values(element);
    menu.push({ item, price, description, currency, negative });
  });

  return menu;
}

module.exports = {
  getSheetToJson,
  parseMenu,
}