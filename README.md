## The structure of the content in Onboarding

The text files (src/assets/content) are used to present information on the onboarding page (/src/app/Onboarding/page). The function getContent (/src/utils/getContent) reads the content from the text files sends it to ContentRenderer (/src/component/InfoCard/Content/ContentRenderer) that uses the correct components for the object made in getContent. The components used in ContentRenderer can be found in /src/components/InfoCard/Content. The interfaces used in the code for the content are in /src/utils/interfaces.

The file chapter-structure.txt includes the setup in the sidebar. This will show the right information in the right places. The structure is setup like this:
Chapter 1: Name of Chapter 1
chapter1-1.txt: Name of Chapter 1.1
chapter1-2.txt: Name of Chapter 1.2
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
