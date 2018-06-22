# textmessage-network

> This is an interactive, distributed, car auction demo. List assets for sale (setting a reserve price), and watch as assets that have met their reserve price are automatically transferred to the highest bidder at the end of the auction.

This business network defines:

**Participants:**
`Member` `Admin`

**Assets:**
`Message` `Reply` `directMessage` `directReply`

**Transactions:**
`sendPublicMessage` `sendPublicReply` `sendPrivateMessage` `sendPrivateReply`

**Transactions:**
`Offer` `CloseBidding`

The `sendPublicMessage` function is called when an `sendPublicMessage` transaction is submitted. The logic simply checks that the listing for the offer is still for sale, and then adds the offer to the listing, and then updates the offers in the `Message` asset registry.

The `closeBidding` function is called when a `CloseBidding` transaction is submitted for processing. The logic checks that the listing is still for sale, sorts the offers by bid price, and then if the reserve has been met, transfers the ownership of the vehicle associated with the listing to the highest bidder. Money is transferred from the buyer's account to the seller's account, and then all the modified assets are updated in their respective registries.

To test this Business Network Definition in the **Test** tab:


## License <a name="license"></a>
Hyperledger Project source code files are made available under the Apache License, Version 2.0 (Apache-2.0), located in the LICENSE file. Hyperledger Project documentation files are made available under the Creative Commons Attribution 4.0 International License (CC-BY-4.0), available at http://creativecommons.org/licenses/by/4.0/.