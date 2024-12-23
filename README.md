## About the project

This is the Self-Service portal for OSDU. It is used for onboarding of new members of OSDU from Equinor. It is also a place to check your entitlements groups, including adding groups and other members to groups. Some requests made are sent to the platform team for approval. The platfrom team also has an admin page where these requests are approved or rejected.

## Status of the project

This is a MVP and there are many possible improvements available.
The OSDU teams DevOps for Self Service Portal (tag: accSSP) includes many possible future features and improvements.

## About the repo

### APIs - /src/app/api/

auth/[...nextauth] - a part of the login logic
auth-API - get access token for the entititlement API
content - get the text from the files in /assets/content
entitlements - API calls to the entitlements groups

### Pages

auth/signin/ - Redirect to organization login
entitlements - Page that shows the users groups and available tasks to create groups and add members to the groups
onboarding - Page that shows base information about OSDU for a new user.
requests - Page that is only available for the platform team. Shows requests made by other users to create groups and add members to groups
Home page - Takes the user to different pages

### Content - /assets/content

Includes all the necessary text files for the onboarding page.
Raw-content.xlsx includes a first draft of the content in the onboarding page.

### Components - /components

/InfoCard - includes the frame for infocards shown in the onboarding page
/InfoCard/Content/ - Includes the rendering for the content on the infocards
/NOTUSE - every component made that are not used in this version

/AddIDtoGruopForm - Gather information needed to add a member to a group from the user
/CreateGroupForm - Gather information needed to create a group from the user

/Authentication - SignIn/SignOut: shown when the profile icon in the navbar is pressed
/RedirectHome - Redirects the user to the home page if it does not have access to the platform team page
/RedirectLogIn - Redirects the user to the organization login page if it is not logged in

/GroupDropDown - The information shown when a group is pressed in entitlements page
/RequestDropDown - The information shown when a request is pressed in the Request page

/NavBar - The content and logic of the navbar on top of the page
/TitleBanner - The content of the title banner shown on every page
/TopTask - The content and logic of the link buttons on the home page
/SideBar - The content and logic of the sidebar on the onboarding page

### Utilities - /utils

/entitlement - functions to call to /src/api/ for the entitlement APIs
checkRole - checks the role of the user to see if the Request page is available for the user
getChapterStructure and getContent - functions to call to /src/api/ for the content in onboarding
interfaces - types for many of the object used in the code

### Tests /tests

OBS! not updated
e2e - end-to-end tests in Playwright
unit - unit tests in Jest

## The structure of the content in Onboarding

The text files (src/assets/content) are used to present information on the onboarding page (/src/app/Onboarding/page). The function getContent (/src/utils/getContent) reads the content from the text files sends it to ContentRenderer (/src/component/InfoCard/Content/ContentRenderer) that uses the correct components for the object made in getContent. The components used in ContentRenderer can be found in /src/components/InfoCard/Content. The interfaces used in the code for the content are in /src/utils/interfaces.

The file chapter-structure.txt includes the setup in the sidebar. This will show the right information in the right places. The structure is setup like this:
Chapter 1: Name of Chapter 1
#chapter1-1.txt: Name of Chapter 1.1
#chapter1-2.txt: Name of Chapter 1.2
...
Chapter 2: Name of Chapter 2
...
This let's the code know the name of the chapter for the sidebar and which text file to read for the correct content in the correct order. Obs: "Name of Chapter 1.1" should be the same as the title after "Chapter 1-1: " in the first line of chapter1-1.txt.

The file names are named chapterX-Y.txt.
The first line needs to start with Chapter X-Y: Name of Chapter. X is for the chapter in the sidebar and Y is for the subchapter of chapter X (also in the sidebar).
The next lines are the content of Chapter X-Y.

There are a few different types of content. Each tag needs to start the line:
Subchapter: (ex: ## This is one information Card) - This marks each information card in every page. The number of lines that starts with ## is the number of cards on that page.
Image: (ex: #img: imageFile.jpg;) - This will show an image on the card. Only the name of the file is needed and the picture needs to be stored in /public/images.
Video: (ex: #video: videoFile.mp4;) - This will show a video on the card. Only the name of the file is needed and the video needs to be stored in /public/videos.
List: (ex. - this is one item in a list) - The line needs to start with "- ". This will be one item in a list object.
Paragraph: (ex. Just write the content like this) - If a line starts wihtout any tags, it will be a paragraph. Make sure to change lines if you will start a new paragraph. One paragraph needs to be on the same line.

NOT ADDED YET :D
Additionally, there are tags that doesn't need to be in the start of a line. These tags can only be in a paragraph, list or subchapter line:
Icons: (ex. #icon: iconFile.svg;) - This will show the icon mentioned where it is in the text with the same size as the text. The icons should be saved in /public/icons.

### Adding or changing the code or text files

If you want to change or add anything, the following files may need to be changed: /src/utils/getContent, /src/utils/interfaces, /src/app/Onboarding/page, /src/components/InfoCard/Content/ContentRenderer or add file or folder into /src/component/InfoCard(/Content).

Changing the text files or adding a chapter is done in /src/assets/content. And remember the correct naming of the files. The file chapter-structure.txt includes the setup in the sidebar. This will show the right information in the right places, so please follow this structure too.
