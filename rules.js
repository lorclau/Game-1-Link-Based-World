class Start extends Scene {
    create() {
        //this.engine.setTitle("Title goes here"); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.setTitle(this.engine.storyData.Title); //note: IS case sensitive
        this.engine.show(this.engine.storyData.Intro);

        //this.engine.show(this.engine.storyData.Inventory);
        //this.engine.storyData.Inventory.push("Banana");

        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        //this.engine.gotoScene(Location, "Home"); // TODO: replace this text by the initial location of the story
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation);
    }
}
class InteractiveScene extends Scene {
    create() {
        //this.engine.show("in scene");
        this.engine.addChoice("Turn on", 1); //choice 1: turn on radio
    }

    handleChoice(choice) {
        if(choice == 1){
            this.engine.show("<br>Turning on...<br>");
            
            for(let x = 0; x < this.engine.storyData.Radio.length; x++){
                this.engine.show(this.engine.storyData.Radio[x]);
            }

            //add choice to leave/turn off
            this.engine.addChoice("Turn off", 2); //choice 2: turn off radio
            if(choice == 2){
                this.engine.gotoScene(Location, "CrashLeft");
            }
        }
        else{
            this.engine.gotoScene(Location, "CrashLeft");
        }
    }
}
class CollectKey extends Scene {
    create() {
        this.engine.addChoice("Get Banana", true);
    }

    handleChoice(choice) {
        if(choice == true){
            this.engine.show("<br><i>Banana has been added to inventory</i><br>");
            this.engine.storyData.Inventory.push("Banana");
            this.engine.gotoScene(Location, "KeyLocation");
        }
        else{
            this.engine.show("You probably don't need anything here then...");
            this.engine.gotoScene(Location, "KeyLocation");
        }
    }
}

class Location extends Scene {
    create(key) {   //note: key = initial_location, key is index of array

        //Handle encounter with interactive mechanism
        if(key == "InteractiveLocation"){
            //this.engine.show("going into interactive scene now...");
            this.engine.gotoScene(InteractiveScene);
        }

        this.engine.show("<br>");
        let locationData = this.engine.storyData.Locations[key]; //use `key` to get the data object for the current story location

        this.engine.show(locationData.Body); //show body of location

        if(locationData.Choices) { //check if the location has any Choices

            //Handle case where player can collect key
            if(key == "KeyLocation" && this.engine.storyData.Inventory[0] != "Banana" ){
                this.engine.gotoScene(CollectKey);
            }

            for(let x = 0; x < locationData.Choices.length; x++) { //loop over the location's Choices
                let choice = locationData.Choices[x];
                this.engine.addChoice(locationData.Choices[x].Text, choice); //use the Text of the choice
            }

            //Handle case to unlock location when player has key
            if(key == "LockedLocation" && this.engine.storyData.Inventory[0] == "Banana"){
                //this.engine.show("I have a banana");
                let hiddenChoice = locationData.LockedChoices[0];
                this.engine.addChoice(locationData.LockedChoices[0].Text, hiddenChoice)
            }
    
        } else {
            this.engine.addChoice("The End.")
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');