Feature: Text Message Network

    Background:
        Given I have deployed the business network definition ..
        And I have added the following participants of type org.message.mynetwork.Member
            | userId          | firstName | lastName |
            | alice@email.com | Alice     | A        |
            | bob@email.com   | Bob       | B        |
        And I have added the following assets of type org.message.mynetwork.Message
            """
            [
            {"$class":"org.message.mynetwork.Message", "messageId":"001", "creator":"org.message.mynetwork.Member#alice@email.com", "subject":"Hello There!", "value":"This is a test"},
            {"$class":"org.message.mynetwork.Message", "messageId":"002", "creator":"org.message.mynetwork.Member#bob@email.com", "subject":"Goodbye All!", "value":"Go Away"}
            ]
            """
        And I have issued the participant org.message.mynetwork.Member#alice@email.com with the identity alice1
        And I have issued the participant org.message.mynetwork.Member#bob@email.com with the identity bob1

    Scenario: Alice can read all of the assets
        When I use the identity alice1
        Then I should have the following assets
            """
            [
            {"$class":"org.message.mynetwork.Message", "messageId":"001", "creator":"org.message.mynetwork.Member#alice@email.com", "subject":"Hello There!", "value":"This is a test"},
            {"$class":"org.message.mynetwork.Message", "messageId":"002", "creator":"org.message.mynetwork.Member#bob@email.com", "subject":"Goodbye All!", "value":"Go Away"}
            ]
            """

    Scenario: Bob can read all of the assets
        When I use the identity bob1
        Then I should have the following assets
            """
            [
            {"$class":"org.message.mynetwork.Message", "messageId":"001", "creator":"org.message.mynetwork.Member#alice@email.com", "subject":"Hello There!", "value":"This is a test"},
            {"$class":"org.message.mynetwork.Message", "messageId":"002", "creator":"org.message.mynetwork.Member#bob@email.com", "subject":"Goodbye All!", "value":"Go Away"}
            ]
            """

    Scenario: Alice can add assets that she owns
        When I use the identity alice1
        And I add the following asset of type org.message.mynetwork.Message
            | messageId | creator         | subject   | value               |
            | 003       | alice@email.com | No Hello? | Wasn't this a test? |
        Then I should have the following assets of type org.message.mynetwork.Message
            | messageId | creator         | subject   | value               |
            | 003       | alice@email.com | No Hello? | Wasn't this a test? |

    Scenario: Alice cannot add assets that Bob owns
        When I use the identity alice1
        And I add the following asset of type org.message.mynetwork.Message
            | messageId | creator         | subject    | value                       |
            | 003       | bob@email.com   | No Subject | Ain't got nothing to say... |
        Then I should get an error matching /does not have .* access to resource/

    Scenario: Bob can add assets that he owns
        When I use the identity bob1
        And I add the following asset of type org.message.mynetwork.Message
            | messageId | creator         | subject          | value        |
            | 004       | bob@email.com   | Goodbye Mr Bond! | Get Lost!    |
        Then I should have the following assets of type org.message.mynetwork.Message
            | messageId | creator         | subject          | value        |
            | 004       | bob@email.com   | Goodbye Mr Bond! | Get Lost!    |

    Scenario: Bob cannot add assets that Alice owns
        When I use the identity bob1
        And I add the following asset of type org.message.mynetwork.Message
            | messageId | creator         | subject          | value        |
            | 004       | alice@email.com | Goodbye Mr Bond! | Get Lost!    |
        Then I should get an error matching /does not have .* access to resource/

    Scenario: Alice can update her assets
        When I use the identity alice1
        And I update the following asset of type org.message.mynetwork.Message
            | messageId | creator         | subject   | value |
            | 001       | alice@email.com | New Value | 50    |
        Then I should have the following assets of type org.message.mynetwork.Message
            | messageId | creator         | subject   | value |
            | 001       | alice@email.com | New Value | 50    |

    Scenario: Alice cannot update Bob's assets
        When I use the identity alice1
        And I update the following asset of type org.message.mynetwork.Message
            | messageId | creator         | subject    | value |
            | 002       | bob@email.com   | No Subject | 50    |
        Then I should get an error matching /does not have .* access to resource/

    Scenario: Bob can update his assets
        When I use the identity bob1
        And I update the following asset of type org.message.mynetwork.Message
            | messageId | creator       | subject   | value |
            | 002       | bob@email.com | New Value | 60    |
        Then I should have the following assets of type org.message.mynetwork.Message
            | messageId | creator       | subject   | value |
            | 002       | bob@email.com | New Value | 60    |

    Scenario: Bob cannot update Alice's assets
        When I use the identity bob1
        And I update the following asset of type org.message.mynetwork.Message
            | messageId | creator         | subject    | value |
            | 001       | alice@email.com | No Subject | 60    |
        Then I should get an error matching /does not have .* access to resource/

    Scenario: Alice can remove her assets
        When I use the identity alice1
        And I remove the following asset of type org.message.mynetwork.Message
            | messageId |
            | 001       |
        Then I should not have the following assets of type org.message.mynetwork.Message
            | messageId |
            | 001       |

    Scenario: Alice cannot remove Bob's assets
        When I use the identity alice1
        And I remove the following asset of type org.message.mynetwork.Message
            | messageId |
            | 002       |
        Then I should get an error matching /does not have .* access to resource/

    Scenario: Bob can remove his assets
        When I use the identity bob1
        And I remove the following asset of type org.message.mynetwork.Message
            | messageId |
            | 002       |
        Then I should not have the following assets of type org.message.mynetwork.Message
            | messageId |
            | 002       |

    Scenario: Bob cannot remove Alice's assets
        When I use the identity bob1
        And I remove the following asset of type org.message.mynetwork.Message
            | messageId |
            | 001       |
        Then I should get an error matching /does not have .* access to resource/

    Scenario: Alice can send a message
        When I use the identity alice1
        And I submit the following transaction
            """
            [
            {"$class":"org.message.mynetwork.sendPublicMessage", "creator":"org.message.mynetwork.Member#alice@email.com", "messageId":"051", "subject":"Goodbye All!", "value":"Not this time."}
            ]
            """
        Then I should have the following assets
            """
            [
            {"$class":"org.message.mynetwork.Message", "messageId":"051", "creator":"org.message.mynetwork.Member#alice@email.com", "subject":"Goodbye All!", "value":"Not this time."}
            ]
            """

    Scenario: Alice can not send a message Bob owns
        When I use the identity alice1
        And I submit the following transaction
            """
            [
            {"$class":"org.message.mynetwork.sendPublicMessage", "creator":"org.message.mynetwork.Member#bob@email.com", "messageId":"051", "subject":"Goodbye All!", "value":"Not this time."}
            ]
            """
        Then I should get an error matching /does not have .* access to resource/

    Scenario: Alice can submit a reply for a message
        When I use the identity alice1
        And I submit the following transaction
            """
            [
            {"$class":"org.message.mynetwork.sendPublicReply", "parentMessage":"org.message.mynetwork.Message#002", "creator":"org.message.mynetwork.Member#alice@email.com", "replyId":"051", "subject":"Re: Goodbye All!", "value":"Not this time."}
            ]
            """
        Then I should have the following assets
            """
            [
            {"$class":"org.message.mynetwork.Reply", "messageId":"051", "creator":"org.message.mynetwork.Member#alice@email.com", "replyTo":"org.message.mynetwork.Message#002", "subject":"Re: Goodbye All!", "value":"Not this time."}
            ]
            """

    Scenario: Bob can send a message
        When I use the identity bob1
        And I submit the following transaction
            """
            [
            {"$class":"org.message.mynetwork.sendPublicMessage", "creator":"org.message.mynetwork.Member#bob@email.com", "messageId":"051", "subject":"Goodbye All!", "value":"Not this time."}
            ]
            """
        Then I should have the following assets
            """
            [
            {"$class":"org.message.mynetwork.Message", "messageId":"051", "creator":"org.message.mynetwork.Member#bob@email.com", "subject":"Goodbye All!", "value":"Not this time."}
            ]
            """

    Scenario: Bob can not send a message Alice owns
        When I use the identity bob1
        And I submit the following transaction
            """
            [
            {"$class":"org.message.mynetwork.sendPublicMessage", "creator":"org.message.mynetwork.Member#alice@email.com", "messageId":"051", "subject":"Goodbye All!", "value":"Not this time."}
            ]
            """
        Then I should get an error matching /does not have .* access to resource/

    Scenario: Bob can submit a reply for a message
        When I use the identity bob1
        And I submit the following transaction
            """
            [
            {"$class":"org.message.mynetwork.sendPublicReply", "parentMessage":"org.message.mynetwork.Message#001", "creator":"org.message.mynetwork.Member#bob@email.com", "replyId":"051", "subject":"Re: Goodbye All!", "value":"Not this time."}
            ]
            """
        Then I should have the following assets
            """
            [
            {"$class":"org.message.mynetwork.Reply", "messageId":"051", "creator":"org.message.mynetwork.Member#bob@email.com", "replyTo":"org.message.mynetwork.Message#001", "subject":"Re: Goodbye All!", "value":"Not this time."}
            ]
            """
