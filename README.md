# Fun Parser

Application created for Mid Module Assessments for Module 3 of the Turing School

## Getting Started

Install dependencies:

```bash
npm install
```

Start the server:

```bash
node index.js
```

Visit on `localhost:3001`

Run the tests:

```bash
npm test
```

## Endpoints

### Events

##### `GET` /events  
Returns a list of all events

##### `POST` /events

Returns the specified event including tags generated based on the description.

* **Parameters:**  
  * **name:** *(required)* <String> - the name of the event
  * **description:** *(required)* <String> - the description of the event


* **Body Content:**  
  * You must pass in a full question object like so:

```json
{
  "name": "Try Coding Weekend",
  "description": "Are you interested in learning how to code, but not sure if it's right for you? Try Coding is a two-day program from the Turing School that will expose you to the basics of programming."
}
```
* **Response:** 
 * Will return an object representing an event

```json
 {
  "name": "Try Coding Weekend",
  "description": "Are you interested in learning how to code, but not sure if it's right for you? Try Coding is a two-day program from the Turing School that will expose you to the basics of programming.",
  tags: [
    "code",
    "coding",
    "school",
    "programming"
  ],
  id: "a4ecf540-3b73-11e7-bb1a-655977479ad2"
}
```
