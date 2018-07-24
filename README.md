# textmessage-network

> This is an interactive, distributed, car auction demo. List assets for sale (setting a reserve price), and watch as assets that have met their reserve price are automatically transferred to the highest bidder at the end of the auction.

This business network defines:

**Participants:**
`Member` `Admin`

**Assets:**
`Message` `Reply` `directMessage` `directReply`

**Transactions:**
`sendPublicMessage` `sendPublicReply` `sendPrivateMessage` `sendPrivateReply` `updateSubject` `updateValue`

**Events:**
`MessageCreated` `ReplyCreated` `SubjectUpdated` `ValueUpdated`

The `sendPublicMessage` function is called when an `sendPublicMessage` transaction is submitted. The logic simply checks the validity of the optional creator and uses the current user as creator if not given.  It then creates a record in the `Message` asset registry.

The `sendPublicReply` function is called when an `sendPublicReply` transaction is submitted. The logic checks the validity of the parentMessage and optional creator.  It then creates a record in the `Reply` asset registry.

The `sendPrivateMessage` function is called when an `sendPrivateMessage` transaction is submitted. The logic simply checks the validity of the recipient and optional creator.  It then creates a record in the `directMessage` asset registry.

The `sendPrivateReply` function is called when an `sendPrivateReply` transaction is submitted. The logic simply checks the validity of the parentMessage, recipient, and the optional creator.  It then creates a record in the `directReply` asset registry.

The `updateSubject` function is called when an `updateSubject` transaction is submitted. The logic simply checks the validity of the old message and changes its subject.  It then creates a record in the appropriate asset registry based on the type of the old message.

The `updateValue` function is called when an `updateValue` transaction is submitted. The logic simply checks the validity of the old Message and changes its value.  It then updates a record in the appropriate asset registry based on the type of the old message.

To test this Business Network Definition using **Composer CLI**

From the top directory with `package.json`, run `npm install` to install network and required packages into `npm`.  Use `npm test` to run the test using `mocha` and `cucumber` as defined in the `package.json` file.  Mocha tests are located in the test subdirectory and are written in Javascript.  Cumcumber tests are located in the features subdirectory and are written in the cucumber format.

To test this Business Network Definition in the **Test** tab:

In the `Member` participant registry, create two participants.

```
{
  "$class": "org.message.mynetwork.Member",
  "userId": "memberA@acme.org",
  "firstName": "Amy",
  "lastName": "Williams"
}
```

```
{
  "$class": "org.message.mynetwork.Member",
  "userId": "memberB@acme.org",
  "firstName": "Billy",
  "lastName": "Thompson"
}
```
In the `Message` asset registry, create a new asset of a vehicle owned by `memberA@acme.org`.

```
{
  "$class": "org.message.mynetwork.Message",
  "messageId": "1",
  "creator": "resource:org.message.mynetwork.Member#memberA@acme.org",
  "subject": "This is a test!",
  "value": "This is a test of the emergency broadcast system!"
}
```

```
{
  "$class": "org.message.mynetwork.Message",
  "messageId": "2",
  "creator": "resource:org.message.mynetwork.Member#memberB@acme.org",
  "subject": "This is not a test!",
  "value": "This is not a test of the emergency broadcast system!"
}
```


## License <a name="license"></a>
Hyperledger Project source code files are made available under the Apache License, Version 2.0 (Apache-2.0), located in the LICENSE file. Hyperledger Project documentation files are made available under the Creative Commons Attribution 4.0 International License (CC-BY-4.0), available at http://creativecommons.org/licenses/by/4.0/.