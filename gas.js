function setup() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const rows = sheet.getDataRange().getValues();
  let header = rows[0];
  const maxId = Number(header.pop());
  return [sheet, rows, header, maxId];
}

function doGet() {
  const [sheet, rows, header, maxId] = setup();

  let data = []
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    let rowData = {};
    for (let j = 0; j < row.length; j++) {
      rowData[header[j]] = row[j]; 
    }
    data.push(rowData);
  }

  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(JSON.stringify(data));
  return output;  
}

function doPost(e) {
  const [sheet, rows, header, maxId] = setup();
  
  const data = JSON.parse(e.postData.getDataAsString());
  let rowArray = []
  for (let key of header) {
    rowArray.push(data[key]);
  }

  let message;
  if (Object.keys(data).includes("id")) {
    const index = rows.findIndex(row => Number(row[0]) === Number(data.id))
    if (Object.keys(data).length === 1) {
      // Delete
      try {
        sheet.deleteRow(index + 1);
        message = { status: "success" };
      } catch(error) {
        message = { status: "error", message: error };
      }
    } else {
      // Update
      try {
        for (let i = 0; i < rowArray.length; i++) {
          sheet.getRange(index + 1, i + 1).setValue(rowArray[i]);
        }
        message = { status: "success" };
      } catch(error) {
        message = { status: "error", message: error };
      }
    }
  } else {
    // Create
    try {
      const newId = maxId + 1;
      rowArray[0] = newId;
      sheet.getRange(1, header.length + 1).setValue(newId);
      sheet.appendRow(rowArray);
      message = { status: "success" };
    } catch(error) {
      message = { status: "error", message: error };
    }
  }

  let output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(JSON.stringify(message));
  return output;
}
