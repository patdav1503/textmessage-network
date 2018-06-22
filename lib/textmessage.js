/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Send public message transaction
 * @param {org.message.mynetwork.sendPublicMessage} newMessage
 * @transaction
 */
async function sendPublicMessage(newMessage) {
    // Validate input references
    var lastName = newMessage.creator.lastName;
    console.log('publicMessage-->owner ' + newMessage.creator);

    // This is the factory for creating instances of types.
    var factory = getFactory();
    var NS = 'org.message.mynetwork';

    var myMessage = factory.newResource(NS, 'Message', newMessage.messageId);
    myMessage.creator = newMessage.creator;
    myMessage.value = newMessage.value;
    myMessage.subject = newMessage.subject;

    return getAssetRegistry(NS + '.Message')
        .then(function(messageRegistry) {
            // Add the message
            return messageRegistry.addAll([myMessage]);
        });

}

/**
 * Send public reply transaction
 * @param {org.message.mynetwork.sendPublicReply} newReply
 * @transaction
 */
async function sendPublicReply(newReply) {
    // Validate input references
    var messageCreator = newReply.parentMessage.creator;
    var lastName = newReply.creator.lastName;
    console.log('publicReply-->parentMessage '+newReply.parentMessage);
    console.log('publicReply-->owner ' + newReply.creator);
    console.log('publicReply-->messageOwner ' + messageCreator);

    // This is the factory for creating instances of types.
    var factory = getFactory();
    var NS = 'org.message.mynetwork';

    var myReply = factory.newResource(NS, 'Reply', newReply.replyId);
    myReply.replyTo = newReply.parentMessage;
    myReply.creator = newReply.creator;
    myReply.value = newReply.value;
    myReply.subject = newReply.subject;

    return getAssetRegistry(NS + '.Reply')
        .then(function(replyRegistry) {
            // Add the reply
            return replyRegistry.addAll([myReply]);
        });

}

/**
 * Send private message transaction
 * @param {org.message.mynetwork.sendPrivateMessage} newMessage
 * @transaction
 */
async function sendPrivateMessage(newMessage) {
    // Validate input references
    var lastName = newMessage.creator.lastName;
    var lastNameR = newMessage.recipient.lastName;
    console.log('privateMessage-->owner ' + newMessage.creator);
    console.log('privateMessage-->recipient ' + newMessage.recipient);

    // This is the factory for creating instances of types.
    var factory = getFactory();
    var NS = 'org.message.mynetwork';

    var myMessage = factory.newResource(NS, 'directMessage', newMessage.messageId);
    myMessage.creator = newMessage.creator;
    myMessage.recipient = newMessage.recipient;
    myMessage.value = newMessage.value;
    myMessage.subject = newMessage.subject;

    return getAssetRegistry(NS + '.directMessage')
        .then(function(messageRegistry) {
            // Add the reply
            return messageRegistry.addAll([myMessage]);
        });

}

/**
 * Send public reply transaction
 * @param {org.message.mynetwork.sendPrivateReply} newReply
 * @transaction
 */
async function sendPrivateReply(newReply) {
    // Validate input references
    var messageCreator = newReply.parentMessage.creator;
    var lastName = newReply.creator.lastName;
    var lastNameR = newReply.recipient.lastName;
    console.log('privateReply-->parentMessage '+newReply.parentMessage);
    console.log('privateReply-->owner ' + newReply.creator);
    console.log('privateReply-->recipient ' + newReply.recipient);
    console.log('privateReply-->messageOwner ' + messageCreator);

    // This is the factory for creating instances of types.
    var factory = getFactory();
    var NS = 'org.message.mynetwork';

    var myReply = factory.newResource(NS, 'directReply', newReply.replyId);
    myReply.replyTo = newReply.parentMessage;
    myReply.creator = newReply.creator;
    myReply.recipient = newReply.recipient;
    myReply.value = newReply.value;
    myReply.subject = newReply.subject;

    return getAssetRegistry(NS + '.directReply')
        .then(function(replyRegistry) {
            // Add the reply
            return replyRegistry.addAll([myReply]);
        });

}