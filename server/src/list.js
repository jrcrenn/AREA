let list = {
    success: true,
    services: [
        {
            name: 'Intra Epitech',
            route: "intra",
            iconRoute: 'https://i.ya-webdesign.com/images/poop-icon-png-10.png',
            description: 'The Epitech intranet, used by Épitech students to access courses and grades',
            parameters: [
                {
                    name: 'token',
                    type: 'string',
                }
            ],
            actions: [
                {
                    name: 'note',
                    title: 'On note posted',
                    description: 'Trigger when a note is submited on your intra account',
                    parameters: [

                    ]
                },
                {
                    name: 'projectendtime',
                    title: 'Project End Time',
                    description: 'Trigger when a project will end soon',
                    parameters: [

                    ]
                }
            ],
            reactions: [

            ]
        },
        {
            name: 'Discord',
            route: 'discord',
            iconRoute: 'https://static-s.aa-cdn.net/img/ios/985746746/3c4ea685f34faa70159e14b0c889fdd1',
            description: 'Discord is a proprietary freeware VoIP application and digital distribution platform designed for video gaming communities',
            parameters: [

            ],
            actions: [

            ],
            reactions: [
                {
                    title: 'Discord Webhook',
                    name: 'webhook',
                    description: 'Send a message to the corresponding webhook',
                    parameters: [
                        {
                            name: 'webhookurl',
                            type: 'string',
                        },
                        {
                            name: 'message',
                            type: 'string',
                        }
                    ]
                }
            ],
        },
        {
            name: 'SMTP',
            route: 'smtp',
            description: 'Simple Mail Transfer Protocol',
            iconRoute: 'https://www.xplornet.com/wp-content/uploads/2018/06/0628windows10.jpg',
            parameters: [

            ],
            actions: [

            ],
            reactions: [
                {
                    title: 'Send mail to',
                    name: 'sendmail',
                    description: 'Send a mail to the given mail address',
                    parameters: [
                        {
                            name: 'to',
                            type: 'string',
                        },
                        {
                            name: 'message',
                            type: 'string',
                        }
                    ]
                }
            ]
        },
        {
            name: 'Rss feed',
            route: 'rss',
            description: 'Really Simple Syndication',
            iconRoute: 'https://blog.juansorroche.com/wp-content/uploads/2018/07/63_logoRss.png',
            parameters: [

            ],
            actions: [
                {
                    title: 'On element posted',
                    name: 'onpost',
                    description: 'Trigger when an element is added to the corresponding flux',
                    parameters: [
                        {
                            name: 'feed_url',
                            type: 'string',
                        }
                    ]
                }
            ],
            reactions: [

            ]
        },
        {
            name: 'iss',
            description: 'Check if the ISS is above the user given location',
            requirements: [],
            parameters: [
                {
                    name: 'location',
                    type: 'string', // string|bool|int|json
                    optional: false
                }
            ]
        },
        {
            name: 'trigger',
            description: 'Always triggers, on every check (30s)',
            requirements: [],
            parameters: []
        }
    ],
};

export default list;
