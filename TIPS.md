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

## Files Upload

- [**dropzone-ui-react**: The most complete React Library Component for drag’n’drop files.](https://github.com/dropzone-ui/dropzone-ui-react) Image and video previews. File validation. Multilanguage. Server side support.
  ![preview](https://user-images.githubusercontent.com/43678736/148801752-954fa819-023d-4596-b557-56f7a38f4745.png)

- [react-mui-fileuploader - npm](https://www.npmjs.com/package/react-mui-fileuploader?activeTab=readme) React mui **fileuploader** is a react component based on @mui v5 that allows you to upload files with an awesome ui component.
  ![preview](https://raw.githubusercontent.com/rouftom/react-mui-fileuploader/HEAD/public/preview.png)

---

### [javascript - querySelector, wildcard element match? - Stack Overflow](https://stackoverflow.com/questions/8714090/queryselector-wildcard-element-match)

`[id^='someId']` will match all ids starting with `someId`.

`[id$='someId']` will match all ids ending with `someId`.

`[id*='someId']` will match all ids containing `someId`.

If you're looking for the `name` attribute just substitute `id` with `name`.

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
