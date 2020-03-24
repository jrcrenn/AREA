-- CREATE USER areaapi WITH PASSWORD 'toor';
-- GRANT ALL PRIVILEGES ON DATABASE area TO areaapi;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO areaapi;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO areaapi;

CREATE TABLE users(
    user_id serial PRIMARY KEY,
    username VARCHAR (50) UNIQUE NOT NULL,
    password VARCHAR (50) NOT NULL,
    token VARCHAR (260),
    token_fb VARCHAR (260),
    token_tw VARCHAR (260),
    token_gh VARCHAR (260),
    token_gmail VARCHAR (260),
    token_ol VARCHAR (4096),
    token_insta VARCHAR (260),
    token_event_fb VARCHAR (260),
    token_event_tw VARCHAR (260),
    token_event_gmail VARCHAR (260),
    token_event_ol VARCHAR (2048),
    token_event_gh VARCHAR (260),
    token_event_insta VARCHAR (260),
    token_event_timer VARCHAR (260)
);
CREATE TABLE historique(
    id serial PRIMARY KEY,
    user_id INTEGER NOT NULL,
    reaction_id INTEGER NOT NULL,
    description VARCHAR (496),
    time TIMESTAMP
);
CREATE TABLE areas(
    id serial PRIMARY KEY,
    activated INTEGER,
    user_id INTEGER NOT NULL,
    description VARCHAR (496),
    action_token VARCHAR (260),
    reaction_id VARCHAR (260),
    action_id VARCHAR (260),
    actionParam1 VARCHAR (1024),
    reactionParam1 VARCHAR (1024),
    reactionParam2 VARCHAR (1024)
);
CREATE TABLE action(
    id serial PRIMARY KEY,
    description VARCHAR (496),
    serviceName VARCHAR (496),
    actionName VARCHAR (496),
    actionParam1Description VARCHAR (1024),
    actionVariable1Description VARCHAR (1024),
    actionVariable2Description VARCHAR (1024)
);
CREATE TABLE reaction(
    id serial PRIMARY KEY,
    description VARCHAR (496),
    serviceName VARCHAR (496),
    reactionName VARCHAR (496),
    reactionParam1Description VARCHAR (1024),
    reactionParam2Description VARCHAR (1024)
);
CREATE TABLE timer(
    id serial PRIMARY KEY,
    area_id INTEGER NOT NULL,
    subtype INTEGER NOT NULL,
    date VARCHAR(50),
    hour VARCHAR(50),
    day VARCHAR (50),
    later INTEGER,
    now INTEGER
);

INSERT INTO action(description, actionName, serviceName, actionParam1Description, actionVariable1Description, actionVariable2Description) 
    VALUES ('I receive a direct twitter message', 'direct message Twitter', 'Twitter', 'Who message me','The message', 'The person that messaged me');
INSERT INTO action(description, actionName, serviceName, actionParam1Description, actionVariable1Description, actionVariable2Description) 
     VALUES ('A new email on Gmail', 'New gmail email', 'Gmail', 'sender email','The Email Body', 'The Email subject');
INSERT INTO action(description, actionName, serviceName, actionParam1Description, actionVariable1Description, actionVariable2Description) 
     VALUES ('A new event on my repo Github', 'New Github repo event', 'Github', 'Repo name','Repo name', 'Event description');
INSERT INTO action(description, actionName, serviceName, actionParam1Description, actionVariable1Description, actionVariable2Description) 
     VALUES ('A new email on my outlook mailbox', 'New email Outlook event', 'Outlook', 'Sender email','Email content', 'The Email subject');
INSERT INTO action(description, actionName, serviceName, actionParam1Description, actionVariable1Description, actionVariable2Description) 
     VALUES ('A new email on my outlook mailbox has an attachement', 'New email Outlook with attachement event', 'Outlook', 'Mail has an attachement','Email content', 'The Email subject');
INSERT INTO action(description, actionName, serviceName, actionParam1Description, actionVariable1Description, actionVariable2Description) 
    VALUES ('It is a specific day', 'Specific day of the week', 'Timer', 'A day of the week','The chosen day', '');
INSERT INTO action(description, actionName, serviceName, actionParam1Description, actionVariable1Description, actionVariable2Description) 
    VALUES ('It is a specific date', 'Specific date', 'Timer', 'A date in the DD/MM format','The chosen date', '');
INSERT INTO action(description, actionName, serviceName, actionParam1Description, actionVariable1Description, actionVariable2Description) 
    VALUES ('It is a specific hour', 'Specific hour', 'Timer', 'An hour in the HH:mm format','The chosen hour', '');
INSERT INTO action(description, actionName, serviceName, actionParam1Description, actionVariable1Description, actionVariable2Description) 
    VALUES ('Executes the reaction in x time', 'Do something in x time', 'Timer', 'A number of seconds','The thing to do', '');

INSERT INTO reaction(description, reactionName, serviceName, reactionParam1Description, reactionParam2Description) 
    VALUES ('Updates the authenticating user current status, also known as Tweeting.', 'Twitting', 'Twitter', 'The text of the status update.', 'NULL');
INSERT INTO reaction(description, reactionName, serviceName, reactionParam1Description, reactionParam2Description) 
    VALUES ('Send a new gmail email', 'Gmail email', 'Gmail', 'The Email Body', 'The Email recipient');
INSERT INTO reaction(description, reactionName, serviceName, reactionParam1Description, reactionParam2Description) 
    VALUES ('Create a new github Repo', 'New Github repo', 'Github', 'The Repo Name', 'NULL');
INSERT INTO reaction(description, reactionName, serviceName, reactionParam1Description, reactionParam2Description) 
    VALUES ('Webhook POST to any url', 'New custom webhook POST', 'Custom', 'url to trigger', 'body content of the url');
INSERT INTO reaction(description, reactionName, serviceName, reactionParam1Description, reactionParam2Description) 
    VALUES ('Webhook GET to any url', 'New custom webhook GET', 'Custom', 'url to trigger', 'Header content of the url');
INSERT INTO reaction(description, reactionName, serviceName, reactionParam1Description, reactionParam2Description) 
    VALUES ('Send a new outlook email', 'Outlook email', 'Outlook', 'The Email body', 'The Email recipient');

INSERT INTO users(username, password, token) 
    VALUES ('pierre@pierre.pierre', 'pierre', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBpZXJyZUBwaWVycmUucGllcnJlIiwiaWF0IjoxNTgwOTE0NDMyLCJleHAiOjE1ODM1MDY0MzJ9.yURnmUBnejLz08WoeScNTdYH7YsAVGbKHeBS5cyi8tE');
