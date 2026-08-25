/**
 * Google Apps Script for Jaipur Ride Contact Form
 * Spreadsheet ID: 1iW0u7JWi_O0TYaHu4PzWBIp7BXPYjd6qxBbaaTQs_nI
 *
 * How to setup:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1iW0u7JWi_O0TYaHu4PzWBIp7BXPYjd6qxBbaaTQs_nI/edit
 * 2. Click Extensions -> Apps Script.
 * 3. Replace all code in Code.gs with this script and save (Ctrl + S).
 * 4. Click Deploy -> New deployment.
 * 5. Select type: "Web app".
 * 6. Set Description: "Jaipur Ride Contact Handler".
 * 7. Set "Execute as": "Me".
 * 8. Set "Who has access": "Anyone" (CRITICAL for receiving web submissions).
 * 9. Click Deploy, Authorize access, and copy the Web App URL!
 * 10. (Optional) Paste the Web App URL into website/.env.local as:
 *     NEXT_PUBLIC_GOOGLE_SHEET_WEBAPP_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Ensure header row exists
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Email", "Feedback Type", "Message"]);
      sheet.getRange(1, 1, 1, 5).setFontWeight("bold").setBackground("#FCE7F3");
    }

    var data;
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    } else {
      data = {};
    }

    var timestamp = data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    var name = data.name || data["entry.1365438817"] || "Anonymous";
    var email = data.email || data["entry.2038720898"] || "No email";
    var feedbackType = data.feedbackType || data["entry.1323163345"] || "Inquiry";
    var message = data.message || data["entry.278843534"] || "";

    sheet.appendRow([timestamp, name, email, feedbackType, message]);

    return ContentService.createTextOutput(
      JSON.stringify({ result: "success", message: "Submission recorded successfully" })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "active", message: "Jaipur Ride Contact Webhook API is running" })
  ).setMimeType(ContentService.MimeType.JSON);
}
