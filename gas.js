function setup() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const rows = sheet.getDataRange().getValues();
  const header = rows[0];
  return [sheet, rows, header];
}

function doGet() {
  const [sheet, rows, header] = setup();

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
  const [sheet, rows, header] = setup();
  
  const data = JSON.parse(e.postData.getDataAsString());
  let rowArray = []
  for (let key of header) {
    rowArray.push(data[key]);
  }

  let message;
  if (Object.keys(data).includes("id")) {
    if (Object.keys(data).length === 1) {
      // Delete
      try {
        sheet.deleteRow(Number(data["id"]) + 1);
        message = { status: "success" };
      } catch(error) {
        message = { status: "error", message: error };
      }
    } else {
      // Update
      try {
        for (let i = 0; i < rowArray.length; i++) {
          sheet.getRange(Number(data["id"]) + 1, i + 1).setValue(rowArray[i]);
        }
        message = { status: "success" };
      } catch(error) {
        message = { status: "error", message: error };
      }
    }
  } else {
    // Create
    try {
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
