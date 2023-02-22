// Assign variables to be able to target textbox and option button text
let scenarioText = document.getElementById('text-box');
let optionButtons = document.getElementById('buttons-container');

// Assign variables to sounds
let winSound = new Audio('assets/sounds/winBell.mp3');
let loseSound = new Audio ('assets/sounds/losetone.mp3');

// Assign variables to background images
let bgImage = document.getElementById('game-bg');

// Function to start the game
/**
 * Starts the game displaying the intro scenario and the latest score
 * the player had, or 0 if the player is new 
 */
function runGame() {
    // The intro message needs to display in text section
    // One option button needs to display with text "Take me to the zoo"
    displayScenario('quiz');
    displayScores();
}

// This game function to call scenarios and response options for the game as required
// was learned and adapted from "Web Dev Simplified" on youtube
// https://www.youtube.com/watch?v=R1S_NhKkvGA

// Help for getting sounds to play found on https://www.codegrepper.com/code-examples/javascript/how+to+play+sounds+vanilla+js

/**
 * This function brings up each scenario and its associated features as required. 
 * The objects in the scenario array are called to display the main
 * scenario text, the option buttons are created as needed with the correct text 
 * inside them and change the background image to match the scenario.
 */
function displayScenario (scenarioIndex) {
    // Find the desired scenario needed by ID
        let scenario = scenarios.find(scenario => scenario.id === scenarioIndex);
    // Change the text currently in the text box to the text of the newly targeted scenario
        scenarioText.textContent = scenario.message;
    // Change the background image for each scenario 
        bgImage.style.backgroundImage = scenario.background;
    // Remove the html buttons - these will be recreated below
        while (optionButtons.firstChild) {
            optionButtons.removeChild(optionButtons.firstChild);
        }

    // Recreate the buttons as required for each scenario
        scenario.response.forEach(respond => {
            // Create the button
            let optionButton = document.createElement('button');
            // Change the text content of the button to the text of the new option
            optionButton.textContent = respond.option;
            // Add the class for css styling
            optionButton.classList.add('btn');
            // Add an event listener so the scenario changes to the option clicked
            optionButton.addEventListener('click', () => optionResponse(respond));
            // Add the new option button back to the buttons-container div
            optionButtons.appendChild(optionButton);
        });
    }

// Check if option has an outcome, and respond accordingly
/**
 * This function chooses how to respond when an option button is clicked.
 * If there is no outcome in the array for that scenario, it will just move the game
 * to the next scenario as chosen by the player.
 * If there is a win outcome it will also play a win sound and increase the win score 
 * by 1.
 * If there is a lose outcome it will play a losing tone and the loss score is increased by 1.
 */
function optionResponse(respond) {
    // If  no outcome, just change to the clicked scenario
    if (respond.outcome == null) {
        displayScenario(respond.goTo);
    //if you pick a winning out
    } else if (respond.outcome == "win") {
        // Increase the value of the winning score
        addWin();
        // Play the winning sound
        winSound.play();
        // Store the new value for wins in local storage
        storeScores();
        // Move to the chosen scenario
        displayScenario(respond.goTo);
    // If you pick a losing outcome
    } else if (respond.outcome == "lose") {
        //Increase the loss score by 1
        addLoss();
        // Play the losing sound
        loseSound.play();
        // Store the new value for losses in local storage
        storeScores();
        // Move to the chosen scenario
        displayScenario(respond.goTo);
    }
}

// A function to increase number of times user made it to the end
/**
 * Target the 'win' element in the html file and increment the value by 1 when called
 */
function addWin() {
    let oldWin = parseInt(document.getElementById('win').innerText);
    document.getElementById('win').innerText = ++oldWin;
}

// A function to increase the number of times user lost and had to start again
/**
 * Target the 'lose' element in the html file and increment the value by 1 when called
 */
function addLoss() {
    let oldLoss = parseInt(document.getElementById('lose').innerText);
    document.getElementById('lose').innerText = ++oldLoss;
}

// A function to store scores in local storage
// Learned from MDN lesson https://developer.mozilla.org/en-US/docs/Web/API/Storage
/**
 * Stores the value of 'win' and 'lose' in the html into local storage so players can
 * see their previous score even if page is closed - so long as browser cache isn't cleared
 */
function storeScores() {
    localStorage.setItem('wins', document.getElementById('win').innerText);
    localStorage.setItem('losses', document.getElementById('lose').innerText);
}

// A function to retrieve data in localStorage and set is as the value for the win and lose html elements
/**
 * If local storage is empty, the scores are set to 0. If there are values entered into local 
 * storage, these values are displayed instead
 */
function displayScores() {
    let myWins = localStorage.getItem('wins');
    let myLosses = localStorage.getItem('losses');

    if (localStorage.length === 0) {
      document.getElementById('win').innerText = 0;
      document.getElementById('lose').innerText = 0;
    } else {
    document.getElementById('win').innerText = myWins;
    document.getElementById('lose').innerText = myLosses;
}}

// A function to allow user to reset their score manually
let clearScoreButton = document.getElementById('clear');
/**
 * By clicking the 'clear score' button, the values of wins and losses are set to 0
 */ 
function resetScore() {
    localStorage.removeItem('wins');
    localStorage.removeItem('losses');

    localStorage.setItem('wins', 0);
    localStorage.setItem('losses', 0);

    displayScores();
}

// An array to hold all of the scenarios as objects. Each scenario has a scenario ID, the scenario message which goes in the main text box for the game, a background image link, 
// and the response options. In these response options is how the player can respond, which scenario the chosen one leads to next, and a win/lose outcome when appropriate.

let scenarios = [
    {
        id: 'quiz',
        background: "url('assets/images/intro.png')",
        message: "Picture this. It's a beautiful sunny day. You have no plans or responsibilities. Life is good. You decide to go to the zoo. What could go wrong?", 
        response: [
            {
                option: "Take me to the zoo!",
                goTo: 1
            },
        ],
    },
    {
        id: 1,
        message: `You get to the zoo and the queue to get in is really long. Do you:`,
        background: "url('assets/images/queue.png')",
        response: [
            {
                option: "Wait in line",
                goTo: 2
            },
            {
                option: "Queues are for nerds. Lets sneak in.",
                goTo: 3
            },
        ],
    },
    {
        id: 2,
        background: "url('assets/images/penguins.png')",
        message: "You waited patiently in the queue for 30 minutes and your finally get it. First stop - the penguin feeding! While you're there the zookeeper is very preoccupied feeding the group. You see one to the side. He looks lonely. What do you do:",
        response: [
            {
                option: "Take the penguin while no one is looking.",
                outcome: 'lose',
                goTo: 4
            },
            {
                option: "Give the penguin a quick pat for encouragement. He belongs with the other penguins.",
                goTo: 5
            }
        ],
    },
    {
        id: 3,
        background: "url('assets/images/penguins.png')",
        message: "Huzzah! You found your way in! Maybe this life of crime suits you after all. You swagger through the zoo when you come across the penguin feeding. The zookeeper is very preoccupied feeding the group. You see one to the side. He looks lonely. What do you do:",
        response: [
            {
                option: "Give the penguin a quick pat for encouragement. He belongs with the other penguins.",
                goTo: 5
            },
            {
                option: "Take the penguin while no one is looking.",
                outcome: 'lose',
                goTo: 4
            }
        ],
    },
    {
        id: 4,
        background: "url('assets/images/police.png')",
        message: "Uh oh! As you were putting the penguin into your bag he cried out. The zookeeper hears and catches you. The police have been called. your days of crime are over.",
        response: [
            {
                option: "Let's try that again..",
                goTo: 'intro'
            },
        ],
    },
    {
        id: 5,
        message: "Feeling more confident, the penguin waddles over to the rest of the group to get some fish. You go little penguin! Feeling good about yourself you go to the next enclosure. There's a sea lion show and they need a volunteer...",
        background: "url('assets/images/sea-lion.png')",
        response: [
            {
                option: "Pick me! Pick me!",
                outcome: 'lose',
                goTo: 6
            },
            {
                option: "Better give one of these kids a chance to do it.",
                goTo: 7
            }
        ],
    },
    {
        id: 6,
        message: "You get chosen, but you get knocked into the water and cannot swim. The sea lions think you're playing a game. You swallow a lot of water before being pulled out. Off to the hospital you go.",
        background: "url('assets/images/water-end.png')",
        response: [
            {
                option: "I'm better now. Let's try again.",
                goTo: 'intro'
            },
        ],
    },
    {
        id: 7,
        background: "url('assets/images/gorillas.png')",
        message: "A kid gets chosen as the volunteer and performs some cool tricks with the sea lions. Man that looks cool. That should have been you. Being the mature person you are, you move on to the next enclosure with minimal sulking. You arrive at the gorillas. A huge silverback is patrolling near where you are.",
        response: [
            {
                option: "Watching gorillas is hungry work. Let's eat while we watch.",
                goTo: 9
            },
            {
                option: "Show that gorilla who's boss! Beat your chest at him.",
                outcome: 'lose',
                goTo: 8
            }            
        ],
    },
    {
        id: 8,
        message: "Turns out beating your chest at a gorilla make him mad. Who knew huh? The gorilla charges at the glass, baing on it loudly. You get a fright and stumble backwards. You fall, hitting your head. Everything fades to black... ",
        background: "url('assets/images/gorilla-end.png')",
        response: [
            {
                option: "Lesson learned. Leave the gorillas  be. Let's try again.",
                goTo: 'intro',
            },
        ],
    },
    {
        id: 9,
        message: "As you take your first bite you feel a hand on your shoulder. They warn you against eating in front of the gorillas. You decide to follow this person's advice, and you and your new friend wander over to the snapping turtle enclosure. They dare you to touch one: ",
        background: "url('assets/images/turtles.png')",
        response: [
            {
                option: "You're not one to shy away from a challenge. Let's pet that weirdly adorable little head.",
                outcome: 'lose',
                goTo: 11,
            },
            {
                option: "No way! That seems like a bad idea.",
                goTo: 10,
            }
        ],
    },
    {
        id: 10,
        background: "url('assets/images/ice-cream.png')",
        message: "Your friend thinks you're lame now. They leave. Feeling sad you go to the cafe to get some ice cream. All they have is pistachio but you have a severe nut allergy. Do you risk it?",
        response: [
            {
                option: "Pass! Not worth the risk. I'll go find some pandas instead.",
                goTo: 12,
            },
            {
                option: "No pain no gain! I want ice cream!",
                outcome: 'lose',
                goTo: 13,
            }
        ],
    },
    {
        id: 11,
        background: "url('assets/images/turtle-end.png')",
        message: "Turns out they're called snapping turtles for a reason! You reach out to touch them, but they smell the food on your hands and snap at you, grabbing your hand. They swarm and all snap at you. You escape with your life. But not your hand.",
        response: [
            {
                option: "I want my hand back! Let's restart.",
                goTo: 'intro',
            },
        ],
    },
    {
        id: 12,
        background: "url('assets/images/pandas.png')",
        message: "There's something very relaxing about the pandas. So chill. Much noms. They're almost hypnotic....",
        response: [
            {
                option: "Better go get some coffee to snap out of this.",
                goTo: 14,
            },
            {
                option: "This is so relaxing... One more.. minute... zZzZzZ",
                goTo: 15,
            }
        ],
    },
    {
        id: 13,
        background: "url('assets/images/nut-end.png')",
        message: "Well that was foolish. You had an allergic reaction and got rushed to hospital. What else did you expect?!",
        response: [
            {
                option: "Let's pretend that didn't happen",
                goTo: 'intro',
            }
        ],
    },
    {
        id: 14,
        background: "url('assets/images/tarantula.png')",
        message: "You get your coffee and use this newfound energy to visit the rest of the animals. Feeling confident from the caffeine boost you ask to hold the tarantula after she was fed.",
        response: [
            {
                option: "You purposely make her angry while you hold her. You want to be bitten to become the next Spiderman.",
                outcome: 'lose',
                goTo: 16,
            },
            {
                option: "You stay absolutely still, watching with fascination while she crawls around you.",
                outcome: 'win',
                goTo: 17,
            }
        ],
    },
    {
        id: 16,
        background: "url('assets/images/tarantula-end.png')",
        message: "The good news is you succeeded in making her mad and she bit you. The bad news is you did not get superpowers or spidey senses, and the reptile keeper just kicked you out.",
        response: [
            {
                option: "One day a spider-bite will give you powers. Until then, back to the start you go.",
                goTo: 'intro',
            }
        ],
    },
    {
        id: 17,
        background: "url('assets/images/tarantula-win.png')",
        message: "You stay and chat to the keeper for a while. They're super impressed by how confident you were holding their favourite tarantula. They end up giving you a lifetime pass to the zoo, to come visit anytime you like!",
        response: [
            {
                option: "You completed your day at the zoo in one piece! Think you can find the other ways too?",
                goTo: 'intro',
            }
        ],
    },
    {
        id: 15,
        background: "url('assets/images/night.png')",
        message: "You wake up and no one is around you. It's dark. The only sounds you hear are the soft crunches and rustling coming from the pandas eating bamboo. This is a childhood dream come true! Where to first?",
        response: [
            {
                option: "The red pandas! They're so fluffy. I've always wanted to cuddle one.",
                outcome: 'lose',
                goTo: 18,
            },
            {
                option: "Meerkat time! I've loved them since before the ad came out.",
                outcome: 'win',
                goTo: 19,
            },
            {
                option: "To the wolves! They're nocturnal, right?!",
                goTo: 20,
            }
        ],
    },
    {
        id: 18,
        background: "url('assets/images/red-panda-lose.png')",
        message: "Fluffy, but deadly. These little guys are mightly aggressive, despite the adorable exterior. Bet you wish you watched a documentary to learn about those sharp claws and strong jaws before trying that.",
        response: [
            {
                option: "I'll know better next time.",
                goTo: 'intro',
            }
        ],
    },
    {
        id: 19,
        background: "url('assets/images/meerkat-win.png')",
        message: "Your lifelong obsession taught you lots of meerkat puns, you were ready to work on those tv ads with Serge. You also learned the calls of the babies. Congratulations, your hard work paid off and they have accepted you as their new oversized baby. Today marks the first day of your new life as a meerkat.",
        response: [
            {
                option: "I'm happy with my new meerkat life, but let's see what else we can do.",
                goTo: 'intro',
            }
        ],
    },
    {
        id: 20,
        background: "url('assets/images/wolves.png')",
        message: "The wolves are loud as you approach. They're on the hunt. You see a rabbit dodging and weaving in the enclosure. How did that get there? Silly rabbit",
        response: [
            {
                option: "Watch nature take its course. Survival of the fittest and all that.",
                goTo: 22,
            },
            {
                option: "Howl like a wolf. That'll distract them",
                outcome: 'lose',
                goTo: 21,
            }
        ],
    },
    {
        id: 21,
        background: "url('assets/images/wolves-end.png')",
        message: "Your howling does in fact distract the wolves. They join in the howl. This alerts the security that somehow didn't know you were there. They find you and ban you from the zoo.",
        response: [
            {
                option: "Start again, knowing you saved the rabbit from certain doom.",
                goTo: 'intro',
            }
        ],
    },
    {
        id: 22,
        background: "url('assets/images/rabbit.png')",
        message: "You watch an unbelievable game of cat and mouse, the rabbit dodging and weaving between the wolves. Miraculously the rabbit escapes!",
        response: [
            {
                option: "Quick, lets follow it!",
                goTo: 23,
            },
            {
                option: "Leave it be. The lion enclosure is nearby anyway.",
                goTo: 24,
            }
        ],
    },
    {
        id: 23,
        background: "url('assets/images/follow.png')",
        message: "You chase after the rabbit. You think you hear a voice. Could it be... the rabbit? Nah, it's probably the security guard finally noticing you.",
        response: [
            {
                option: "Hide.",
                goTo: 26,
            },
            {
                option: "Keep following the rabbit.",
                outcome: 'win',
                goTo: 25,
            }
        ],
    },
    {
        id: 24,
        background: "url('assets/images/lions.png')",
        message: "You get to the lions and they're all snoozing. A bit disappointing really.",
        response: [
            {
                option: "Leave them be.",
                outcome: 'win',
                goTo: 27,
            },
            {
                option: "Sing them the call of their people - 'In the Jungle'.",
                outcome: 'lose',
                goTo: 28,
            }
        ],
    },
    {
        id: 25,
        background: "url('assets/images/rabbit-win.png')",
        message: "You follow the rabbit for what seems like an age. Your head feels funny. The voice grows louder but you lose sight of the rabbit. You trip and fall, but it feels like you just keep on falling. You finally stop and pick yourself up. You're in... Wonderland?!",
        response: [
            {
                option: "I don't know what's real anymore. Bring me back to my zoo!",
                goTo: 'intro',
            }
        ],
    },
    {
        id: 26,
        background: "url('assets/images/hide.png')",
        message: "You find a hiding spot. The voice disappears. No sign of security either. You realise it was either the rabbit or you're losing your mind. You realise you don't have one without the other... ",
        response: [
            {
                option: "Let's find a way home.",
                outcome: 'win',
                goTo: 29,
            },
            {
                option: "I give up on reality. I'm moving in with the meerkats.",
                outcome: 'win',
                goTo: 19,
            }
        ],
    },
    {
        id: 27,
        background: "url('assets/images/sleep-win.png')",
        message: "Most of the animals are snoozing. Well, it is nighttime after all! You decide you should be snoozing too. You find a cosy enclosure and fall asleep.",
        response: [
            {
                option: "Feels a bit anti-climactic. I must find the other ways out! Back we go.",
                goTo: 'intro',
            },
        ],
    },
    {
        id: 28,
        background: "url('assets/images/lion-lose.png')",
        message: "Oh no. Not this song again! The lions wake up in a rage. They listen to this song day in, and day out. They're not in a mighty jungle. And now they're not even sleeping. They've had enough. They manage to escape and all that can be heard is your melodic scream - 'Ee-e-e-oh-mum-a-weh' ",
        response: [
            {
                option: "Oh dear. I'll refrain from singing next time.",
                goTo: 'intro',
            }
        ],
    },
    {
        id: 29,
        background: "url('assets/images/exit-win.png')",
        message: "Well done! You made it to the end. Now to find a way out! Think you can manage?",
        response: [
            {
                option: "I could, but this is GroundHog day so I won't. RESTART!",
                goTo: 'intro',
            },
        ],
    },
];

// Start the game 
runGame();

// Add event listener to reset the score whenever the button is clicked
clearScoreButton.addEventListener('click', resetScore);