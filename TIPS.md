- [$regex — MongoDB Manual](https://www.mongodb.com/docs/manual/reference/operator/query/regex/)

- [Text Search — MongoDB Manual](https://www.mongodb.com/docs/v3.2/text-search/)

- [How to pass regex expression in JSON to API? - Stack Overflow](https://stackoverflow.com/questions/56471002/how-to-pass-regex-expression-in-json-to-api)

- [mongodb - Checking if a field contains a string - Stack Overflow](https://stackoverflow.com/questions/10610131/checking-if-a-field-contains-a-string)

- [module.exports vs exports in Node](https://www.freecodecamp.org/news/module-exports-how-to-export-in-node-js-and-javascript/)

---

### [Snippets info vscode-react](https://github.com/ults-io/vscode-react-javascript-snippets/blob/HEAD/docs/Snippets.md)

```js
// passing options
await MyModel.find({ name: /john/i }, null, { skip: 10 }).exec();
```

---

### [Model.find() - Mongoose docs](https://mongoosejs.com/docs/api.html#model_Model-find)

---

### [React JS: How to determine if you are running debug or production](https://stackoverflow.com/questions/68892061/react-js-how-to-determine-if-you-are-running-debug-or-production)

`console.log("mode is " + process.env.NODE_ENV);`

More details example:

```javascript
if(process.env!.NODE_ENV === "production"){
     // set production urls
     // enable sentry
 }else if(process.env!.NODE_ENV === "development"){
     // set debug urls
 }else{
     // set defaults
}
```

---
