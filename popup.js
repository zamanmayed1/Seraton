document.addEventListener('DOMContentLoaded', () => {
  // Load saved data from storage when popup is opened
  chrome.storage.local.get('contactData', ({ contactData }) => {
    if (contactData) {
      document.getElementById('firstName').value = contactData.firstName || '';
      document.getElementById('lastName').value = contactData.lastName || '';
      document.getElementById('fullName').value = contactData.fullName || '';
      document.getElementById('subject').value = contactData.subject || '';
      document.getElementById('email').value = contactData.email || '';
      document.getElementById('phone').value = contactData.phone || '';
      document.getElementById('emailBody').value = contactData.emailBody || '';
    }
  });

  document.getElementById('saveData').addEventListener('click', () => {
    const contactData = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      fullName: document.getElementById('fullName').value,
      subject: document.getElementById('subject').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      emailBody: document.getElementById('emailBody').value
    };
    
    chrome.storage.local.set({ contactData }, () => {
      alert('Data saved successfully!');
    });
  });

  document.getElementById('fillForm').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: fillFormWithStoredData
      });
    });
  });
});

function fillFormWithStoredData() {
  chrome.storage.local.get('contactData', ({ contactData }) => {
    if (contactData) {
      const fillField = (selectors, value) => {
        selectors.forEach(selector => {
          document.querySelectorAll(selector).forEach(field => {
            if (field) {
              field.click();
              field.value = value;
              field.dispatchEvent(new Event('input', { bubbles: true })); // Ensures React or other frameworks detect the change
            }
          });
        });
      };

      fillField([
        'input[id*="first_name"]', 'input[id*="FirstName"]', 'input[id*="firstname"]', 'input[id*="firstName"]',
        'input[name*="first_name"]', 'input[name*="FirstName"]', 'input[name*="firstname"]', 'input[name*="firstName"]',
        'input[placeholder*="First Name"]', 'input[placeholder*="First name"]', 
        'input[aria-label*="First Name"]', 'input[aria-label*="First name"]', 
        'input[aria-labelledby*="First Name"]', 'input[aria-labelledby*="First name"]'
      ], contactData.firstName);
      
      fillField([
        'input[id*="last_name"]', 'input[id*="LastName"]', 'input[id*="lastname"]', 'input[id*="lastName"]',
        'input[name*="last_name"]', 'input[name*="LastName"]', 'input[name*="lastname"]', 'input[name*="lastName"]',
        'input[placeholder*="Last Name"]', 'input[placeholder*="Last name"]',
        'input[aria-label*="Last Name"]', 'input[aria-label*="Last name"]', 
        'input[aria-labelledby*="Last Name"]', 'input[aria-labelledby*="Last name"]'
      ], contactData.lastName);
      
      fillField([
        'input[id*="full_name"]', 'input[id*="fullname"]', 'input[id*="fullName"]', 'input[id*="name"]',
        'input[name*="full_name"]', 'input[name*="fullname"]', 'input[name*="fullName"]', 'input[name*="name"]',
        'input[placeholder*="Full Name"]', 'input[placeholder*="Full name"]', 'input[placeholder*="Name"]', 
        'input[aria-label*="Full Name"]', 'input[aria-label*="Full name"]', 'input[aria-label*="Name"]', 
        'input[aria-labelledby*="Full Name"]', 'input[aria-labelledby*="Full name"]', 'input[aria-labelledby*="Name"]'
      ], contactData.fullName);
      
      fillField([
        'input[id*="subject"]', 'input[name*="subject"]', 'input[placeholder*="Subject"]', 
        'input[aria-label*="Subject"]', 'input[aria-labelledby*="Subject"]'
      ], contactData.subject);
      
      fillField([
        'input[id*="email"]', 'input[id*="email_address"]', 'input[type="email"]',
        'input[name*="email"]', 'input[name*="email_address"]',
        'input[placeholder*="Email"]', 'input[placeholder*="email"]',
        'input[aria-label*="Email"]', 'input[aria-label*="email"]',
        'input[aria-labelledby*="Email"]', 'input[aria-labelledby*="email"]'
      ], contactData.email);
      
      fillField([
        'input[id*="phone"]', 'input[id*="PhoneNumber"]', 'input[id*="telephone"]', 'input[type="tel"]',
        'input[name*="phone"]', 'input[name*="PhoneNumber"]', 'input[name*="telephone"]',
        'input[placeholder*="Phone"]', 'input[placeholder*="phone"]',
        'input[aria-label*="Phone"]', 'input[aria-label*="phone"]',
        'input[aria-labelledby*="Phone"]', 'input[aria-labelledby*="phone"]'
      ], contactData.phone);
      
      fillField([
        'textarea[id*="body"]', 'textarea[id*="comment"]', 'textarea[id*="Message"]', 'textarea[id*="message"]', 'textarea[id*="your-message"]',
        'textarea[name*="body"]', 'textarea[name*="comment"]', 'textarea[name*="Message"]', 'textarea[name*="message"]', 'textarea[name*="your-message"]',
        'textarea[placeholder*="Your message"]', 'textarea[placeholder*="Body"]', 'textarea[placeholder*="Message"]',
        'textarea[aria-label*="Your message"]', 'textarea[aria-label*="Body"]', 'textarea[aria-label*="Message"]',
        'textarea[aria-labelledby*="Your message"]', 'textarea[aria-labelledby*="Body"]', 'textarea[aria-labelledby*="Message"]'
      ], contactData.emailBody);
    }
  });
}
