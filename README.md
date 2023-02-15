# smth.club

smth.club is an anonymous public list / social game where players compete for the title of longest post. Every player has the ability to add and delete items from the list. 

The idea behind the game is that any post that takes the record of longest post, did so because all of the other players chose not to delete it. THERE IS NOTHING STOPPING ANYBODY SHOWING UP AND DELETING EVERY POST. This is part of the game.  

All players are equal.

## Current Features
* Each post shows the length of time it has existed for, has a delete button and takes on a random color. 
* The longest post subtitle shows the length of time of the longest post. 
* The `smth` in the title takes on the color of the longest post. 
* the `?` button opens the instructions menu.
* The `Crown` button opens a menu that display the content of the longest post. 
  * clicking on the longest post subtitle also opens the longest post menu. 

## Future Features

* Dark Mode - style sheet is ready but i haven't decided how to implement it yet. Listen for user browser setting's or to have it as a user selected option. I like the light mode as the initial mode and thought about having dark mode as an easter hidden somewhere...
* Hall of fame 
  * I want the `crown` button to navigate to a second page that displays a list of all the longest post's, there content and the length of time they existed for.
  * I also want to be able to sort them by `longest post` AND `time spent in the longest post position` ... so how long the post was the "longest post" before another post over took it. 
* A rescue button for top 3 posts.
  * change the `trash` icon to some other icon and set a timer for some amount of time where players can "rescue" the post. 
  * Once rescued, it's status is restored until someone tries to delete it again. 
   * Different amount of time for top 3. So top spot `1 - minute` 2nd spot `30 - seconds` 3rd spot `10 - seconds` all other posts get deleted instantly. 
* A fork of the same game but with images instead of text. 

## Issues 
* At the moment when longest post rolls over to 1 day, it displays `23h 0m` until it reaches `23h 1m` then it displays `1d 0h 1m` The last one is the desired display. 
* If somehow a post we're to last a year it would read `366d #h #m` instead of `1y #d #h`
* Emoji support - Currently some emoji's work but most do not and there seems to be discrepencies between mobile and desktop. 
* General code review - I am a novice dev and any review would be much appreciated 
* Security and bot's 
  * There's nothing preventing someone creating a bot that is designed to just delete every post or start injecting posts a crazy rate which would wreck the game. 
  * The post's are saved into a MySQL database and I have done some sanitization to prevent injection attacks but i am sure there is more work here that needs to be done. 

## Database Table's for Local Env. 
The database set up includes two tables. The `FIRST` of which saves all new posts while the `SECOND` saves the longest post. 

It's also important to note that the `TIME` in the second table is the difference between the time the post was created and Date.now() which is equal to the length of time the post existed for. 

* Database name: `your_database_name`
  * table 1: `say_somthing`
    * id: Auto increment type = `INT`
    * text: type = `TEXT`
    * time: type = `BIGINT`
    * color: type = `TEXT`
  * table 2 : `post_stats`
    * id: Auto increment type = `INT`
    * text: type = `TEXT`
    * time: type = `BIGINT`
    * color: type = `TEXT`
