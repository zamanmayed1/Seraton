chrome.commands.onCommand.addListener((command) => {
  if (command === "fill_form") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: fillFormWithStoredData
      });
    });
  }
});

function fillFormWithStoredData() {
  chrome.storage.local.get('contactData', ({ contactData }) => {
    if (contactData) {
      const fillField = (fieldSelector, value) => {
        const field = document.querySelector(fieldSelector);
        if (field) field.value = value;
      };

      fillField('input[name="first_name"], input[name="FirstName"], input[name="firstname"], input[name="firstName"], input[placeholder*="First Name"], input[placeholder*="First name"]', contactData.firstName);
      fillField('input[name="last_name"], input[name="LastName"],input[name="lastname"], input[name="lastName"], input[placeholder*="Last Name"], input[placeholder*="Last name"]', contactData.lastName);
      fillField('input[name="full_name"], input[name="fullname"],input[name="Name"], input[name="name"], input[name="fullName"], input[placeholder*="Full Name"], input[placeholder*="Full name"]', contactData.fullName);
      fillField('input[name="subject"], input[placeholder*="Subject"]', contactData.subject);
      fillField('input[name="email"], input[name="email_address"], input[type="email"], input[placeholder*="Email"]', contactData.email);
      fillField('input[name="phone"], input[name="PhoneNumber"], input[name="telephone"], input[type="tel"], input[placeholder*="Phone"]', contactData.phone);
      fillField('textarea[name="body"], textarea[name="comment"],textarea[name="Message"],textarea[name="message"], textarea[name="your-message"], textarea[placeholder*="Your message"],textarea[placeholder*="Body"], textarea[placeholder*="Message"]', contactData.emailBody);
    }
  });
}
