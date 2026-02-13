# Summary
Bytesized Journal is meant to be a fairly simple day time journal and dream journal web application.
## Tech Stack
This web app is using vanilla web technologies. 
The entries for the journal are meant to be stored in the browsers IndexedDB API. One object store is the list of all entries and their ID. The other store is the entries themselves that can be pulled by their ID when known. 

The most advanced features of the web application are
- Storing use created data to their local device storage using the indexedDB API and Cache API
- A dynamically rendered calendar that displays journal entries in accurate time
- The ability to store local images within the app and display them dynamically on a web based UI