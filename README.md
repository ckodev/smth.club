# smth.club

smth.club is an anonymous social game where players compete for the title of longest post. Every player has the ability to add and delete form the list. 

The idea behind the game is that any post that takes the record of longest post, did so because all of the other players chose not to delete it. THERE IS NOTHING STOPPING ANYBODY SHOWING UP AND DELETING EVERY POST. 

## Current Features
* Each post shows the length of time it has existed for, has a delete button and takes on a random color. 
* The longest post subtitle shows the length of time of the longest post. 
* The `smth` in the title takes on the color of the longest post. 
* the `?` button opens the instructions menu.
* The `Crown` button opens a menu that display the content of the longest post. 
  * clicking on the longest post subtitle also opens the longest post menu. 

## Future Features
* Hall of fame 
  * I want the `crown` button to navigate to a second page that displays a list of all the longest post's, there content and the length of time they existed for.
  * I also want to be able to sort them by `longest post` AND `time spent in the longest post position` ... so how long the post was the "longest post" before another post over took it. 

* A fork of the same game but with images instead of text. 

## Issues 
* Emoji support - Currently some emoji's work but most do not and there seems to be discrepencies between mobile and desktop. 
* General code review - I am a novice dev and any review would be much appreciated 
* Security and bot's 
  * There's nothing preventing someone creating a bot that is designed to just delete every post or start injecting posts a crazy rate which would wreck the game. 
  * The post's are saved into a MySQL database and I have done some sanitization to prevent injecttion attacks but i am sure there is more work here that needs to be done. 

## Database Table's for Local Env. 
The database set up includes two tables. The `FIRST` of which saves all new posts while the `SECOND` saves the longest post. 
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
