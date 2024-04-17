# StoryGraphTool

This is a simple Link-based Game World. This game is called "Before Nighfall" -- In it players find themselves stranded on a dangerous island and the goal is to reach the rendezvous point before nightfall. This world features a [Location-specific interactive mechanism] in the form of a message-displaying radio which can be turned on and off; and a [Lock and key puzzle] where players explore the game throroughly to collect the "Banana" and unlock the winning path.

This game was made using source code by Adam Smith (amsmith@ucsc.edu).  

### Authoring

With the web server running, navigate to the page called `preview.html`. You should see a graphical preview of the story world defined in `myStory.json`. Edit `myStory.json` to define your own interesting world, examining the view of `preview.html` to find problems before returning to play through your story in `index.html`.

## Engine Documentation

Build your story by defining a few subclasses of `Scene` and adding your story data to a JSON file like `myStory.json`. To begin play, call `Engine.load(firstSceneClassName, pathToStoryJson)`.

### Engine:
#### Methods:
- `setTitle(title)`: Show a large header and change the title of the webpage.
- `show(text)`: Append some text to the web page.
- `addChoice(text, [data])`: Add a button which appears to the player as `text`, supplying an optional `data` argument to customize the effects of this choice. All choice buttons are removed as soon as the player selects one of them.
- `gotoScene(sceneClass, [data])`: Transition to a new scene by provided class name, supplying an optional `data` argument to customize the scene instance.

### Scene
#### Methods:
- `create([data])`: Called when a scene is first presented to the player. The `data` argument comes from the second parameter to `gotoScene`.
- `handleChoice([data])`: Called when the player as selected a choice button. The `data` argument comes from the second parameter to `addChoice`.

#### Fields:
- `engine`: An instance of `Engine`, as documented below:
- `storyData`: The result of parsing the JSON file at `pathToStoryJson`

