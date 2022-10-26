# Public_Api_Request

Project Instructions
To complete this project, follow the instructions below. If you get stuck, ask a question on Slack or in the Treehouse Community.

 9 steps
Create your js/scripts.js file and wire it up to the HTML
Frameworks, libraries or plugins are not permitted.
HTML
You'll be provided with a basic index.html file to use in your project. But this file is missing the main components of the app, which you will need to create and add to the DOM dynamically.
Comments in the index.html file contain examples of the markup you'll need to add. So use the markup in those comments as a template. And keep in mind that altering the arrangement of the markup and the attributes used may break the styles or functionality.
NOTE: When adding or concatenating to the DOM, avoid doing this: element.innerHTML += 'HTML string'. That technique rewrites the entire DOM. This is problematic because any rewritten elements won't retain any event listeners that were attached to the DOM before the rewrite occurs. Use this method instead: element.insertAdjacentHTML('beforeend', 'HTML string'). That technique will allow you to add strings of HTML to the DOM without disrupting what already exists in the DOM.
Structure, style and CSS
Your finished project should match the general position and layout of the mockups. If you followed the arrangement and attributes of the template markup in the HTML comments, then the provided styles should accomplish this for you.
You are encouraged to experiment with things like color, background color, font, shadows, transitions and animations to make this project your own.
Get and display 12 random users
With information provided from The Random User Generator API, send a single request to the API, and use the response data to display 12 users, along with some basic information for each:
Image
First and Last Name
Email
City or location
Refer to the mockups and the comments in the index.html file for an example of what info should be displayed on the page and how it should be styled.
Create a modal window
When any part of an employee item in the directory is clicked, a modal window should pop up with the following details displayed:
Image
Name
Email
City or location
Cell Number
Detailed Address, including street name and number, state or country, and post code.
Birthday
Make sure there’s a way to close the modal window
Refer to the mockups and the comments in the index.html file for an example of what info should be displayed on the page and how it should be styled.
NOTE: The formatting of the Cell Number should be (XXX) XXX-XXXX and the formatting of the Birthday should be MM/DD/YYYY.

Add good code comments
Cross-Browser consistency:
Google Chrome has become the default development browser for most developers. With such a selection of browsers for users to choose from, it's a good idea to get in the habit of testing your projects in all modern browsers.
Carefully review the "How you'll be graded" section.
Quality Assurance and Project Submission Checklist
Perform QA testing on your project, checking for bugs, user experience and edge cases.
Check off all of the items on the Student Project Submission Checklist.
