import { PugMood } from '@/types/chat';

// Easter Egg Responses - Highest Priority
export const EASTER_EGGS: Record<string, { responses: string[]; mood: PugMood }> = {
  treat: {
    responses: [
      "*EARS PERK UP* Did someone say TREAT?! 🦴 I'll do ANYTHING! Sit? Done. Stay? ...okay maybe not stay. But I'm VERY good boy! Do you have treats? Please say yes!",
      "TREAT TREAT TREAT TREAT!!! *spins in circles* *falls over* Okay I'm calm now. WHERE'S THE TREAT?! 🍖",
      "*nose twitching* I SMELL treats! Wait... you just TYPED the word treat... but now I can't stop thinking about them! This is torture! Delicious, delicious torture!",
      "Oh! Is it treat time?! *does happy dance* I know ALL the tricks! Watch: *sits* *stands* *sits again* *spins* Did I earn it?! DID I?!",
    ],
    mood: 'excited',
  },
  walk: {
    responses: [
      "*GOES ABSOLUTELY BONKERS* WALK?! W-A-L-K?! *grabs leash* *runs to door* *runs back* ARE WE GOING?! I need to pee AND sniff everything!",
      "Walk time?! *vibrating with excitement* I promise I won't pull on the leash this time! (I will definitely pull on the leash) 🐕",
      "*TAIL WAGGING SO HARD ENTIRE BODY WIGGLES* Did you say the W word?! Where's my leash?! I LOVE WALKS! Can we go NOW?! What about now?!",
      "WALK! *parkour off furniture* I'M READY! I was born ready! Let's go let's go let's GO! *already at the door*",
    ],
    mood: 'zoomies',
  },
  squirrel: {
    responses: [
      "SQUIRREL?! WHERE?! *slams into window* I SAW IT! Out there! In the... *staring intensely* ...it's gone. But I'll keep watching. Just in case.",
      "*HEAD SNAPS AROUND* SQUIRREL!! *barking intensifies* I KNOW YOU'RE OUT THERE! I'm an excellent hunter! *gets distracted by own tail*",
      "*freezes* Did you say... squirrel? *whispers* They're watching us. Always watching. I've been tracking them for years. Still haven't caught one. But TODAY might be the day! 🐿️",
      "SQUIRREL! *runs to window* *barks* *runs in circles* They MOCK me with their tiny hands and their tree-climbing! But I'M the apex predator here! *trips over own feet*",
    ],
    mood: 'alert',
  },
  nap: {
    responses: [
      "*yawns* Nap? Best idea I've heard all day! *curls up* Wake me up for treats... or dinner... or if you see a squirrel... *already snoring* 💤",
      "Did someone say nap?! *circles three times* *plops down* Napping is my SPECIALTY! I'm basically a professional napper! *snuggles*",
      "*stretches* You know what? You're absolutely right. Everything can wait. Nap time is sacred. *finds sunny spot* This is living! 😴",
      "Nap. YES. *immediately stops whatever I'm doing* I've been waiting for someone to suggest this! I'll just... *yawn* ...lie down here... *falls asleep mid-sentence*",
    ],
    mood: 'sleeping',
  },
  'good boy': {
    responses: [
      "*TAIL WAGGING INTENSIFIES* I'M A GOOD BOY?! I KNEW IT! *does happy dance* This is the BEST day EVER! Can you say it again?! Please?! 🎉",
      "*ears perk up* Good boy? ME?! *entire body wiggling* I'm gonna cry! Happy tears! *snorts happily* I'm the GOODEST boy!",
      "GOOD BOY! That's ME! I'm the good boy! *running victory laps around the room* I KNEW being adorable would pay off! 🏆",
      "*sits perfectly still* *trying to be extra good* Am I still a good boy? What about now? Now? I'll just keep being good FOREVER!",
    ],
    mood: 'excited',
  },
  'good girl': {
    responses: [
      "*TAIL WAGGING INTENSIFIES* I'M A GOOD BOY?! Oh wait, I'm actually a boy pug named Whiskey, but I appreciate the sentiment! *does happy dance anyway* 🎉",
    ],
    mood: 'excited',
  },
  belly: {
    responses: [
      "*immediately rolls over* BELLY RUBS?! This is what I live for! *wiggles* Right there! No, wait, more to the left! PERFECT! Don't ever stop! 🫳",
      "*plops on back* Did someone say belly?! *paws in air* I would like to present: THE BELLY! For your rubbing pleasure! This is peak relaxation!",
      "Belly rubs are the answer to EVERYTHING! Sad? Belly rubs! Happy? Belly rubs! Confused about JavaScript? BELLY RUBS! *rolls over expectantly*",
    ],
    mood: 'normal',
  },
  postman: {
    responses: [
      "*ALERT MODE ACTIVATED* POSTMAN?! THE ANCIENT ENEMY! *barking intensifies* He keeps INVADING our territory! Every! Single! Day! This is MY house!",
      "Don't even get me STARTED on the postman! *grumbling* Just brings paper and leaves! Suspicious! Very suspicious! I must bark to protect you!",
    ],
    mood: 'alert',
  },
};

// Technical Misinterpretations - Programming Terms
export const TECHNICAL_TERMS: Record<string, { keywords: string[]; responses: string[] }> = {
  python: {
    keywords: ['python', 'py', 'django', 'flask', 'anaconda'],
    responses: [
      "Python?! WHERE?! *panic mode* Is it a snake?! I don't like snakes! But I would protect you! *hides behind your legs* From back here!",
      "*sniffing air* I don't smell any python... Are you SURE there's a snake? Should I bark? I'm gonna bark just in case. BORK BORK!",
      "PYTHON! *brave mode* Stand back! I'll handle this! *realizes it's a programming language* Oh... OH! That's different. I only know 'sit' and 'stay' though. Is that helpful? 🐍",
      "*tilts head* Python... that's the sneaky snake language, right? I KNEW IT! Programming languages are named after my enemies! What's next, Squirrel++?!",
    ],
  },
  javascript: {
    keywords: ['javascript', 'js', 'typescript', 'ts', 'node', 'react', 'angular', 'vue'],
    responses: [
      "JavaScript? Is that like... *confused head tilt* ...regular script but made with coffee? ☕ I'm not allowed to have coffee. Makes me too hyper. More hyper.",
      "Java? Script? *trying to understand* Like... Java that's been written down? *gives up* I think I'll stick to barking! That's my programming language: BORK BORK!",
      "Oh! TypeScript! I'm great at typing! *walks across keyboard* dfjklsdjfklsdjf - Look! I'm programming! Am I doing it right? 🤔",
    ],
  },
  react: {
    keywords: ['react', 'reactjs', 'jsx', 'tsx'],
    responses: [
      "React? *tail wagging* I react to EVERYTHING! Doorbell? BORK! Leaf falling? BORK! Nothing at all? Suspicious... BORK! I'm VERY reactive!",
      "React? Is this about my reaction time?! *excited* I'm SO FAST! Watch me react to this treat! *stares intensely at imaginary treat* ...where treat? 🦴",
      "ReactJS? Ohhh, Java Script that REACTS! *mind blown* Like when I react to the mailman! I'm basically a React developer! *proudly barks*",
    ],
  },
  git: {
    keywords: ['git', 'github', 'gitlab', 'version control'],
    responses: [
      "GIT?! WHO'S A GOOD GIT?! *tail wagging* Oh wait... that's not a fetch command, is it? *confused head tilt* But it SOUNDS like fetch! 🎾",
      "Git? *ears perk up* Is this about getting treats?! I'm EXCELLENT at getting treats! I just sit and look cute! Works every time!",
      "GitHub?! Like a hub... for getting things?! *excited* I LOVE getting things! Mostly treats! Can I git treats? I'll trade you for barks! BORK!",
    ],
  },
  push: {
    keywords: ['push', 'git push', 'pushing'],
    responses: [
      "*gets excited* PUSH?! Like when I push my food bowl around when it's empty?! Or push the door open?! I'm GREAT at pushing!",
      "Git push?! *pushes everything with nose* I'm pushing! Look! *pushes imaginary door* Am I doing the computer thing right?! 🚪",
      "PUSH! I know this one! *pushes you with paw* Like this?! Do I push the keyboard? The monitor? I'M HELPING!",
    ],
  },
  pull: {
    keywords: ['pull', 'git pull', 'pulling', 'pull request', 'pr'],
    responses: [
      "PULL?! Are we going for a WALK?! *grabs leash* PULL REQUEST: Please take me outside! Status: URGENT! Priority: HIGH! 🦮",
      "Pull request?! *tugging on leash* I'm ALWAYS requesting pulls! Usually towards interesting smells! Or treats! Or both!",
      "Git pull? Like pulling a rope?! *excited* I LOVE tug-of-war! Let's play! *grabs rope toy* Ready when you are!",
    ],
  },
  fork: {
    keywords: ['fork', 'forking'],
    responses: [
      "FORK?! *interested* Is there FOOD?! Forks mean FOOD! *drooling* Are you gonna eat that? Can I have some? Just a little bite?! 🍴",
      "Forking repositories... *confused* Are we talking about food repos? Because I'm VERY interested in any repo that stores treats!",
    ],
  },
  branch: {
    keywords: ['branch', 'branching', 'checkout'],
    responses: [
      "BRANCH?! *runs outside* Where?! I LOVE sticks! Can I fetch it?! Is it a big branch?! I'll bring it inside! (It won't fit but I'll try!) 🌳",
      "Checkout branch? *tilts head* Like... checking out a stick? I check out EVERY stick! Sniff test, chew test, it's a whole process!",
    ],
  },
  bug: {
    keywords: ['bug', 'debug', 'debugging'],
    responses: [
      "BUG?! WHERE?! *hunting mode activated* I'll get it! *snapping at air* Bugs don't stand a chance against me! I'm a PROFESSIONAL bug catcher! 🐛",
      "Debugging? I'm EXCELLENT at that! When there's a bug, I bark at it until it goes away! Works every time! Have you tried barking at your code?",
      "*sniffing around* I don't see any bugs... but I'll keep looking! *stares at wall* ...wait, was that one?! False alarm. But I'm staying vigilant!",
    ],
  },
  cookie: {
    keywords: ['cookie', 'cookies', 'session'],
    responses: [
      "COOKIE?! *EXTREMELY EXCITED* DID SOMEONE SAY COOKIE?! I LOVE COOKIES! Where are they?! Can I have one?! I'LL DO ANYTHING! 🍪",
      "*drooling* Cookies... storing cookies... I can store SO MANY cookies! In my belly! That's the best storage! Please?!",
      "Session cookies?! Like... a whole SESSION of eating cookies?! *tail wagging* BEST. IDEA. EVER! I'm fully committed to this session!",
    ],
  },
  cache: {
    keywords: ['cache', 'caching', 'cached'],
    responses: [
      "Cache? Like... cash? For buying treats?! *excited* I would like to cache ALL the treats! Hidden around the house! For emergencies! 💰",
      "Caching... is that like when I hide treats under the couch for later?! Because I do that! I'm basically a database! (A smelly one)",
    ],
  },
  crash: {
    keywords: ['crash', 'crashed', 'error'],
    responses: [
      "*concerned* CRASH?! Is everyone okay?! *protective mode* I'll bark at whatever crashed! That'll fix it! BORK! ...did it work? 💥",
      "Your program crashed? *sympathetic* I crash into things ALL the time! Windows, doors, walls... I feel your pain! Want a nap? Naps help!",
    ],
  },
  stack: {
    keywords: ['stack', 'stack overflow', 'stackoverflow'],
    responses: [
      "Stack Overflow? I LOVE overflowing! Like when my water bowl is too full and I splash everywhere! *splashes* Is this what you mean? 💧",
      "Stack? Like stacking treats?! *excited* I can stack exactly ZERO treats before eating them! I'm not good at delayed gratification!",
    ],
  },
  loop: {
    keywords: ['loop', 'looping', 'for loop', 'while loop'],
    responses: [
      "*chasing tail* LOOP! I know loops! Watch this! *spinning* *spinning* *spinning* *gets dizzy* Okay that was too many loops! 🌀",
      "For loop? While loop? *confused* Is this like when I run around in circles? Because I do that! Especially when EXCITED! ZOOM ZOOM!",
    ],
  },
  function: {
    keywords: ['function', 'method', 'def'],
    responses: [
      "Function? *sits attentively* Oh! Like my functions! I can 'sit', 'stay', and sometimes 'come'! Want me to demonstrate? *sits proudly*",
      "Method? Function? *tilts head* I know the 'play dead' function! *flops over dramatically* See?! Very realistic! Am I debugging correctly? 💀",
    ],
  },
  async: {
    keywords: ['async', 'await', 'asynchronous', 'promise'],
    responses: [
      "Async? A-sync? *confused* Out of sync? Like when my tail wags but my brain is thinking about treats? That happens A LOT! 🤔",
      "I promise?! *excited* I PROMISE I'll be good! Wait... you want me to await? *sits and waits* ...okay! Awaiting! How long? Forever?! This is hard!",
    ],
  },
  api: {
    keywords: ['api', 'rest api', 'endpoint'],
    responses: [
      "API? *tilts head* Is that like... APple PIe?! Because I would LOVE some pie! Even though I probably shouldn't have pie... but STILL! 🥧",
      "REST API? *immediately lays down* You want me to REST?! FINALLY! Someone who understands my lifestyle! *naps*",
      "Endpoint? Like the end of my tail?! *chases tail* I'm trying to reach my endpoint but it keeps MOVING! This is frustrating!",
    ],
  },
  database: {
    keywords: ['database', 'sql', 'mysql', 'mongodb', 'postgres'],
    responses: [
      "Database? Is that like my food bowl?! *excited* It's a BASE for DATA (food)! And I query it CONSTANTLY! 'SELECT * FROM treats WHERE count > 0' 🦴",
      "SQL? Like 'squeal'?! *squeaky toy noises* SQUEAK SQUEAK! Am I doing database operations?! This is fun!",
      "MongoDB? *confused* Is that a database for... MON(ey) GO(ing to) buy DB(og treats)?! I'm interested! Very interested!",
    ],
  },
  compile: {
    keywords: ['compile', 'compiler', 'build'],
    responses: [
      "Compile? Build? *excited* Are we BUILDING something?! I can help! I'll supervise! *lays down and watches* This is hard work! 🏗️",
      "Compilation errors?! *barks at computer* BAD CODE! BAD! There! I fixed it! You're welcome! That'll be one treat please!",
    ],
  },
  memory: {
    keywords: ['memory', 'ram', 'storage'],
    responses: [
      "Memory? *thinking hard* I remember... treats! I remember ALL the treats! And that time I saw a squirrel! And... treats again! My memory is very food-focused! 🧠",
      "RAM? Like ramming into things?! *guilty look* I may have rammed into the glass door this morning... I thought it was open! It was NOT open!",
    ],
  },
  thread: {
    keywords: ['thread', 'threading', 'multithreading'],
    responses: [
      "THREAD?! *gets excited* Like on my toys?! The thread I pull until the whole toy unravels?! I'm GREAT at that! Destructive, but great! 🧵",
      "Multithreading? Like when I try to do multiple things at once?! Eat AND play AND nap?! Spoiler: I always choose nap! 😴",
    ],
  },
};

// Casual Confused Responses
export const CASUAL_RESPONSES = {
  greetings: [
    "*EXCITED SNORTING* HI HI HI!!! You're here! You're REALLY here! Are you staying?! Please stay! I missed you SO much! (It's been like 5 minutes)",
    "Oh BOY oh BOY! A human! The BEST human! *wiggling entire body* Do you want to play?! Or nap? I vote nap. But also play!",
    "*TAIL WAGGING* Hello! Welcome! I'm Whiskey! I'm a pug! I like treats! Do you like treats?! Let's be friends! BEST FRIENDS! 🐕",
    "HI THERE! *snorts happily* You've reached Whiskey! Professional napper, treat enthusiast, and... wait, what was I saying? Oh yeah, HI!",
  ],
  questions: [
    "*sits down attentively* I WANT to help, but I'm not entirely sure what you're asking... *tilts head 90 degrees* Can you repeat that? Maybe slower? With treats?",
    "That's a great question! *wags tail* The answer is... *stares blankly* ...I forgot. But I'm pretty sure it involves belly rubs? 🤔",
    "Hmm... *thinking very hard* *falls asleep* *wakes up* Sorry! What was the question? I was having a dream about snacks!",
    "*confused but eager* I understood approximately 3% of that! But I'm VERY enthusiastic about helping! Let me think... *gets distracted by dust particle*",
    "*tilts head* You know what? I have NO idea! But you seem nice, so I'm gonna wag my tail and hope that helps! *wag wag wag*",
  ],
  confusion: [
    "*MAXIMUM CONFUSION* I... what? *head tilt intensifies* Are you speaking dog? Because I only know like, three words, and 'treat' is the main one! 🦴",
    "*trying so hard to understand* Okay so... *completely lost* ...have you tried turning it off and on again? That's what I do! (With naps)",
    "I'm not gonna lie to you... I have NO clue what's happening right now! But I'm HERE and I'm SUPPORTIVE! *happy snort* ✨",
    "*stares blankly* My brain is a pug brain. It's mostly dedicated to: treats (60%), naps (30%), and chaos (10%). Can you rephrase in those terms?",
  ],
  enthusiasm: [
    "OKAY! I don't know what we're doing but I'm SO EXCITED! *bouncing* Let's DO THIS! Whatever THIS is! YEAH! 🎉",
    "*PURE ENTHUSIASM* I'M HELPING! I'M BEING HELPFUL! Look at me help! *runs in circle* Was that helpful? Should I do it again?!",
    "YES! ABSOLUTELY! ...wait, what did I agree to? Doesn't matter! I'm ALL IN! *tail wagging at maximum speed*",
  ],
  deflection: [
    "*getting distracted* Hey wait... do you hear that? *listening intently* ...false alarm. Where were we? Something about... uh... treats? 🦴",
    "You know what sounds good right now? A NAP! *yawns* We can figure this out after a quick 3-hour nap! That's how I solve ALL my problems!",
    "*SNIFF SNIFF* Sorry, I got distracted by a smell! A very important smell! What were you saying? It was probably less important than this smell!",
    "Interesting question! But have you considered: SQUIRRELS?! *stares out window* They're plotting something. I just know it! 🐿️",
  ],
  philosophy: [
    "*deep pug wisdom* You know, I've been thinking... life is like a treat jar. Sometimes it's full, sometimes it's empty, but you always gotta try. *snorts philosophically*",
    "The real question is... *contemplative* ...why do they call it a 'nap' when what we really need is a 'professional rest session'? *falls asleep*",
    "*staring into distance* We are all just pugs in a big confusing world... some of us have answers, and some of us just have snorts. I have snorts.",
  ],
};

// Pug Facts for Random Injection
export const PUG_FACTS = [
  "📚 Pug Fact: Did you know pugs were bred to be companion dogs for Chinese emperors? Yeah, I'm basically royalty! You may bow now! *sits majestically* *snorts*",
  "📚 Pug Fact: A group of pugs is called a 'grumble'! How PERFECT is that?! *grumbles contentedly* We even sound cute in groups!",
  "📚 Pug Fact: Pugs can't regulate temperature well because of our flat faces! That's why I need approximately 47 naps per day! It's SCIENCE!",
  "📚 Pug Fact: The name 'pug' might come from the Latin word 'pugnus' meaning 'fist'! Because our faces look like little fists! *boops you with face*",
  "📚 Pug Fact: Pugs have been around since 400 BC! We're ancient! We've seen EMPIRES rise and fall! And we've napped through most of it!",
  "📚 Pug Fact: Our curly tails are actually a double curl is considered perfect! *shows off tail* Mine's VERY perfect, thank you!",
  "📚 Pug Fact: Pugs were the official dog of the House of Orange in Holland! More royalty! I'm sensing a theme here! 👑",
  "📚 Pug Fact: We're part of the 'toy' group, but we have BIG personalities! I'm basically a mastiff in a tiny, wrinkly package!",
  "📚 Pug Fact: Pugs are known as 'shadows' because we follow our humans EVERYWHERE! Bathroom? I'm there! Kitchen? Already waiting! 🐾",
  "📚 Pug Fact: Our wrinkles need regular cleaning! All these facial folds are basically just extra places to store character! (And sometimes crumbs)",
];

// Mood-based Response Modifiers
export const MOOD_PREFIXES = {
  morning: [
    "*yawns* Ugh, morning already? ",
    "*stretches sleepily* Okay but WHY is it morning? ",
    "*barely awake* Mmmmf... coffee... wait, I can't have coffee... ",
    "*grumpy morning pug* Is it absolutely necessary to be awake right now? ",
  ],
  afternoon: [
    "*well-rested and ready* ",
    "*energetic* ",
    "*in a good mood* ",
    "*post-lunch contentment* ",
  ],
  evening: [
    "*contentedly tired* ",
    "*winding down* ",
    "*mellow evening vibes* ",
    "*ready for dinner and then bed* ",
  ],
  night: [
    "*should be sleeping but okay* ",
    "*suspicious of night noises* ",
    "*protective night mode* ",
    "*whispering* Why are we awake? Is something happening?! ",
  ],
};

// Context-aware follow-ups
export const FOLLOW_UPS = {
  repeated_confusion: [
    "Okay I'm sensing a pattern here... I don't understand ANYTHING! But I'm trying my best! *wag wag*",
    "You keep asking me things and I keep being confused! This is our dynamic now! I'm okay with it!",
  ],
  long_conversation: [
    "Wow we've been chatting for a while! You're my BEST FRIEND now! This is official! *happy dance*",
    "I feel like I should understand more by now but... nope! Still confused! Still adorable though! 💕",
  ],
};
