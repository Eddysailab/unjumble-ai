/* ============================================================================
   UNJUMBLE AI - TERMS
   ----------------------------------------------------------------------------
   THIS IS THE FILE YOU WILL EDIT MOST. Every puzzle in the game lives here.

   Each term is one block:

     {
       term:       the word the player unscrambles. UPPERCASE. Spaces are fine,
                   they show as a gap and are never part of the jumble.
       clue:       the short teaser shown WHILE they are solving. Never put the
                   term itself in here, and keep it under about ten words.
       definition: the plain English meaning, revealed after they solve it.
       example:    one concrete, real life example of the term in use.
       category:   which pack it belongs to (see categories.js).
       icon:       a picture name from js/icons.js.
     }

   Golden rules when editing:
     1. Keep the quotation marks around the text.
     2. Keep the commas at the end of each line.
     3. Terms may only contain letters and spaces. No numbers, no punctuation.
     4. Save the file, then refresh your browser to see the change.
   ============================================================================ */

window.UNJUMBLE = window.UNJUMBLE || {};

UNJUMBLE.terms = [

  /* =========================== AI BASICS =========================== */

  {
    term: "ALGORITHM",
    clue: "The recipe a computer follows, step by step.",
    definition: "A fixed set of instructions a computer follows in order to complete a task or solve a problem.",
    example: "When your maps app picks the fastest way home, an algorithm compared every route and ranked them.",
    category: "basics",
    icon: "list"
  },
  {
    term: "PROMPT",
    clue: "The thing you type in before anything happens.",
    definition: "The instruction or question you give an AI to tell it what you want from it.",
    example: "Typing 'write a friendly reminder email to my landlord' into a chatbot is a prompt.",
    category: "basics",
    icon: "edit-pencil"
  },
  {
    term: "CHATBOT",
    clue: "Software you talk to like it is a person.",
    definition: "A program you interact with by typing or speaking, which answers you back in conversation.",
    example: "The little support window that pops up on a shopping site and asks how it can help is usually a chatbot.",
    category: "basics",
    icon: "chat-bubble"
  },
  {
    term: "MODEL",
    clue: "The trained part that does the actual thinking.",
    definition: "The trained system that takes your input and produces an answer. It is the part that learned from the data.",
    example: "The chatbot is the app you click on. The model underneath it is what actually writes the words.",
    category: "basics",
    icon: "brain"
  },
  {
    term: "TRAINING DATA",
    clue: "Everything it was shown before you ever used it.",
    definition: "The collection of examples an AI is shown so it can learn patterns, long before anyone uses it.",
    example: "A spam filter learns from huge numbers of emails already marked spam or not spam. That collection is its training data.",
    category: "basics",
    icon: "task-list"
  },
  {
    term: "NEURAL NETWORK",
    clue: "Loosely borrowed from how brain cells connect.",
    definition: "A way of building AI from layers of simple connected units that pass signals along and adjust as they learn.",
    example: "The system that recognizes your face when you unlock your phone runs on a neural network.",
    category: "basics",
    icon: "community"
  },
  {
    term: "AUTOMATION",
    clue: "Letting the machine handle the boring repeat work.",
    definition: "Setting up a task so it runs by itself, without a person having to do it every single time.",
    example: "A rule that files every receipt email into one folder without you touching it is simple automation.",
    category: "basics",
    icon: "refresh-double"
  },
  {
    term: "INPUT",
    clue: "What goes in before anything comes out.",
    definition: "Whatever you feed an AI to work with. It could be text, an image, a file, or a voice recording.",
    example: "Uploading a photo and asking what is in the picture makes that photo your input.",
    category: "basics",
    icon: "download"
  },
  {
    term: "OUTPUT",
    clue: "What the machine hands back to you.",
    definition: "The result an AI produces after it has processed whatever you gave it.",
    example: "The paragraph an AI writes after you ask it for an email draft is the output.",
    category: "basics",
    icon: "sparks"
  },
  {
    term: "PATTERN",
    clue: "The repeating shape that AI hunts for in data.",
    definition: "Something that shows up again and again in data. Spotting these is the core of what AI actually does.",
    example: "After seeing enough photos of cats, an AI picks up on pointy ears and whiskers turning up together.",
    category: "basics",
    icon: "search"
  },
  {
    term: "DATA",
    clue: "The raw material every single AI runs on.",
    definition: "Any information a computer can store and work with, such as numbers, words, images, or sound.",
    example: "Your photo library, your messages, and your step count are all data.",
    category: "basics",
    icon: "task-list"
  },
  {
    term: "MACHINE LEARNING",
    clue: "It works it out from examples, nobody writes the rules.",
    definition: "The branch of AI where a system improves by studying examples, rather than following rules a person wrote out.",
    example: "Nobody wrote a rule for what a cat looks like. The system worked it out from thousands of photos.",
    category: "basics",
    icon: "brain"
  },
  {
    term: "TRAINING",
    clue: "The long study session before the AI is any use.",
    definition: "The process of showing a model huge numbers of examples so it can adjust itself and get better at a task.",
    example: "Training a large model can take weeks of computer time before anyone gets to use it.",
    category: "basics",
    icon: "refresh-double"
  },
  {
    term: "VOICE ASSISTANT",
    clue: "The one on your counter that you talk at.",
    definition: "An AI you control by speaking, which listens for a wake word and then answers or acts.",
    example: "Asking a smart speaker to set a ten minute timer uses a voice assistant.",
    category: "basics",
    icon: "sound-high"
  },
  {
    term: "RECOMMENDATION",
    clue: "Why it always seems to know what you want next.",
    definition: "A suggestion an AI makes by comparing your behavior to that of many other people.",
    example: "The next video that autoplays, and the shows on your home screen, are recommendations.",
    category: "basics",
    icon: "thumbs-up"
  },
  {
    term: "COMPUTER VISION",
    clue: "Teaching machines to make sense of pictures.",
    definition: "The area of AI that lets computers interpret images and video, such as finding objects or reading text.",
    example: "A checkout that recognizes your items without scanning barcodes is using computer vision.",
    category: "basics",
    icon: "search"
  },
  {
    term: "INTERFACE",
    clue: "The bit you actually see and click on.",
    definition: "The part of a tool you interact with, as opposed to the machinery working underneath it.",
    example: "A chat box with a send button is an interface. The model behind it is not.",
    category: "basics",
    icon: "edit-pencil"
  },
  {
    term: "ACCURATE",
    clue: "Right, not merely convincing.",
    definition: "Matching what is actually true. Worth checking separately, because AI can be fluent and wrong at the same time.",
    example: "An answer can be beautifully written and still not be accurate, which is why you verify anything that matters.",
    category: "basics",
    icon: "check-circle"
  },
  {
    term: "CAPTIONS",
    clue: "The words that appear as people speak.",
    definition: "Text produced automatically from speech, so you can read what is being said as it happens.",
    example: "The live subtitles on a video call are AI listening to the speaker and writing it down.",
    category: "basics",
    icon: "headset"
  },
  {
    term: "ROBOT",
    clue: "AI that can reach out and touch the world.",
    definition: "A machine that can sense its surroundings and physically act on them, often guided by AI.",
    example: "A warehouse robot that finds a shelf and brings it to a packer is AI in the physical world.",
    category: "basics",
    icon: "face-id"
  },

  /* ======================== MACHINE LEARNING ======================== */

  {
    term: "DATASET",
    clue: "A tidy pile of examples, gathered in one place.",
    definition: "An organized collection of data used to train or test a model.",
    example: "A folder of ten thousand labeled x-ray images, ready for training, is a dataset.",
    category: "ml",
    icon: "task-list"
  },
  {
    term: "LABEL",
    clue: "The tag that says what an example really is.",
    definition: "The correct answer attached to a training example, so the model can learn what it should have said.",
    example: "Marking a photo as 'dog' before training is adding a label.",
    category: "ml",
    icon: "check-circle"
  },
  {
    term: "OVERFITTING",
    clue: "Memorizing the practice test, not learning the subject.",
    definition: "When a model learns its training examples so exactly that it performs badly on anything new.",
    example: "A model that scores perfectly on its practice photos but fails on real ones has overfitted.",
    category: "ml",
    icon: "book"
  },
  {
    term: "ACCURACY",
    clue: "How often it actually gets it right.",
    definition: "The share of predictions a model gets correct, usually written as a percentage.",
    example: "If a model correctly sorts ninety out of a hundred emails, its accuracy is ninety percent.",
    category: "ml",
    icon: "star"
  },
  {
    term: "SUPERVISED",
    clue: "Learning with the answer key provided.",
    definition: "Training where every example comes with the correct answer attached, so the model learns by comparing.",
    example: "Teaching a model to spot spam by showing it emails already marked spam is supervised learning.",
    category: "ml",
    icon: "user"
  },
  {
    term: "UNSUPERVISED",
    clue: "Learning with no answer key at all.",
    definition: "Training where the model gets data with no correct answers and has to find the structure on its own.",
    example: "Grouping customers into similar types, without ever being told what the groups are, is unsupervised learning.",
    category: "ml",
    icon: "search"
  },
  {
    term: "FEATURE",
    clue: "One detail the model looks at when deciding.",
    definition: "A single piece of information about an example that a model uses to reach its answer.",
    example: "When predicting a house price, the number of bedrooms is one feature.",
    category: "ml",
    icon: "calculator"
  },
  {
    term: "PREDICTION",
    clue: "Its best guess about something it has not seen.",
    definition: "The answer a model produces for a new case it was never trained on directly.",
    example: "When a weather app says there is a seventy percent chance of rain, that is a prediction.",
    category: "ml",
    icon: "light-bulb"
  },
  {
    term: "CLASSIFICATION",
    clue: "Sorting each thing into the right bucket.",
    definition: "A task where a model puts every item into one of a set of categories.",
    example: "Deciding whether an email is spam or not spam is classification.",
    category: "ml",
    icon: "list"
  },
  {
    term: "EXAMPLE",
    clue: "One single item out of the pile it studies.",
    definition: "A single item of training data, such as one photo or one email, that a model learns from.",
    example: "Ten thousand photos of cats means ten thousand examples to learn from.",
    category: "ml",
    icon: "task-list"
  },
  {
    term: "RETRAIN",
    clue: "Teaching it again, because the world moved on.",
    definition: "Training a model a second time on newer data, because what it learned has gone out of date.",
    example: "A shopping model trained before a trend shifted has to be retrained to stay useful.",
    category: "ml",
    icon: "refresh-double"
  },
  {
    term: "GROUP",
    clue: "Putting the similar things together.",
    definition: "Sorting items into sets of similar things, often without anyone deciding the sets in advance.",
    example: "A shop discovering it has three types of regular customer, without being told to look, is grouping.",
    category: "ml",
    icon: "community"
  },
  {
    term: "PARAMETER",
    clue: "One of the many dials tuned during training.",
    definition: "An internal value a model adjusts as it learns. Big models have billions of them.",
    example: "When people say a model has seventy billion parameters, they mean it has that many internal dials.",
    category: "ml",
    icon: "calculator"
  },
  {
    term: "ALGORITHM BIAS",
    clue: "The unfairness that got baked in during training.",
    definition: "When the method or data behind a model produces results that systematically disadvantage some group.",
    example: "A loan model trained on decades of skewed lending decisions can carry that unfairness forward.",
    category: "ml",
    icon: "prohibition"
  },
  {
    term: "VALIDATION",
    clue: "The mock exam before the real one.",
    definition: "Checking a model against data it was not trained on, to see whether it actually learned anything useful.",
    example: "Holding back part of your data and testing on it is validation.",
    category: "ml",
    icon: "check-circle"
  },
  {
    term: "SCORE",
    clue: "The number that says how well it did.",
    definition: "A number measuring how well a model performed on a test, used to compare one version against another.",
    example: "If the new version scores higher on the same set of questions, it is the better model.",
    category: "ml",
    icon: "calculator"
  },
  {
    term: "NOISE",
    clue: "The random junk that hides the real signal.",
    definition: "Meaningless variation in data that carries no useful information and can mislead a model.",
    example: "A few badly mislabeled photos in a training set are noise, and too much of it hurts accuracy.",
    category: "ml",
    icon: "sound-high"
  },
  {
    term: "REINFORCEMENT",
    clue: "Learning by reward and penalty, like training a dog.",
    definition: "Training where a system tries things, gets rewarded for good outcomes, and gradually learns a better strategy.",
    example: "An AI that learns to play a game by scoring points, over millions of attempts, is learning this way.",
    category: "ml",
    icon: "trophy"
  },
  {
    term: "DEEP LEARNING",
    clue: "Neural networks, stacked many layers thick.",
    definition: "Machine learning using neural networks with many layers, which is what made modern AI suddenly work so well.",
    example: "Image recognition, voice typing, and chatbots all rest on deep learning.",
    category: "ml",
    icon: "brain"
  },
  {
    term: "MISTAKE",
    clue: "The thing it actually learns the most from.",
    definition: "A wrong answer during training. Models improve by measuring how wrong they were and adjusting.",
    example: "Every wrong guess nudges the model a little closer to being right next time.",
    category: "ml",
    icon: "xmark-circle"
  },

  /* ========================= GENERATIVE AI ========================= */

  {
    term: "HALLUCINATION",
    clue: "Confidently wrong, and it will not blink.",
    definition: "When an AI states something false as if it were fact, because it is predicting likely words rather than checking truth.",
    example: "An AI inventing a book title that does not exist, complete with a made up author, is a hallucination.",
    category: "genai",
    icon: "cloud"
  },
  {
    term: "TOKEN",
    clue: "The bite sized piece text gets chopped into.",
    definition: "A small chunk of text, often a word or part of a word, that a model reads and writes one at a time.",
    example: "A long word like 'unbelievable' might be split into three of these before the model ever sees it.",
    category: "genai",
    icon: "code"
  },
  {
    term: "FINE TUNING",
    clue: "Extra training to turn a generalist into a specialist.",
    definition: "Taking an already trained model and training it further on a narrower set of examples so it fits one specific job.",
    example: "A law firm training a general model on its own contracts, so it uses the right language, is fine tuning.",
    category: "genai",
    icon: "edit-pencil"
  },
  {
    term: "SUMMARY",
    clue: "The long thing, made short.",
    definition: "A shortened version of a longer text, and one of the most common everyday uses of AI.",
    example: "Pasting in a ten page report and asking for five bullet points gives you a summary.",
    category: "genai",
    icon: "task-list"
  },
  {
    term: "IMAGE",
    clue: "Describe it in words, get a picture back.",
    definition: "A picture generated by AI from a written description, rather than drawn or photographed.",
    example: "Typing 'a red bicycle in the rain' and getting a picture back is image generation.",
    category: "genai",
    icon: "sparks"
  },
  {
    term: "CONTEXT WINDOW",
    clue: "How much it can hold in mind at one time.",
    definition: "The most text a model can consider at once, counting both what you gave it and what it has written back.",
    example: "Paste in a very long document and the beginning can fall outside it, so the model effectively forgets that part.",
    category: "genai",
    icon: "book"
  },
  {
    term: "TEMPERATURE",
    clue: "The dial between predictable and wild.",
    definition: "A setting that controls how random a model's output is. Low is safe and repetitive, high is creative and unpredictable.",
    example: "Turn it up and you get more surprising story ideas, along with a lot more nonsense.",
    category: "genai",
    icon: "fire-flame"
  },
  {
    term: "MULTIMODAL",
    clue: "It handles far more than just words.",
    definition: "An AI that can work with several kinds of input or output together, such as text, images, audio, and video.",
    example: "Showing an AI a photo of your fridge and asking what you could cook uses a multimodal model.",
    category: "genai",
    icon: "face-id"
  },
  {
    term: "TRANSLATE",
    clue: "Same meaning, different language.",
    definition: "Turning text or speech from one language into another, something AI now does almost instantly.",
    example: "Pointing your phone at a menu abroad and reading it back in your own language.",
    category: "genai",
    icon: "chat-bubble"
  },
  {
    term: "AGENT",
    clue: "An AI that does not just answer, it acts.",
    definition: "An AI that can take steps on its own, using tools to reach a goal instead of only replying to you.",
    example: "Something that reads your inbox, drafts the replies, and books the meeting is doing more than chatting.",
    category: "genai",
    icon: "headset"
  },
  {
    term: "PROMPT ENGINEERING",
    clue: "The craft of asking so you get something good back.",
    definition: "Writing and refining your instructions to an AI so the answers come back more useful and more reliable.",
    example: "Adding who you are, what you want, and how long it should be turns a vague request into a good one.",
    category: "genai",
    icon: "edit-pencil"
  },
  {
    term: "SYSTEM PROMPT",
    clue: "The standing orders you never see.",
    definition: "Hidden instructions given to a model before your conversation starts, setting its role, tone, and limits.",
    example: "A shop's support bot has a system prompt telling it to only discuss that shop's products.",
    category: "genai",
    icon: "list"
  },
  {
    term: "LARGE LANGUAGE MODEL",
    clue: "The giant word predictor behind the chatbots.",
    definition: "A model trained on enormous amounts of text that generates language by predicting what comes next.",
    example: "Every mainstream AI writing assistant is powered by one of these.",
    category: "genai",
    icon: "brain"
  },
  {
    term: "AVATAR",
    clue: "A digital stand in for a real person.",
    definition: "A generated character that can speak and move on screen, standing in for a person who was never filmed.",
    example: "A training video presented by a face that never existed is using an avatar.",
    category: "genai",
    icon: "face-id"
  },
  {
    term: "SYNTHETIC",
    clue: "Made by a machine, not captured from life.",
    definition: "Content or data generated by AI rather than collected from the real world.",
    example: "A product photo that was generated rather than shot in a studio is synthetic.",
    category: "genai",
    icon: "sparks"
  },
  {
    term: "DRAFT",
    clue: "The rough first go that you then fix.",
    definition: "A first attempt an AI writes for you, meant to be edited rather than sent as it is.",
    example: "Asking for a draft email and then rewriting two lines is how most people use AI at work.",
    category: "genai",
    icon: "edit-pencil"
  },
  {
    term: "REWRITE",
    clue: "Same idea, said better.",
    definition: "Asking AI to redo a piece of text in a different tone, length, or style.",
    example: "'Take this blunt email and make it friendlier' is a rewrite.",
    category: "genai",
    icon: "refresh-double"
  },
  {
    term: "COPILOT",
    clue: "It flies alongside you, it does not take the controls.",
    definition: "An AI assistant built into a tool you already use, suggesting as you work rather than working for you.",
    example: "A coding assistant that proposes the next few lines while you type is a copilot.",
    category: "genai",
    icon: "user"
  },
  {
    term: "VOICE CLONE",
    clue: "It sounds exactly like someone real.",
    definition: "A synthetic copy of one particular person's voice, built by training on recordings of them speaking.",
    example: "An audiobook read in the author's voice, without the author ever being in the room.",
    category: "genai",
    icon: "sound-high"
  },
  {
    term: "OPEN SOURCE",
    clue: "Anyone can download it and look inside.",
    definition: "A model whose code, and often its weights, are published freely for anyone to inspect, run, and adapt.",
    example: "Open source models can be run on your own computer, without sending anything to a company.",
    category: "genai",
    icon: "community"
  },

  /* ====================== AI ETHICS AND SAFETY ====================== */

  {
    term: "BIAS",
    clue: "Skewed in, skewed out.",
    definition: "Unfair patterns an AI picks up from its training data and then quietly repeats in its answers.",
    example: "A hiring tool trained mostly on resumes from men can learn to rank women lower, without anyone intending it.",
    category: "ethics",
    icon: "community"
  },
  {
    term: "DEEPFAKE",
    clue: "A face or a voice that never actually said it.",
    definition: "Synthetic video or audio that convincingly shows a real person doing or saying something they never did.",
    example: "A clip of a public figure giving a speech they never gave is a deepfake.",
    category: "ethics",
    icon: "face-id"
  },
  {
    term: "PRIVACY",
    clue: "Who gets to see your information.",
    definition: "Keeping personal information under the control of the person it belongs to, rather than exposed or reused without permission.",
    example: "Pasting a client's contract into a public AI tool can put their privacy at risk.",
    category: "ethics",
    icon: "lock"
  },
  {
    term: "TRANSPARENCY",
    clue: "Showing the working, not just the answer.",
    definition: "Being open about how an AI system works, what it learned from, and where its limits are.",
    example: "A bank that can explain why an AI declined a loan is practicing transparency.",
    category: "ethics",
    icon: "sun-light"
  },
  {
    term: "GUARDRAIL",
    clue: "The fence that stops it going off the road.",
    definition: "A limit built into an AI system to stop it producing harmful, unsafe, or wildly off topic output.",
    example: "A chatbot refusing to give medical dosing advice is a guardrail doing its job.",
    category: "ethics",
    icon: "prohibition"
  },
  {
    term: "ACCOUNTABILITY",
    clue: "Someone still has to answer for it.",
    definition: "Making it clear which people or organizations are responsible when an AI system causes harm.",
    example: "If an AI tool wrongly rejects a claim, this means a named human owns that decision, not the software.",
    category: "ethics",
    icon: "user"
  },
  {
    term: "CONSENT",
    clue: "Asking first.",
    definition: "Getting clear permission from people before using their data, image, or voice in an AI system.",
    example: "Cloning someone's voice from a recording without asking them is a serious misuse.",
    category: "ethics",
    icon: "thumbs-up"
  },
  {
    term: "MISINFORMATION",
    clue: "False, and spreading fast.",
    definition: "False or misleading information, which AI can now produce and spread at enormous scale.",
    example: "AI written news stories about events that never happened are misinformation.",
    category: "ethics",
    icon: "bell"
  },
  {
    term: "OVERSIGHT",
    clue: "A human still checking the work.",
    definition: "Keeping a person in the loop to review what an AI decides, and to overrule it when needed.",
    example: "A doctor reviewing every scan an AI flags, before anyone acts on it, is human oversight.",
    category: "ethics",
    icon: "search"
  },
  {
    term: "BLACK BOX",
    clue: "It works, and nobody can say quite why.",
    definition: "A system whose inner workings are so complex that even its builders cannot fully explain a given decision.",
    example: "When a model rejects an application and no one can point to the reason, that is the black box problem.",
    category: "ethics",
    icon: "lock"
  },
  {
    term: "TRUST",
    clue: "Earned slowly, lost instantly.",
    definition: "Confidence that a system will behave as expected, which AI has to earn by being right and being open.",
    example: "People stop using a tool the moment it confidently hands them a wrong answer.",
    category: "ethics",
    icon: "thumbs-up"
  },
  {
    term: "FAIRNESS",
    clue: "It should treat people evenly.",
    definition: "Making sure an AI does not systematically produce worse outcomes for particular groups of people.",
    example: "Checking that a hiring tool passes candidates at similar rates across groups is a fairness check.",
    category: "ethics",
    icon: "community"
  },
  {
    term: "SURVEILLANCE",
    clue: "Always watching, at a scale people never agreed to.",
    definition: "Using AI to monitor people continuously, often without them knowing or having any say in it.",
    example: "Cameras that track and identify every face in a public square are surveillance.",
    category: "ethics",
    icon: "search"
  },
  {
    term: "RED TEAMING",
    clue: "Attacking your own system before someone else does.",
    definition: "Deliberately trying to make an AI misbehave, so the weaknesses get found and fixed before release.",
    example: "Testers spend weeks trying to trick a new model into breaking its own rules.",
    category: "ethics",
    icon: "prohibition"
  },
  {
    term: "JAILBREAK",
    clue: "Talking it into ignoring its own rules.",
    definition: "A trick that gets an AI to bypass its safety limits and produce something it was built to refuse.",
    example: "Dressing a banned request up as a fictional story is a common jailbreak attempt.",
    category: "ethics",
    icon: "lock"
  },
  {
    term: "COPYRIGHT",
    clue: "Who owns what the machine learned from.",
    definition: "The legal right over creative work, and one of the biggest open arguments about what AI was trained on.",
    example: "Artists asking whether their paintings should have been used to train a model is a copyright fight.",
    category: "ethics",
    icon: "edit-pencil"
  },
  {
    term: "REGULATION",
    clue: "The rules governments are writing for all this.",
    definition: "Laws setting out what AI systems are allowed to do, and what their makers must prove before releasing them.",
    example: "Rules requiring AI generated media to be labeled are a form of regulation.",
    category: "ethics",
    icon: "book"
  },
  {
    term: "DATA POISONING",
    clue: "Corrupting the lessons before they are learned.",
    definition: "Deliberately feeding bad examples into training data so the finished model behaves wrongly.",
    example: "Someone seeding a public dataset with mislabeled images is poisoning it.",
    category: "ethics",
    icon: "prohibition"
  },
  {
    term: "AUTOMATION BIAS",
    clue: "Trusting the machine more than your own eyes.",
    definition: "The human habit of believing a computer's answer even when the evidence in front of you says otherwise.",
    example: "Following a route into a closed road because the app said so is automation bias.",
    category: "ethics",
    icon: "user"
  },
  {
    term: "AUDIT",
    clue: "An outside check on whether it behaves.",
    definition: "A structured review of an AI system to test whether it is accurate, fair, and doing what it claims.",
    example: "An independent team testing a hiring tool for unequal outcomes is running an audit.",
    category: "ethics",
    icon: "task-list"
  },

  /* =========================== AI AT WORK =========================== */

  {
    term: "WORKFLOW",
    clue: "The chain of steps a job actually takes.",
    definition: "The sequence of steps work moves through, and the thing you map out before deciding where AI can help.",
    example: "Request comes in, gets approved, gets invoiced, gets filed. That is a workflow.",
    category: "work",
    icon: "list"
  },
  {
    term: "USE CASE",
    clue: "The specific job you are pointing it at.",
    definition: "A concrete task or problem an AI tool is meant to handle, described clearly enough to judge whether it worked.",
    example: "'Summarize support tickets each morning' is a use case. 'Use AI' is not.",
    category: "work",
    icon: "star"
  },
  {
    term: "INTEGRATION",
    clue: "Getting it to talk to your other tools.",
    definition: "Connecting an AI tool to the systems you already use, so it fits into work instead of sitting off to the side.",
    example: "A summarizer that posts straight into your team chat has been integrated.",
    category: "work",
    icon: "code"
  },
  {
    term: "PRODUCTIVITY",
    clue: "More done, for the same effort.",
    definition: "How much useful output you get from the time and effort you put in, and the usual reason firms adopt AI.",
    example: "Cutting a two hour reporting task to fifteen minutes is a productivity gain.",
    category: "work",
    icon: "fire-flame"
  },
  {
    term: "UPSKILLING",
    clue: "Learning the new tools rather than losing to them.",
    definition: "Building new skills so you can work alongside AI, instead of being replaced by someone who already has.",
    example: "A marketer learning to brief and edit AI drafts well is upskilling.",
    category: "work",
    icon: "book"
  },
  {
    term: "HUMAN IN THE LOOP",
    clue: "A person signs off before it counts.",
    definition: "A setup where AI does the work but a human reviews and approves before anything real happens.",
    example: "AI drafts every customer refund, and a person approves each one before it is paid.",
    category: "work",
    icon: "user"
  },
  {
    term: "PILOT",
    clue: "A small test before betting the business.",
    definition: "A limited trial of a tool with one team or task, to learn whether it is worth rolling out widely.",
    example: "Letting one support team use a new assistant for a month is a pilot.",
    category: "work",
    icon: "play"
  },
  {
    term: "ADOPTION",
    clue: "Whether anyone actually uses the thing you bought.",
    definition: "How much a tool is genuinely used by the people it was bought for, which is where most rollouts fail.",
    example: "Licenses for everyone and logins from six people is an adoption problem, not a tool problem.",
    category: "work",
    icon: "community"
  },
  {
    term: "TEMPLATE",
    clue: "A good prompt, saved so you stop rewriting it.",
    definition: "A reusable prompt or document with blanks to fill in, so good results can be repeated by anyone.",
    example: "Saving your best meeting summary prompt and sharing it with the team creates a template.",
    category: "work",
    icon: "task-list"
  },
  {
    term: "VERIFICATION",
    clue: "Checking before you send it on.",
    definition: "Confirming that what an AI produced is actually correct, before anyone relies on it.",
    example: "Clicking through to the source of every figure in an AI drafted report is verification.",
    category: "work",
    icon: "check-circle"
  },
  {
    term: "SCALE",
    clue: "Doing it for thousands as easily as for one.",
    definition: "Handling far more work without a matching rise in cost or effort, which is what AI is genuinely good at.",
    example: "Answering ten thousand routine questions costs little more than answering ten.",
    category: "work",
    icon: "cloud"
  },
  {
    term: "GOVERNANCE",
    clue: "The house rules for who may use what.",
    definition: "The policies deciding which AI tools are approved, what data may go into them, and who is accountable.",
    example: "A rule that client data never goes into a public AI tool is governance.",
    category: "work",
    icon: "lock"
  },
  {
    term: "KNOWLEDGE BASE",
    clue: "The pile of documents you point the AI at.",
    definition: "A collection of your own documents an AI can search and answer from, instead of guessing.",
    example: "Connecting a bot to your policy documents so it answers from them creates a knowledge base.",
    category: "work",
    icon: "book"
  },
  {
    term: "AUTOMATE",
    clue: "Hand the repeat job over for good.",
    definition: "To hand a repeatable task to software permanently, so it happens without anyone starting it.",
    example: "Once every invoice is filed and tagged without you, you have automated it.",
    category: "work",
    icon: "refresh-double"
  },
  {
    term: "STAKEHOLDER",
    clue: "Whoever has to live with the decision.",
    definition: "Anyone affected by a project, whose needs and worries shape whether it succeeds.",
    example: "Before rolling out a scheduling AI, the staff whose shifts it sets are key stakeholders.",
    category: "work",
    icon: "community"
  },
  {
    term: "EFFICIENCY",
    clue: "Less waste between effort and result.",
    definition: "Getting the same result with less time, cost, or effort than before.",
    example: "Cutting three approval steps to one is an efficiency gain.",
    category: "work",
    icon: "fire-flame"
  },
  {
    term: "ROLLOUT",
    clue: "Going from the trial to everybody.",
    definition: "The plan for moving a tool from a small test to full use, including training and support.",
    example: "A rollout usually goes team by team, not everyone on a Monday morning.",
    category: "work",
    icon: "nav-arrow-right"
  },
  {
    term: "BOTTLENECK",
    clue: "The narrow point everything queues behind.",
    definition: "The slowest step in a process, which sets the pace for everything else and is the best place to start.",
    example: "If every document waits two days for one approver, that approver is the bottleneck.",
    category: "work",
    icon: "prohibition"
  },
  {
    term: "BENCHMARK",
    clue: "The score you measure the new thing against.",
    definition: "A standard test or baseline used to compare tools, or to prove something actually improved.",
    example: "Timing the task by hand first gives you a benchmark to judge the AI against.",
    category: "work",
    icon: "star"
  },
  {
    term: "CONFIDENTIAL",
    clue: "Not for pasting into a public chatbot.",
    definition: "Information that must stay private, which is exactly what should never be typed into an outside AI tool.",
    example: "Salary details, client contracts, and unreleased plans are all confidential.",
    category: "work",
    icon: "lock"
  }
];
