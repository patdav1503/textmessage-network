# textmessage-network

> This is an interactive, distributed, car auction demo. List assets for sale (setting a reserve price), and watch as assets that have met their reserve price are automatically transferred to the highest bidder at the end of the auction.

This business network defines:

**Participants:**
`Member` `Admin`

**Assets:**
`Message` `Reply` `directMessage` `directReply`

**Transactions:**
`sendPublicMessage` `sendPublicReply` `sendPrivateMessage` `sendPrivateReply`

The `sendPublicMessage` function is called when an `sendPublicMessage` transaction is submitted. The logic simply checks that the listing for the offer is still for sale, and then adds the offer to the listing, and then updates the offers in the `Message` asset registry.

The `sendPublicReply` function is called when an `sendPublicReply` transaction is submitted. The logic simply checks that the listing for the offer is still for sale, and then adds the offer to the listing, and then updates the offers in the `Reply` asset registry.

The `sendPrivateMessage` function is called when an `sendPrivateMessage` transaction is submitted. The logic simply checks that the listing for the offer is still for sale, and then adds the offer to the listing, and then updates the offers in the `directMessage` asset registry.

The `sendPrivateMessage` function is called when an `sendPrivateReply` transaction is submitted. The logic simply checks that the listing for the offer is still for sale, and then adds the offer to the listing, and then updates the offers in the `directReply` asset registry.

To test this Business Network Definition using **Composer CLI**

From the top directory with `package.json`, run `npm install` to install network and required packages into `npm`.  Use `npm test` to run the test using `mocha` and `cucumber` as defined in the `package.json` file.

To test this Business Network Definition in the **Test** tab:


## License <a name="license"></a>
Hyperledger Project source code files are made available under the Apache License, Version 2.0 (Apache-2.0), located in the LICENSE file. Hyperledger Project documentation files are made available under the Creative Commons Attribution 4.0 International License (CC-BY-4.0), available at http://creativecommons.org/licenses/by/4.0/.