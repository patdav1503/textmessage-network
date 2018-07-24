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
    var creator;
    // Validate input references
    if (newMessage.creator) {
        var lastName = newMessage.creator.lastName;
        creator = newMessage.creator;
    } else {
        creator = getCurrentParticipant();
    }
    console.log('publicMessage-->creator ' + newMessage.creator);
    console.log('publicMessage-->getCurrentParticipant ' + getCurrentParticipant());

    // This is the factory for creating instances of types.
    var factory = getFactory();
    var NS = 'org.message.mynetwork';

    var myMessage = factory.newResource(NS, 'Message', newMessage.messageId);
    myMessage.creator = creator;
    myMessage.value = newMessage.value;
    myMessage.subject = newMessage.subject;

    await getAssetRegistry(NS + '.Message')
        .then(function(messageRegistry) {
            // Add the message
            return messageRegistry.addAll([myMessage]);
        });

    // emit the event for message creation
    var event = factory.newEvent(NS,'MessageCreated');
    event.newMessage = myMessage.getFullyQualifiedIdentifier();
    event.creator = myMessage.creator;
    event.subject = myMessage.subject;
    emit(event);
    console.log('publicMessage-->event '+event);

}

/**
 * Send public reply transaction
 * @param {org.message.mynetwork.sendPublicReply} newReply
 * @transaction
 */
async function sendPublicReply(newReply) {
    var creator;
    // Validate input references
    var messageCreator = newReply.parentMessage.creator;
    if (newReply.creator) {
        var lastName = newReply.creator.lastName;
        creator = newReply.creator;
    } else {
        creator = getCurrentParticipant();
    }
    console.log('publicReply-->parentMessage '+newReply.parentMessage);
    console.log('publicReply-->owner ' + newReply.creator);
    console.log('publicReply-->messageOwner ' + messageCreator);

    // This is the factory for creating instances of types.
    var factory = getFactory();
    var NS = 'org.message.mynetwork';

    var myReply = factory.newResource(NS, 'Reply', newReply.replyId);
    myReply.replyTo = newReply.parentMessage;
    myReply.creator = creator;
    myReply.value = newReply.value;
    myReply.subject = newReply.subject;

    await getAssetRegistry(NS + '.Reply')
        .then(function(replyRegistry) {
            // Add the reply
            return replyRegistry.addAll([myReply]);
        });

    // emit the event for reply created
    var event = factory.newEvent(NS,'ReplyCreated');
    event.newReply = myReply.getFullyQualifiedIdentifier();
    event.replyTo = myReply.replyTo.getFullyQualifiedIdentifier();
    event.creator = myReply.creator;
    event.subject = myReply.subject;
    emit(event);

}

/**
 * Send private message transaction
 * @param {org.message.mynetwork.sendPrivateMessage} newMessage
 * @transaction
 */
async function sendPrivateMessage(newMessage) {
    var creator;
    // Validate input references
    if (newMessage.creator) {
        var lastName = newMessage.creator.lastName;
        creator = newMessage.creator;
    } else {
        creator = getCurrentParticipant();
    }
    var lastNameR = newMessage.recipient.lastName;
    console.log('privateMessage-->owner ' + newMessage.creator);
    console.log('privateMessage-->recipient ' + newMessage.recipient);

    // This is the factory for creating instances of types.
    var factory = getFactory();
    var NS = 'org.message.mynetwork';

    var myMessage = factory.newResource(NS, 'directMessage', newMessage.messageId);
    myMessage.creator = creator;
    myMessage.recipient = newMessage.recipient;
    myMessage.value = newMessage.value;
    myMessage.subject = newMessage.subject;

    await getAssetRegistry(NS + '.directMessage')
        .then(function(messageRegistry) {
            // Add the reply
            return messageRegistry.addAll([myMessage]);
        });

    // emit the event for message created
    var event = factory.newEvent(NS,'MessageCreated');
    event.newMessage = myMessage.getFullyQualifiedIdentifier();
    event.creator = myMessage.creator;
    event.recipient = myMessage.recipient;
    event.subject = myMessage.subject;
    emit(event);
    console.log('publicMessage-->event '+event);

}

/**
 * Send public reply transaction
 * @param {org.message.mynetwork.sendPrivateReply} newReply
 * @transaction
 */
async function sendPrivateReply(newReply) {
    var creator;
    // Validate input references
    if (newReply.creator) {
        var lastName = newReply.creator.lastName;
        creator = newReply.creator;
    } else {
        creator = getCurrentParticipant();
    }
    var messageCreator = newReply.parentMessage.creator;
    var lastNameR = newReply.recipient.lastName;
    console.log('privateReply-->parentMessage '+newReply.parentMessage);
    console.log('privateReply-->creator ' + newReply.creator);
    console.log('privateReply-->recipient ' + newReply.recipient);
    console.log('privateReply-->messageOwner ' + messageCreator);

    // This is the factory for creating instances of types.
    var factory = getFactory();
    var NS = 'org.message.mynetwork';

    var myReply = factory.newResource(NS, 'directReply', newReply.replyId);
    myReply.replyTo = newReply.parentMessage;
    myReply.creator = creator;
    myReply.recipient = newReply.recipient;
    myReply.value = newReply.value;
    myReply.subject = newReply.subject;

    await getAssetRegistry(NS + '.directReply')
        .then(function(replyRegistry) {
            // Add the reply
            return replyRegistry.addAll([myReply]);
        });

    // emit the event for reply created
    var event = factory.newEvent(NS,'ReplyCreated');
    event.newReply = myReply.getFullyQualifiedIdentifier();
    event.replyTo = myReply.replyTo.getFullyQualifiedIdentifier();
    event.creator = myReply.creator;
    event.recipient = myReply.recipient;
    event.subject = myReply.subject;
    emit(event);

}

/**
 * Update message subject transaction
 * @param {org.message.mynetwork.updateSubject} newTrans
 * @transaction
 */
async function updateSubject(newTrans) {
    // Validate input references
    var oldSubject = newTrans.oldMessage.subject;

    newTrans.oldMessage.subject = newTrans.newSubject;

    console.log('oldMessage.$class '+newTrans.oldMessage.getFullyQualifiedType());
    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry(newTrans.oldMessage.getFullyQualifiedType());
    // Update the asset in the asset registry.
    await assetRegistry.update(newTrans.oldMessage);

}

/**
 * Update message value transaction
 * @param {org.message.mynetwork.updateValue} newTrans
 * @transaction
 */
async function updateValue(newTrans) {
    // Validate input references
    var oldValue = newTrans.oldMessage.value;

    newTrans.oldMessage.value = newTrans.newValue;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry(newTrans.oldMessage.getFullyQualifiedType());
    // Update the asset in the asset registry.
    await assetRegistry.update(newTrans.oldMessage);

}
