chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fillForm') {
    chrome.storage.local.get('contactData', ({ contactData }) => {
      if (contactData) {
        const fillField = (fieldSelector, value) => {
          const field = document.querySelector(fieldSelector);
          if (field) field.value = value;
        };

        fillField('input[name="first_name"], input[name="firstname"], input[name="firstName"], input[placeholder*="First Name"], input[placeholder*="First name"]', contactData.firstName);
        fillField('input[name="last_name"], input[name="lastname"], input[name="lastName"], input[placeholder*="Last Name"], input[placeholder*="Last name"]', contactData.lastName);
        fillField('input[name="full_name"], input[name="fullname"], input[name="fullName"], input[placeholder*="Full Name"], input[placeholder*="Full name"]', contactData.fullName);
        fillField('input[name="subject"], input[placeholder*="Subject"]', contactData.subject);
        fillField('input[name="email"], input[type="email"], input[placeholder*="Email"]', contactData.email);
        fillField('input[name="phone"], input[type="tel"], input[placeholder*="Phone"]', contactData.phone);
        fillField('textarea[name="body"], textarea[placeholder*="Body"], textarea[placeholder*="Message"]', contactData.emailBody);
      }
    });
  }
});
