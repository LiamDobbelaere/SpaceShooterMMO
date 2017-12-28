# Space Shooter
A project for Cloud Development by Tom Dobbelaere, made for Hogeschool West-Vlaanderen.

## Test logins
Listed below as `username/password` are existing logins you can use for testing.
There is one test login for each faction.

* trra/trra
* bolt/bolt 
* h3rb/h3rb

## How to run locally
Running locally is best suited for developing the game and testing with a local database.

The server already checks whether it's running on Microsoft Azure and uses different database settings accordingly.

These are the settings used when running locally, and can be changed in server.js:
`"Database=spacemmo;Data Source=localhost:3306;User Id=root;Password=root"`

You can either change these settings or use them as-is.

Of course there should be some data in this database.
You can prime the database using the sql file contained in db30102017.zip.
This mysql script will create the spacemmo database and fill it with working data.

Don't forget to run `npm install`, then run `nodejs server` to start the application.

The application will host the game client on port 80 in a local setup, you may change this in server.js if this is not desired.

## How to run on Microsoft Azure
This project already has a configured web.config and package.json that is used by Microsoft Azure to set up the application.

If you want to get the game up and running on Microsoft Azure, there are some other things you need to take care of though. So here's a step-by-step guide:

1. Go to Azure Portal and click the green plus symbol on the left hand panel
2. Search for 'Node JS Empty Web App' and click 'Create'
3. Give it a name
4. Change the app service plan if necessary (like a free one if you don't have a paid subscription for Microsoft Azure)
5. Click 'Create'
6. Open the dashboard for your new app service
7. Go to 'Deployment options' (9th option on the left)
8. Click 'Disconnect' and confirm
9. Click Setup
10. Click 'Choose source'
11. Select your source, in this example GitHub
12. Setup authorization for your GitHub account
13. Choose the proper GitHub project where these project's files are
14. Set the branch you like (default is master)
15. Click 'Ok'
16. Go to 'Application settings' (10th option on the left)
17. Set 'Web Sockets' to 'On'
18. Click 'Save' at the top
19. Check 'Deployment options' again and see if it succeeded
20. If deployment failed, you may have to try re-syncing by clicking 'Sync'
21. Go to 'MySQL in App' (22nd option on the left)
22. Set MySQL in App to 'On' and click 'Save'
23. Click 'Manage' at the top, it should open PhpMyAdmin
24. If the above step does not open PhpMyAdmin, surf to your app's URL and then try the 'Manage' button again. This will prompt mysqld to start on the server.
25. Make sure localdb is selected on the left and click 'Import' at the top
26. Import the MySQL primer file that's in db30102017.zip in PhpMyAdmin
26. Click 'Go' to start the import, it should complete successfully
27. Surf to your app's URL, everything should be good to go!

## Gameplay
While the game is unfinished, there are some things you can do.

You can control the ship using ZSQD to move, using the mouse to look around.
You can use the left mouse button to fire.

When you are above a region that is not from your own faction, you can press E to enter that region.

Once inside the region, you have to destroy all asteroids within 5 minutes to claim that region for your faction.

There is an extra url at /map.html which shows a full map of all the regions.