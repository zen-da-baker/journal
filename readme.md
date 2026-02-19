# Summary
Bytesized Journal is meant to be a fairly simple journaling web application with two main section, one for day time journaling, and one for dream journaling. The internet traveler, the user, can see their journal entries displayed on a calendar and in turn add journal entries to the calendar. 
## Tech Stack Choice
### Stack
- HTML
- CSS
- TypeScript
- ExpressJS
### Reasoning for this Stack
This web app is using vanilla web technologies. I chose to include base technologies of HTML, CSS, and TypeScript without added frameworks because I wanted the final version of the application to be installable on the user's device with a Service Worker which requires me to know the names of the files the user will request from my server. This was also a challenge to see if I can create a quality user experience without relying solely on a framework to make that happen. 
## APIs Utilized
### Backend
The backend with ExpressJS does not make use of any APIs beyond the ones built into ExpressJS itself. The server does have the capability to store information on the backend however I decided to proceed without this infavor of a heavier frontend experience. 
### Frontend
The frontend utilizes the IndexedDB API for and Web Storage API for handling user data. Web Storage with localStorage in particular was used mainly for organizing how specific journal entries will be found without their content being stored in this particular place. Instead, IndexedDB was used for storing the core content of the journal entries which allows the total user data used to be far beyond the 5MB limit of Web Storage. Journal entries stored in the IndexedDB database have a class which is fairly simple, containing an ID for searching for a particular entry and having a list of lines for what will be displayed on the page as well as some other metadata properties. 
As I create the final version of the app, I want the user to have the option of installing it from their web browser directly which would mean the Service Worker API will be utilized to intercept network connections and the Cache API will be used to store page content. With both of these together, the user will be able to load the web page whenever they would like without a network connection. This will allow the user to utilize the app entirely offline even if the web server itself were to become unavailable. This method is based on a test done with my Math Quiz website which did acheive exactly this intended goal. 