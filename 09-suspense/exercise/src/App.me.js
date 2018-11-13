/*

1. Fill in `Contact` to use `ContactsResource` to fetch the contact, use the
path: `/contacts/${id}` like this:

2. Notice how we transition before the image loads and then the page jumps
around?  We're waiting for the contact data but not the image. Create an
`<Img/>` component and a new `ImgResource` to delay transitioning until
the image is loaded

Remember, `createResource` needs to return a promise

Tips:

```
// you can load images programatically
let image = new Image();
image.src = someUrl
image.onload = () => {}

// You can create promises out of anything, here we'll use
// setTimeout to make a "sleep" promise:
function sleep(ms=1000) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}

// combine those two things to create your `ImageResource`
```

3. Finally, render a `Placeholder` (you'll need to import it from react) around
`Img` with a `2000` delayMs, and then artificially delay your ImageResource by
3000ms with setTimeout.  What happens when you click the links now?

*/

import React, { Suspense } from "react";
import { unstable_createResource as createResource } from "react-cache";
import { Router, Link } from "@reach/router";

let ContactsResource = createResource(async path => {
  let response = await fetch(`https://contacts.now.sh${path}`);
  let json = await response.json();
  return json;
});

let ImageResource = createResource(async src => {
  return new Promise(resolve => {
    let img = new Image();
    img.src = src;
    img.onload = () => {
      setTimeout(() => {
        resolve(src);
      }, 3000);
    };
  });
});

function Img({ src, ...props }) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img src={ImageResource.read(src)} {...props} />;
}


function Home() {
  let { contacts } = ContactsResource.read("/contacts");
  return (
    <div>
      <h1>Contacts</h1>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            <Link to={contact.id}>
              {contact.first} {contact.last}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Contact({ id }) {
  let { contact } = ContactsResource.read(`/contacts/${id}`)
  return (
    <div>
      <h1>
        {contact.first} {contact.last}
      </h1>
      <p>
        <Suspense maxDuration={1000} fallback={<span>Loading...</span>}>
          <Img
            alt={`${contact.first} smiling, maybe`}
            height="250"
            src={contact.avatar}
          />
        </Suspense>
      </p>
      <p>
        <Link to="/">Home</Link>
      </p>
    </div>
  );
}

export default () => (
  <Suspense maxDuration={3000} fallback={<div>Loading...</div>}>
    <Router>
      <Home path="/" />
      <Contact path=":id" />
    </Router>
  </Suspense>
);
