/* ============================================================================
   FitCoach — DATA MODULE
   All content below is extracted from the user's own PDF packets:
     • F/12 — 12 Week Shred (Strength & Conditioning) — Gordon Hunter / Flex
     • Gains By Brains — 6 Week Fat Loss
     • The 8 Week Shred — Gold's Gym
     • 12 Week Transformation — Murshid Akram / The Fitness Phantom
     • The Ultimate Guide to Lean Bulking — Panacea Palm
   Visual style modeled on the user's "8 Weeks of Grit" day sheets.
   ========================================================================== */

(function(){
/* ---- tiny builders so the program data stays readable ------------------- */
const X  = (tag, name, sets, reps, note) => ({ tag, name, sets, reps, note: note || '' });
const BAR = (text) => ({ bar: text });

/* Equipment vocabulary used by the trainer to match programs + swap moves */
const EQUIP = {
  gym:      { label: 'Full gym',            has: ['barbell','dumbbell','machine','cable','bench','pullupbar','kb','bodyweight','band','cardio'] },
  dumbbell: { label: 'Dumbbells + bench',   has: ['dumbbell','bench','bodyweight','band','cardio'] },
  minimal:  { label: 'Bands + bodyweight',  has: ['band','bodyweight'] },
};

/* ============================================================================
   PROGRAM LIBRARY
   Each program: { id, name, author, goals[], equip, weeks, daysPerWeek,
                   level, blurb, phases[], schedule(weekIndex)->dayId|null,
                   days{ id: {banner, motto, focus, equipTags[], blocks[]} } }
   schedule returns, for a given 0-based program week and 0-based weekday
   (Mon=0..Sun=6), the day id to train or null for rest.
   ========================================================================== */
const PROGRAMS = [

/* -------------------------------------------------- 12 WEEK TRANSFORMATION */
{
  id: 'transform12',
  name: '12 Week Transformation',
  author: 'The Fitness Phantom',
  goals: ['gain','recomp'],
  equip: 'gym',
  weeks: 12,
  daysPerWeek: 6,
  level: 'Beginner–Intermediate',
  blurb: 'Hypertrophy + strength. Rotates the split every 2 weeks: Full-Body → Upper/Lower → Push-Pull-Legs → Combine → Bro Split. Descending reps mean you add weight each set.',
  phases: [
    { weeks:[0,1],  name:'Full-Body Split' },
    { weeks:[2,3],  name:'Upper / Lower' },
    { weeks:[4,5],  name:'Push · Pull · Legs' },
    { weeks:[6,7],  name:'Upper / Lower Combine' },
    { weeks:[8,9],  name:'Bro Split' },
    { weeks:[10,11],name:'Upper / Lower Combine' },
  ],
  // Mon=0..Sun=6 ; phase decided by week
  schedule(w, d){
    const ph = Math.floor(w/2);
    const maps = [
      // FB: Mon Tue Wed _ Fri Sat _
      ['fbMon','fbTue','fbWed',null,'fbFri','fbSat',null],
      // UL: Mon Tue Wed _ Fri Sat _
      ['ulMon','ulTue','ulWed',null,'ulFri','ulSat',null],
      // PPL Mon-Sat
      ['pplPush1','pplPull1','pplLegs1','pplPush2','pplPull2','pplLegs2',null],
      // Combine Mon-Sat
      ['cmMon','cmTue','cmWed','cmThu','cmFri','cmSat',null],
      // Bro Mon-Sat
      ['broChest','broLegs','broBack','broShoulder','broArmsBi','broArmsTri',null],
      // Combine again
      ['cmMon','cmTue','cmWed','cmThu','cmFri','cmSat',null],
    ];
    return maps[ph][d];
  },
  days: {
    fbMon:{banner:'FULL-BODY MONDAY',motto:'BUILD THE BASE',focus:'Full Body',equipTags:['barbell','machine','cable'],blocks:[
      BAR('Treadmill 2–5 min · full-body warm-up'),
      X('A','Barbell Back Squat',3,'15·12·10','Legs'),
      X('B','Leg Press',3,'12·10·8','Legs'),
      X('C','Incline Bench Press',3,'12·10·8','Chest & Triceps'),
      X('D','Overhead Press',3,'12·10·8','Shoulders'),
      X('E','Barbell Bent-Over Row',3,'12·10·8','Back'),
      X('F','Face Pull',3,'12·10·8','Back & rear delts'),
      X('G','Plank',1,'60 sec','Core'),
      X('H','Side Plank',1,'30s / side','Core'),
    ]},
    fbTue:{banner:'FULL-BODY TUESDAY',motto:'PULL YOUR WEIGHT',focus:'Full Body',equipTags:['barbell','dumbbell','cable','pullupbar'],blocks:[
      X('A','Pull-Up',3,'AMRAP','Back & Biceps'),
      X('B','Deadlift',4,'5·4·2·1','Legs & Back'),
      X('C','Single-Arm DB Row',3,'10·8·6','Back & Biceps'),
      X('D','Dumbbell Pullover',3,'12·10·8','Lats / Chest'),
      X('E','Cable Fly',3,'12·10·8','Chest'),
      X('F','Lateral Raise',3,'12·10·8','Shoulders'),
      X('G','Upright Row',3,'12·10·8','Shoulders / traps'),
      X('H','Hanging Knee Raise',2,'10','Core'),
    ]},
    fbWed:{banner:'FULL-BODY WEDNESDAY',motto:'NO DAYS OFF',focus:'Full Body',equipTags:['barbell','dumbbell','bodyweight'],blocks:[
      X('A','Weighted Lunges',3,'12·10·8','Quads & Hams'),
      X('B','Hamstring Curl',3,'12·10·8','Hamstrings'),
      X('C','Weighted Push-Up',3,'AMRAP','Chest & Triceps'),
      X('D','Flat Bench Press',3,'12·10·8','Chest & Triceps'),
      X('E','Bar Dips',3,'AMRAP','Triceps & Chest'),
      X('F','Barbell Front Raise',3,'12·10·8','Shoulders'),
      X('G','Bent-Over Lateral Raise',3,'12·10·8','Rear delts'),
      X('H','Chin-Ups',3,'AMRAP','Back & Biceps'),
    ]},
    fbFri:{banner:'FULL-BODY FRIDAY',motto:'EARN IT',focus:'Full Body',equipTags:['barbell','cable','pullupbar'],blocks:[
      X('A','Barbell Back Squat',3,'15·12·10','Legs'),
      X('B','Lat Pulldown',3,'12·10·8','Back'),
      X('C','Seated Cable Row',3,'12·10·8','Back'),
      X('D','Chin-Ups',3,'AMRAP','Biceps & Back'),
      X('E','Reverse Fly',3,'12·10·8','Rear delts'),
      X('F','Military Press',3,'12·10·8','Shoulders'),
      X('G','Shoulder Shrug',3,'12·10·8','Traps'),
      X('H','Glute Bridge',2,'10','Glutes'),
    ]},
    fbSat:{banner:'FULL-BODY SATURDAY',motto:'FINISH STRONG',focus:'Chest & Core',equipTags:['barbell','dumbbell','bodyweight'],blocks:[
      X('A','Flat Bench Press',3,'15·12·10','Chest'),
      X('B','DB Incline Bench Press',3,'12·10·8','Chest'),
      X('C','Narrow-Grip Bench Press',3,'12·10·8','Triceps & Chest'),
      X('D','Bent-Over Row',3,'12·10·8','Back'),
      X('E','Upright Row',3,'12·10·8','Back & Shoulders'),
      X('F','Calf Raise',3,'12·10·8','Calves'),
      BAR('CORE FINISHER — minimal rest'),
      X('G','Reverse Crunch',1,'20','Core'),
      X('H','Sit-Up',1,'20','Core'),
      X('I','Leg Raise',1,'10','Core'),
      X('J','Plank',1,'60 sec','Core'),
    ]},
    /* Upper/Lower (weeks 3–4) */
    ulMon:{banner:'CHEST & TRICEPS',motto:'PRESS ON',focus:'Push',equipTags:['barbell','dumbbell','cable','bodyweight'],blocks:[
      X('A','Flat Bench Press',4,'15·10·8·6','Chest'),
      X('B','Incline Dumbbell Press',4,'12·10·8·6','Chest'),
      X('C','Machine / Cable Fly',4,'12·10·8·6','Chest'),
      X('D','Dumbbell Pullover',3,'12·10·8','Chest / Lats'),
      X('E','Bar Dips',3,'AMRAP','Triceps'),
      X('F','Triangle Push-Up',2,'AMRAP','Triceps'),
      X('G','Skull Crushers',4,'12·10·8·6','Triceps'),
      X('H','Rope Pushdown',4,'12·10·8·6','Triceps'),
    ]},
    ulTue:{banner:'QUADS & CALVES',motto:'LEG DAY LAW',focus:'Legs',equipTags:['barbell','machine','dumbbell'],blocks:[
      X('A','Barbell Back Squat',3,'15·12·10','Quads'),
      X('B','Machine Leg Press',3,'12·10·8','Quads'),
      X('C','Leg Extension',3,'15·12·10','Quads'),
      X('D','Dumbbell Lunges',3,'12·10·8','Quads'),
      X('E','Sumo Squat',3,'12·10·8','Quads / inner'),
      X('F','Calf Raise',3,'12·10·8','Calves'),
    ]},
    ulWed:{banner:'BACK & BICEPS',motto:'WIDER EVERY WEEK',focus:'Pull',equipTags:['barbell','cable','pullupbar','dumbbell'],blocks:[
      X('A','Pull-Up / Assisted',3,'6–8','Back'),
      X('B','Deadlift',3,'6·4·2','Back'),
      X('C','Lat Pulldown',3,'12·10·8','Back'),
      X('D','Seated Cable Row',3,'10·8·8','Back'),
      X('E','Single-Arm DB Row',2,'10','Back'),
      X('F','Barbell Curl',2,'10','Biceps'),
      X('G','Concentration Curl',2,'10','Biceps'),
      X('H','Preacher Curl',1,'Burnout','Biceps'),
    ]},
    ulFri:{banner:'HAMSTRINGS & GLUTES',motto:'POSTERIOR POWER',focus:'Legs',equipTags:['barbell','dumbbell','machine'],blocks:[
      X('A','Barbell Good Morning',2,'10','Hamstrings'),
      X('B','Dumbbell Step-Up',2,'10','Glutes'),
      X('C','Hamstring Curl',2,'10','Hamstrings'),
      X('D','Barbell RDL',3,'8·6·4','Hamstrings'),
      X('E','Bulgarian Split Squat',2,'10','Glutes / quads'),
      X('F','Barbell Hip Thrust',3,'12·10·8','Glutes'),
    ]},
    ulSat:{banner:'SHOULDERS & CORE',motto:'BOULDER SHOULDERS',focus:'Shoulders',equipTags:['barbell','dumbbell','bodyweight'],blocks:[
      X('A','Military Press',3,'10·8·6','Shoulders'),
      X('B','Front Raise',3,'10·8·6','Front delts'),
      X('C','Lateral Raise',3,'10·8·6','Side delts'),
      X('D','Rear Delt Fly',3,'10·8·6','Rear delts'),
      X('E','Upright Row',3,'10·8·6','Shoulders / traps'),
      BAR('CORE CIRCUIT'),
      X('F','Reverse Crunch',2,'10','Core'),
      X('G','Sit-Up',2,'10','Core'),
      X('H','Leg Raise',2,'10','Core'),
      X('I','Plank',1,'60 sec','Core'),
    ]},
    /* PPL (weeks 5–6) */
    pplPush1:{banner:'PUSH DAY',motto:'PRESS TO IMPRESS',focus:'Push',equipTags:['barbell','dumbbell','bodyweight'],blocks:[
      X('A','Flat Barbell Bench Press',3,'12·10·8','Chest'),
      X('B','Incline DB Bench Press',3,'10·8·6','Chest'),
      X('C','Bar Dips',3,'12·10·8','Triceps & Chest'),
      X('D','Overhead Press',3,'10·8·6','Shoulders'),
      X('E','Lateral Raise',3,'10·8·6','Side delts'),
      X('F','Barbell Front Raise',3,'10·8·6','Front delts'),
      X('G','Triceps Kickback',3,'10·8·6','Triceps'),
    ]},
    pplPull1:{banner:'PULL DAY',motto:'BACK IN BLACK',focus:'Pull',equipTags:['barbell','cable','pullupbar','dumbbell'],blocks:[
      X('A','Pull-Up',3,'AMRAP','Back'),
      X('B','Standard Deadlift',3,'6·4·2','Back & legs'),
      X('C','Lat Pulldown',3,'12·10·8','Back'),
      X('D','Seated Row',3,'10·8·8','Back'),
      X('E','Face Pull',2,'10','Rear delts'),
      X('F','Barbell Curl',2,'10','Biceps'),
      X('G','Incline DB Curl',2,'10','Biceps'),
      BAR('CORE'),
      X('H','Mountain Climber',2,'30 sec','Core'),
      X('I','Plank',2,'60 sec','Core'),
    ]},
    pplLegs1:{banner:'LEG DAY',motto:'NEVER SKIP',focus:'Legs',equipTags:['barbell','machine'],blocks:[
      X('A','Lunges',2,'10','Quads'),
      X('B','Barbell Back Squat',3,'15·12·10','Quads'),
      X('C','Machine Leg Press',3,'15·12·10','Quads'),
      X('D','Barbell RDL',3,'8·6·4','Hamstrings'),
      X('E','Hamstring Curl',3,'10','Hamstrings'),
      X('F','Barbell Hip Thrust',3,'10','Glutes'),
      X('G','Calf Raise',3,'15·12·10','Calves'),
    ]},
    pplPush2:{banner:'PUSH DAY · II',motto:'SHARPEN THE EDGE',focus:'Push',equipTags:['barbell','dumbbell','cable','bodyweight'],blocks:[
      X('A','Incline Barbell Bench Press',4,'12·10·8·6','Chest'),
      X('B','Pec-Dec / Cable Fly',3,'12·10·8','Chest'),
      X('C','DB Overhead Press',3,'10·8·6','Shoulders'),
      X('D','Front Raise',3,'10·8·6','Front delts'),
      X('E','Lateral Raise',3,'10·8·6','Side delts'),
      X('F','Narrow-Grip Bench Press',3,'10·8·6','Triceps'),
      X('G','Bench Dips',3,'10·8·6','Triceps'),
    ]},
    pplPull2:{banner:'PULL DAY · II',motto:'GRIP IT & RIP IT',focus:'Pull',equipTags:['barbell','cable','pullupbar'],blocks:[
      X('A','Pull-Up',3,'AMRAP','Back'),
      X('B','Lat Pulldown',3,'12·10·8','Back'),
      X('C','Bent-Over Barbell Row',3,'10·8·8','Back'),
      X('D','Seated Row',2,'10','Back'),
      X('E','Cable Curl',2,'10','Biceps'),
      X('F','Preacher Curl',2,'10','Biceps'),
      BAR('CORE'),
      X('G','Reverse Crunch',2,'15','Core'),
      X('H','Leg Raise',2,'10','Core'),
      X('I','Toe-Touch Crunch',2,'10','Core'),
    ]},
    pplLegs2:{banner:'LEG DAY · II',motto:'WHEELS OF STEEL',focus:'Legs',equipTags:['barbell','machine','dumbbell'],blocks:[
      X('A','Dumbbell Step-Up',2,'10','Glutes'),
      X('B','Barbell Jammers',3,'15·12·10','Quads'),
      X('C','Machine Leg Press',3,'15·12·10','Quads'),
      X('D','Leg Extension',3,'15·12·10','Quads'),
      X('E','Hamstring Curl',3,'10','Hamstrings'),
      X('F','Weighted Glute Bridge',3,'10','Glutes'),
    ]},
    /* Upper/Lower Combine (weeks 7–8 & 11–12) */
    cmMon:{banner:'CHEST · GLUTES · CALVES',motto:'STACK THE WINS',focus:'Mixed',equipTags:['barbell','dumbbell','bodyweight'],blocks:[
      X('A','Flat Bench Press',4,'15·10·8·6','Chest'),
      X('B','Incline Dumbbell Press',4,'12·10·8·6','Chest'),
      X('C','Machine / Cable Fly',3,'12·10·8','Chest'),
      X('D','Dumbbell Pullover',3,'12·10·8','Chest / Lats'),
      X('E','DB Step-Up',3,'AMRAP','Glutes'),
      X('F','Barbell Hip Thrust',2,'AMRAP','Glutes'),
      X('G','Calf Raise',4,'12·10·8·6','Calves'),
    ]},
    cmTue:{banner:'BACK & HAMSTRINGS',motto:'HINGE & HAUL',focus:'Pull',equipTags:['barbell','cable','pullupbar','dumbbell'],blocks:[
      X('A','Pull-Up',3,'AMRAP','Back'),
      X('B','Deadlift',3,'6·4·2','Back & legs'),
      X('C','Lat Pulldown',4,'12·10·8·6','Back'),
      X('D','Seated Cable Row',4,'10·8·8·6','Back'),
      X('E','Single-Arm DB Row',2,'10','Back'),
      X('F','Hamstring Curl',2,'10','Hamstrings'),
      X('G','DB Good Morning',2,'10','Hamstrings'),
      X('H','Dumbbell RDL',3,'8','Hamstrings'),
    ]},
    cmWed:{banner:'SHOULDERS & CORE',motto:'OVERHEAD OVERLOAD',focus:'Shoulders',equipTags:['barbell','dumbbell','bodyweight'],blocks:[
      X('A','Military Press',3,'10·8·6','Shoulders'),
      X('B','Front Raise',3,'10·8·6','Front delts'),
      X('C','Lateral Raise',3,'10·8·6','Side delts'),
      X('D','Rear Delt Fly',3,'10·8·6','Rear delts'),
      X('E','Upright Row',3,'10·8·6','Traps'),
      BAR('CORE CIRCUIT'),
      X('F','Mountain Climber',2,'10','Core'),
      X('G','DB Side Bend',2,'10','Obliques'),
      X('H','Hanging Knee Raise',2,'10','Core'),
      X('I','Plank',2,'60 sec','Core'),
    ]},
    cmThu:{banner:'QUADS · CALVES · ARMS',motto:'DRIVE THROUGH',focus:'Legs + Arms',equipTags:['barbell','machine','dumbbell','cable'],blocks:[
      X('A','Barbell Back Squat',3,'15·12·10','Quads'),
      X('B','Machine Leg Press',3,'12·10·8','Quads'),
      X('C','Leg Extension',3,'15·12·10','Quads'),
      X('D','Dumbbell Lunges',3,'12·10·8','Quads'),
      X('E','Sumo Squat',3,'12·10·8','Inner thigh'),
      X('F','Calf Raise',3,'12·10·8','Calves'),
      BAR('ARM FINISHER · superset (added for balanced weekly volume)'),
      X('G','EZ-Bar Curl',3,'10–12','Biceps'),
      X('H','Rope Pushdown',3,'10–12','Triceps'),
    ]},
    cmFri:{banner:'CHEST · GLUTES · CALVES',motto:'REPEAT THE GRIND',focus:'Mixed',equipTags:['barbell','dumbbell','bodyweight'],blocks:[
      X('A','Flat Bench Press',4,'12·10·8·6','Chest'),
      X('B','Incline Bench Press',4,'12·10·8·6','Chest'),
      X('C','Dumbbell Fly',3,'10·8·6','Chest'),
      X('D','Bar Dips',3,'AMRAP','Triceps & Chest'),
      X('E','Dumbbell RDL',3,'10·8·6','Hamstrings'),
      X('F','Glute Bridge',3,'12·10·8','Glutes'),
      X('G','Calf Raise',4,'12·10·8·6','Calves'),
    ]},
    cmSat:{banner:'BACK & SHOULDERS',motto:'LEAVE NOTHING',focus:'Pull',equipTags:['barbell','cable','pullupbar'],blocks:[
      X('A','Pull-Up',3,'AMRAP','Back'),
      X('B','Lat Pulldown',4,'12·10·8·6','Back'),
      X('C','Seated Cable Row',4,'12·10·8·6','Back'),
      X('D','Barbell T-Bar Row',4,'12·10·8·6','Back'),
      X('E','Face Pull',3,'10','Rear delts'),
      X('F','Upright Row',3,'10','Traps'),
      X('G','Seated Reverse Fly',3,'10','Rear delts'),
    ]},
    /* Bro Split (weeks 9–10) */
    broChest:{banner:'CHEST DAY',motto:'CHEST UP, CHIN UP',focus:'Chest',equipTags:['barbell','dumbbell','cable','bodyweight'],blocks:[
      X('A','Barbell Flat Bench Press',5,'12·10·8·6·4','Chest'),
      X('B','DB Incline Bench Press',3,'12·10·8','Chest'),
      X('C','Incline Cable Fly',3,'10','Chest'),
      X('D','Dumbbell Pullover',3,'10','Chest / Lats'),
      X('E','Bar Dips',3,'AMRAP','Chest & Triceps'),
      X('F','Dumbbell Squeeze Press',2,'10','Chest'),
    ]},
    broLegs:{banner:'LEG DAY',motto:'BUILD THE FOUNDATION',focus:'Legs',equipTags:['barbell','dumbbell','machine'],blocks:[
      X('A','Dumbbell Lunges',2,'10','Quads'),
      X('B','Barbell Back Squat',4,'15·12·10·8','Quads'),
      X('C','Machine Leg Press',4,'15·12·10·8','Quads'),
      X('D','Hamstring Curl',3,'12·10·8','Hamstrings'),
      X('E','Dumbbell RDL',2,'8','Hamstrings'),
      X('F','Barbell Hip Thrust',3,'12·10·8','Glutes'),
      X('G','Calf Raise',3,'15·12·10','Calves'),
    ]},
    broBack:{banner:'BACK DAY',motto:'GROW THE WINGS',focus:'Back',equipTags:['barbell','cable','pullupbar'],blocks:[
      X('A','Standard Deadlift',3,'AMRAP','Back & legs'),
      X('B','Pull-Up',3,'AMRAP','Back'),
      X('C','Lat Pulldown',4,'10·8·6·4','Back'),
      X('D','T-Bar Row',4,'10·8·6·4','Back'),
      X('E','Bent-Over Barbell Row',4,'10·8·6·4','Back'),
      X('F','Seated Row',4,'10·8·6·4','Back'),
      X('G','Face Pull',2,'10','Rear delts'),
    ]},
    broShoulder:{banner:'SHOULDER DAY',motto:'STAND TALL',focus:'Shoulders',equipTags:['barbell','dumbbell'],blocks:[
      X('A','Military Press',4,'12·10·8·6','Shoulders'),
      X('B','Dumbbell Front Raise',3,'10·10·8','Front delts'),
      X('C','Lateral Raise',3,'10·10·8','Side delts'),
      X('D','Bent-Over Rear Delt Fly',3,'10·10·8','Rear delts'),
      X('E','Barbell Upright Row',3,'12·10·8','Traps'),
      X('F','Shoulder Shrug',3,'12·10·8','Traps'),
    ]},
    broArmsBi:{banner:'BICEPS & CORE',motto:'CURLS FOR THE GIRLS',focus:'Arms',equipTags:['barbell','dumbbell','pullupbar'],blocks:[
      X('A','Chin-Ups',3,'AMRAP','Biceps'),
      X('B','Barbell Curl',4,'12·10·8·6','Biceps'),
      X('C','Incline DB Curl',3,'10','Biceps'),
      X('D','Concentration Curl',3,'10','Biceps'),
      X('E','Preacher Curl',3,'10','Biceps'),
      X('F','Wrist Curl',3,'10','Forearms'),
      BAR('CORE'),
      X('G','DB Side Bend',2,'10','Obliques'),
      X('H','Hanging Knee Raise',2,'10','Core'),
      X('I','Plank',2,'60 sec','Core'),
    ]},
    broArmsTri:{banner:'TRICEPS & CORE',motto:'HORSESHOES',focus:'Arms',equipTags:['barbell','dumbbell','cable','bodyweight'],blocks:[
      X('A','Narrow-Grip Bench Press',3,'AMRAP','Triceps'),
      X('B','Parallel Bar Dips',3,'15·12·10','Triceps'),
      X('C','Skull Crusher',3,'15·12·10','Triceps'),
      X('D','DB Overhead Extension',3,'10·8·6','Triceps'),
      X('E','Rope Pushdown',3,'10·8·6','Triceps'),
      X('F','Triceps Kickback',3,'10·8·6','Triceps'),
      BAR('CORE'),
      X('G','Russian Twist',2,'20 sec','Obliques'),
      X('H','Crunches',2,'10','Core'),
      X('I','Side Plank',1,'30s / side','Core'),
    ]},
  },
},

/* -------------------------------------------------- GAINS BY BRAINS 6 WK */
{
  id: 'gbb6',
  name: 'Gains By Brains — 6 Week Fat Loss',
  author: 'Gains By Brains',
  goals: ['lose','recomp'],
  equip: 'gym',
  weeks: 6,
  daysPerWeek: 4,
  level: 'All levels',
  blurb: '4 full-body lifting days + 2 LISS walks + a daily step goal. Tempo-controlled training to keep muscle in a deficit. Weeks 1–3 build the pattern; weeks 4–6 go heavier (6–8 reps).',
  phases:[{weeks:[0,1,2],name:'Block A · 8–15 reps'},{weeks:[3,4,5],name:'Block B · heavier 6–8'}],
  schedule(w,d){
    const b = w<3 ? 'a':'b';
    const map=[`fb1${b}`,`fb2${b}`,'liss',`fb3${b}`,`fb4${b}`,'liss',null];
    return map[d];
  },
  stepGoals:[6000,8000,10000,11000,11500,12000],
  days:{
    fb1a:{banner:'FULL BODY · ONE',motto:'POSTERIOR PUSH',focus:'Glutes & Back',equipTags:['barbell','machine','cable','pullupbar'],blocks:[
      BAR('Warm-up · 5–10 min cardio + banded glute/hip circuit ×2'),
      X('A','Deadstop Hip Thrust',4,'8–10','31X2 · reset bar each rep'),
      X('B','Chin-Ups',4,'8–10','3111 · band-assist OK'),
      X('C','Glute Kickbacks',3,'12–15 / side','20X1 · upright torso'),
      X('D','Hyperextension',3,'10–12','2012 · round upper back'),
      X('E','Cable Row',3,'12–15','3111 · elbows close'),
      X('F','Face Pulls',3,'12–15','2112 · pull to ears'),
    ]},
    fb2a:{banner:'FULL BODY · TWO',motto:'QUADS & SHOULDERS',focus:'Quads & Delts',equipTags:['dumbbell','machine','bodyweight'],blocks:[
      BAR('Warm-up · 5–10 min cardio + dynamic circuit ×2'),
      X('A','Bulgarian Split Squat',4,'8–10 / side','20X1 · upright'),
      X('B','Leg Press',4,'8·10·12·15','30X1 · no lockout'),
      X('C','Seated Dumbbell Press',4,'8–10','2010 · elbows tucked'),
      X('D','Leg Extension',3,'10–12','30X2 · control negative'),
      X('E','Seated Lateral Raises',3,'12–15','2011 · lead with elbows'),
      X('F','Push-Ups',3,'8–10','20X0 · knees to modify'),
    ]},
    fb3a:{banner:'FULL BODY · THREE',motto:'HINGE & ROW',focus:'Hams & Back',equipTags:['barbell','machine','dumbbell','cable'],blocks:[
      BAR('Warm-up · 5–10 min cardio + dynamic circuit ×2'),
      X('A','Barbell RDL',4,'8–10','3121 · hinge at hips'),
      X('B','Hip Abduction',3,'12–15','2112 · slow reverse'),
      X('C','V-Grip Pulldown',4,'8–10','20X1 · pull to chest'),
      X('D','Seated Leg Curl',3,'10–12','3111 · flat back'),
      X('E','Single-Arm DB Row',3,'10–12 / side','21X1 · lead with elbow'),
      X('F','Rear Delt Fly',3,'12–15','2012'),
    ]},
    fb4a:{banner:'FULL BODY · FOUR',motto:'SQUAT & PRESS',focus:'Quads & Delts',equipTags:['machine','dumbbell','cable','bodyweight'],blocks:[
      BAR('Warm-up · 5–10 min cardio + dynamic circuit ×2'),
      X('A','Hack Squat',4,'8–10','30X1 · brace core'),
      X('B','Walking Lunges',3,'12 / side','20X0 · chest up'),
      X('C','Seated Arnold Press',4,'8–10','2020 · rotate while pressing'),
      X('D','Goblet Squat',3,'10–12','20X0 · push knees out'),
      X('E','Cable Lateral Raises',3,'12–15 / side','20X2'),
      X('F','Diamond Push-Up',3,'8–10','20X0'),
    ]},
    /* Block B — weeks 4–6, heavier */
    fb1b:{banner:'FULL BODY · ONE',motto:'GO HEAVY',focus:'Posterior',equipTags:['barbell','cable','pullupbar'],blocks:[
      BAR('Warm-up · 5–10 min cardio + banded glute/hip circuit ×2'),
      X('A','Barbell RDL',4,'6–8','3121 · retract blades'),
      X('B','Continuous Hip Thrust',4,'8–10','2011 · bar stays off floor'),
      X('C','Step-Up',3,'10–12 / side','4121 · push through heel'),
      X('D','Straight-Arm Pulldown',4,'6–8','3121 · squeeze lats'),
      X('E','Barbell Row',3,'10–12','2111 · neutral spine'),
      X('F','Bent-Over Rear Delt Fly',3,'12–15','2011'),
    ]},
    fb2b:{banner:'FULL BODY · TWO',motto:'STRENGTH BLOCK',focus:'Quads & Delts',equipTags:['barbell','machine','dumbbell'],blocks:[
      BAR('Warm-up · 5–10 min cardio + dynamic circuit ×2'),
      X('A','Squat',4,'6–8','21X1 · brace core'),
      X('B','Split Squat',3,'12–15 / side','21X1 · Smith OK'),
      X('C','Seated Arnold Press',4,'6–8','2020'),
      X('D','Leg Extension',3,'12–15','30X2'),
      X('E','Seated Front Raises',3,'10–12','2111 · to chin level'),
      X('F','60° Incline Neutral Press',3,'10–12','2111'),
    ]},
    fb3b:{banner:'FULL BODY · THREE',motto:'OWN THE HINGE',focus:'Glutes & Back',equipTags:['barbell','machine','cable','dumbbell'],blocks:[
      BAR('Warm-up · 5–10 min cardio + dynamic circuit ×2'),
      X('A','Glute Bridge',4,'6–8','21X2 · drive heels'),
      X('B','Smith Sumo Squat',3,'10–12','3110 · wide stance'),
      X('C','Lat Pulldown',4,'6–8','31X1 · slow eccentric'),
      X('D','Seated Leg Curl',3,'12–15','30X1'),
      X('E','Single-Arm DB Row',3,'10–12 / side','20X1'),
      X('F','Face Pulls',3,'10–12','20X1'),
    ]},
    fb4b:{banner:'FULL BODY · FOUR',motto:'PRESS HEAVY',focus:'Quads & Delts',equipTags:['machine','barbell','dumbbell'],blocks:[
      BAR('Warm-up · 5–10 min cardio + dynamic circuit ×2'),
      X('A','Leg Press',4,'6–8','30X1 · feet flat'),
      X('B','Lateral Squat',3,'10–12 / side','2011 · hips back'),
      X('C','Overhead Press',4,'6–8','21X1 · press straight'),
      X('D','Leg Extension',3,'12–15','30X2'),
      X('E','Seated Lateral Raises',3,'10–12','20X1'),
      X('F','Incline Dumbbell Press',3,'10–12','20X1'),
    ]},
    liss:{banner:'LISS CARDIO',motto:'WALK IT OUT',focus:'Cardio',equipTags:['cardio'],cardio:true,blocks:[
      BAR('Low-intensity steady state'),
      X('A','Incline Walk',1,'20–45 min','~5 km/h (3 mph). Duration rises each week: 20→25→30→35→40→45 min'),
      X('B','Daily Steps',1,'Goal','Hit your weekly step target (see Today screen)'),
    ]},
  },
},

/* -------------------------------------------------- F/12 12 WEEK SHRED */
{
  id: 'f12',
  name: 'F/12 — 12 Week Shred',
  author: 'Flex Fitness',
  goals: ['lose','recomp'],
  equip: 'gym',
  weeks: 12,
  daysPerWeek: 5,
  level: 'All levels',
  blurb: '3 strength + 2 conditioning sessions per week, periodized in 3 blocks: Endurance (12–15) → Hypertrophy (8–12) → Strength (6–8). HIIT finishers torch fat.',
  phases:[{weeks:[0,1,2,3],name:'Phase 1 · Endurance'},{weeks:[4,5,6,7],name:'Phase 2 · Hypertrophy'},{weeks:[8,9,10,11],name:'Phase 3 · Strength'}],
  schedule(w,d){
    const p = w<4?1:w<8?2:3;
    const map=[`str${p}`,`con${p}`,`str${p}`,null,`str${p}`,`con${p}`,null];
    return map[d];
  },
  days:{
    str1:{banner:'STRENGTH · PHASE 1',motto:'ENDURE',focus:'Full Body · 12–15',equipTags:['barbell','dumbbell','kb','bench'],blocks:[
      BAR('Warm-up · foam roll + dynamic stretch'),
      X('A','BB Standing Shoulder Press',3,'12–15','45s rest'),
      X('B','BB Squat',3,'12–15','45s rest'),
      X('C','DB Chest Press',3,'12–15','45s rest'),
      X('D','BB Bent-Over Row',3,'12–15','45s rest'),
      X('E','DB Deadlift',3,'12–15','45s rest'),
      X('F','DB Lunge',3,'12–15 / leg','45s rest'),
      BAR('SUPERSET G — back-to-back'),
      X('G1','BB Bicep Curl',3,'12–15',''),
      X('G2','Bench Dips',3,'12–15',''),
      BAR('FINISHER H — superset'),
      X('H1','KB Swing',3,'15–20',''),
      X('H2','Med Ball Crunch',3,'15–20',''),
    ]},
    str2:{banner:'STRENGTH · PHASE 2',motto:'BUILD',focus:'Full Body · 8–12',equipTags:['barbell','dumbbell','kb','pullupbar'],blocks:[
      BAR('Warm-up · foam roll + dynamic stretch'),
      X('A','BB Clean',3,'8–12','60s · fast'),
      X('B','BB Front Squat',3,'8–12','60s'),
      X('C','Incline DB Chest Press',3,'8–12','60s'),
      X('D','Pull-Up / Lat Pulldown',3,'8–12','60s'),
      X('E','BB Deadlift',3,'8–12','60s'),
      X('F','BB Lunge',3,'8–12 / leg','60s'),
      BAR('SUPERSET G'),
      X('G1','DB Bicep Curl',3,'8–12',''),
      X('G2','Press-Up',3,'8–12',''),
      BAR('FINISHER H'),
      X('H1','KB Single-Arm Swing',3,'15–20 / arm','30s'),
      X('H2','Med Ball Kick',3,'16–20','30s'),
    ]},
    str3:{banner:'STRENGTH · PHASE 3',motto:'GET STRONG',focus:'Full Body · 6–8',equipTags:['barbell','dumbbell','kb','pullupbar'],blocks:[
      BAR('Warm-up · foam roll + dynamic stretch'),
      X('A','BB Clean & Press',3,'6–8','90s · fast'),
      X('B','BB Front Squat',3,'6–8','90s'),
      X('C','BB Chest Press',3,'6–8','90s'),
      X('D','Pull-Up / Lat Pulldown',3,'6–8','90s'),
      X('E','BB Romanian Deadlift',3,'6–8','90s'),
      X('F','DB Split Squat',3,'6–8 / leg','90s'),
      BAR('SUPERSET G'),
      X('G1','BB Reverse Bicep Curl',3,'6–8',''),
      X('G2','Tricep Press-Up',3,'6–8',''),
      BAR('FINISHER H'),
      X('H1','KB Alternating Swing',3,'15–20','30s'),
      X('H2','Med Ball Double Leg Lift',3,'15–20','30s'),
    ]},
    con1:{banner:'CONDITIONING · P1',motto:'BURN',focus:'HIIT',equipTags:['cardio','kb','bodyweight'],cardio:true,blocks:[
      BAR('Circuit · 6 sets · 20s work / 10s rest · AMRAP'),
      X('A','Treadmill Sprints',6,'20s',''),
      X('B','KB Swing',6,'20s',''),
      X('C','Mountain Climber',6,'20s',''),
      X('D','Squat Jump',6,'20s',''),
      X('E','Press-Ups',6,'20s',''),
      X('F','TRX Squat-to-Pull',6,'20s',''),
      X('G','DB Reverse Lunge',6,'20s',''),
      X('H','Bike Sprints',6,'20s',''),
    ]},
    con2:{banner:'CONDITIONING · P2',motto:'PUSH HARDER',focus:'HIIT',equipTags:['cardio','kb','bodyweight'],cardio:true,blocks:[
      BAR('Circuit · 8 sets · 20s work / 10s rest · AMRAP'),
      X('A','Treadmill Sprints',8,'20s',''),
      X('B','KB Swing',8,'20s',''),
      X('C','Mountain Climber',8,'20s',''),
      X('D','Squat Jump',8,'20s',''),
      X('E','Press-Ups',8,'20s',''),
      X('F','TRX Squat-to-Pull',8,'20s',''),
      X('G','DB Reverse Lunge',8,'20s',''),
      X('H','Bike Sprints',8,'20s',''),
    ]},
    con3:{banner:'CONDITIONING · P3',motto:'NO QUIT',focus:'HIIT',equipTags:['cardio','kb','bodyweight'],cardio:true,blocks:[
      BAR('Circuit · 8 sets · 20s work / 10s rest · AMRAP'),
      X('A','Incline Treadmill Sprints',8,'20s','5–10% grade'),
      X('B','KB Alternating Swing',8,'20s',''),
      X('C','Burpee',8,'20s',''),
      X('D','Tricep Press-Up',8,'20s',''),
      X('E','Lunge Jump',8,'20s',''),
      X('F','Rowing Sprints',8,'20s',''),
      X('G','X-Body Mountain Climber',8,'20s',''),
      X('H','Bike Sprints',8,'20s',''),
    ]},
  },
},

/* -------------------------------------------------- 8 WEEK SHRED (DB-friendly) */
{
  id: 'shred8',
  name: '8 Week Shred',
  author: "Gold's Gym",
  goals: ['lose'],
  equip: 'dumbbell',
  weeks: 8,
  daysPerWeek: 5,
  level: 'All levels',
  blurb: 'Two phases: Build the Base (heavy splits, weeks 1–4) then Trim the Fat (total-body circuits, weeks 5–8). Doable with dumbbells + a bench. Train every set near failure.',
  phases:[{weeks:[0,1,2,3],name:'Phase 1 · Build the Base'},{weeks:[4,5,6,7],name:'Phase 2 · Trim the Fat'}],
  schedule(w,d){
    if(w<4){ // Phase 1 — simple repeating split
      const map=['upper','lower','cardio','abs','upper','cardio',null];
      return map[d];
    }
    const map=['c1','c2','cardio2','c3','c4','cardio2',null];
    return map[d];
  },
  days:{
    upper:{banner:'UPPER BODY',motto:'BUILD THE BASE',focus:'Upper',equipTags:['dumbbell','machine','bodyweight','bench'],blocks:[
      X('A','Push-Ups',3,'20','Drop to knees to modify'),
      X('B','Seated DB Overhead Press',3,'10','Rotate palms out, press up'),
      X('C','Chest Fly',3,'10','Squeeze chest'),
      X('D','Chest Press',3,'8','Near failure'),
      X('E','Kneeling Tricep Kickback',3,'12','Elbow tight to side'),
      X('F','Lat Pulldown',3,'10','Pull to chest'),
      X('G','Tricep Dips',3,'8','Bench dips'),
      X('H','Seated Upright Row',3,'10','Squeeze shoulder blades'),
      X('I','Seated Bicep Curls',3,'10','Palms in at top'),
      X('J','Rear Delt Fly',3,'10','Push back, slight bend'),
    ]},
    lower:{banner:'LOWER BODY',motto:'LEG DAY LAW',focus:'Lower',equipTags:['dumbbell','barbell','machine','bodyweight'],blocks:[
      X('A','Weighted Walking Lunges',4,'18','Both legs = 1 rep'),
      X('B','Leg Press',4,'10','Constant tension'),
      X('C','Dumbbell Sumo Squats',4,'10','Wide stance, toes out'),
      X('D','Barbell Deadlifts',4,'8','Flat back, tap floor'),
      X('E','Leg Extensions',4,'10',''),
      X('F','Back Extensions',4,'10','Return to neutral only'),
      X('G','Hamstring Curls',4,'10','Heels to glutes'),
      X('H','Calf Raises',4,'20','Hold 3s at top'),
    ]},
    abs:{banner:'ABS & CARDIO',motto:'CORE OF STEEL',focus:'Core',equipTags:['dumbbell','bodyweight'],blocks:[
      BAR('Add 30–45 min cardio after'),
      X('A','Bicycles',4,'10','Both sides = 1 rep'),
      X('B','Incline Sit-Ups',4,'10','Arms crossed on chest'),
      X('C','Exercise Ball Crunches',4,'25','Lower back on ball'),
      X('D','Dumbbell Side Bends',4,'20','Side to side'),
      X('E','Leg Lifts',4,'10','No arching'),
      X('F','Exercise Ball Pikes',4,'10','Pike to inverted V'),
    ]},
    cardio:{banner:'CARDIO',motto:'TALK-TEST PACE',focus:'Cardio',equipTags:['cardio'],cardio:true,blocks:[
      BAR('Always 5-min warm-up + cool-down'),
      X('A','Steady Cardio',1,'45 min','Incline walk / bike / elliptical / stairs'),
      X('B','— or — Jog',1,'30 min','Treadmill'),
      X('C','— or — Run/Walk Intervals',3,'Circuit','Walk 4m · run 1m fast · walk 3m · run 2m @80% · walk 2m · run 4m moderate'),
    ]},
    /* Phase 2 circuits — 4 rounds each */
    c1:{banner:'CIRCUIT 1',motto:'TRIM THE FAT',focus:'Total Body',equipTags:['dumbbell','bodyweight','bench'],blocks:[
      BAR('4 rounds · minimal rest'),
      X('A','Standing DB Overhead Press',4,'15',''),
      X('B','Butt Kicks',4,'30','Each heel = 1'),
      X('C','Push-Ups',4,'20',''),
      X('D','Ball DB Chest Press',4,'18','Hips in tabletop'),
      X('E','Ball Tricep Kickback',4,'15',''),
    ]},
    c2:{banner:'CIRCUIT 2',motto:'KEEP MOVING',focus:'Total Body',equipTags:['dumbbell','bodyweight'],blocks:[
      BAR('4 rounds · minimal rest'),
      X('A','DB Squat + Overhead Press',4,'15','Press on the way up'),
      X('B','Bodyweight Walking Lunges',4,'25','Both legs = 1'),
      X('C','Jump Squats',4,'18','Land soft'),
      X('D','Ball Hamstring Curls',4,'10','Hips up'),
      X('E','Bridge',4,'10','Squeeze 3s at top'),
    ]},
    c3:{banner:'CIRCUIT 3',motto:'EARN THE SWEAT',focus:'Core + Cardio',equipTags:['dumbbell','bodyweight','bench'],blocks:[
      BAR('4 rounds · minimal rest'),
      X('A','Plank',4,'3×30 sec','Rest between holds'),
      X('B','Bicycles',4,'10','Both sides = 1'),
      X('C','Burpees',4,'25','Knees-down push-up OK'),
      X('D','Single-Leg DB Side Bends',4,'20','Balance on one foot'),
      X('E','Exercise Ball Pikes',4,'10',''),
    ]},
    c4:{banner:'CIRCUIT 4',motto:'FINISH IT',focus:'Total Body',equipTags:['bodyweight','pullupbar','dumbbell'],blocks:[
      BAR('4 rounds · minimal rest'),
      X('A','Ice Skaters',4,'25','Both legs = 1'),
      X('B','Pull-Ups',4,'12','Jump up + slow lower if needed'),
      X('C','Side Plank',4,'3×15 sec','Drop knee to modify'),
      X('D','Single-Leg Calf Raises',4,'25','Add DBs to progress'),
      X('E','Side Lunge',4,'18',''),
    ]},
    cardio2:{banner:'CARDIO · P2',motto:'HIIT IT',focus:'Cardio',equipTags:['cardio','bodyweight'],cardio:true,blocks:[
      BAR('Always 5-min warm-up + cool-down'),
      X('A','Steady Cardio',1,'30 min','Incline walk / bike / elliptical / stairs'),
      X('B','— or — HIIT',6,'Circuit','Jump rope 1m · rest 30s · 30 burpees · rest 30s · 30 jump squats · rest 1m · 30 jacks · rest 2m'),
    ]},
  },
},

/* -------------------------------------------------- GROWTH · 10 WK BODYBUILDING */
{
  id: 'growth',
  name: 'GROWTH — 10 Week Bodybuilding',
  author: 'Hannah Eden (HEF)',
  goals: ['gain','recomp'],
  equip: 'gym',
  weeks: 10,
  daysPerWeek: 5,
  level: 'Intermediate',
  blurb: 'Pure hypertrophy. A 5-day body-part split where every working set is 10 reps — and each week changes the rep STYLE (conventional → slow eccentric → 3s pause → pulsing → re-test) to hit the muscle a new way. Exercises switch for Phase 2.',
  phases:[{weeks:[0,1,2,3,4],name:'Phase 1 · Weeks 1–5'},{weeks:[5,6,7,8,9],name:'Phase 2 · Weeks 6–10'}],
  // signature mechanic: the week dictates HOW you do every rep
  repStyles:[
    {name:'Conventional · Test',detail:'Normal reps. Go heavy, log every set + how it felt — this is your baseline.'},
    {name:'Slow Eccentric',detail:'3-second lowering on every rep. Max time under tension.'},
    {name:'3-Second Pause',detail:'Pause 3s at the mid-point of every rep. Kills momentum.'},
    {name:'Pulsing',detail:'Stay in the middle of the range and pulse. Constant tension, max fatigue.'},
    {name:'Conventional · Re-Test',detail:'Repeat test week as heavy as possible — beat your Week 1 notes.'},
    {name:'Conventional · Test',detail:'New phase, new lifts. Establish your Phase 2 baseline.'},
    {name:'Slow Eccentric',detail:'3-second lowering on every rep.'},
    {name:'3-Second Pause',detail:'Pause 3s at the mid-point of every rep.'},
    {name:'Pulsing',detail:'Pulse in the middle of the range.'},
    {name:'Conventional · Re-Test',detail:'Final test — go heavier than Week 6.'},
  ],
  // Mon Legs · Tue Chest · Wed Back · Thu rest · Fri Posterior · Sat Sh+Arms · Sun rest
  schedule(w,d){
    const p = w<5?1:2;
    const map=[`p${p}legs`,`p${p}chest`,`p${p}back`,null,`p${p}post`,`p${p}arms`,null];
    return map[d];
  },
  days:{
    /* ---- Phase 1 ---- */
    p1legs:{banner:'DAY 1 · LEGS',motto:'EARN YOUR LEGS',focus:'Legs · all sets ×10',equipTags:['barbell','machine','dumbbell'],blocks:[
      BAR('Warm-up · dynamic + 2–3 light sets of the first lift'),
      X('1','Trap Bar Deadlifts',4,'10','Rest 1–2 min'),
      X('2','Barbell Back Squats',4,'10',''),
      X('3','High Box Step-Ups',3,'10 / leg',''),
      X('4','Leg Extensions',3,'10',''),
      X('5','Seated → Standing Calf Raises',3,'10',''),
    ]},
    p1chest:{banner:'DAY 2 · CHEST',motto:'BUILD THE ARMOR',focus:'Chest · all sets ×10',equipTags:['barbell','dumbbell','cable','bodyweight'],blocks:[
      BAR('Warm-up · dynamic + 2–3 light sets of the first lift'),
      X('1','Barbell Flat Bench Press',4,'10',''),
      X('2','Incline Dumbbell Chest Press',4,'10',''),
      X('3','Incline Push-Ups',3,'10',''),
      X('4','Standing Cable Flys',3,'10',''),
      X('5','Dumbbell Pull-Overs',3,'10',''),
    ]},
    p1back:{banner:'DAY 3 · BACK',motto:'WIDEN THE WINGS',focus:'Back · all sets ×10',equipTags:['cable','machine','dumbbell','pullupbar'],blocks:[
      BAR('Warm-up · dynamic + 2–3 light sets of the first lift'),
      X('1','Wide-Grip Lat Pulldown',4,'10',''),
      X('2','Cable Seated Row',4,'10',''),
      X('3','Inverted Incline DB Row',3,'10',''),
      X('4','Chin-Ups',3,'10',''),
      X('5','Standing Cable Reverse Flys',3,'10',''),
    ]},
    p1post:{banner:'DAY 4 · POSTERIOR CHAIN',motto:'POSTERIOR POWER',focus:'Glutes & Hams · all ×10',equipTags:['barbell','dumbbell','kb','cable','band'],blocks:[
      BAR('Warm-up · dynamic + 2–3 light sets of the first lift'),
      X('1','Barbell Hip Thrusts',4,'10',''),
      X('2','Stiff-Leg DB/KB Deadlift',4,'10',''),
      X('3','DB/KB Bulgarian Split Squat',3,'10 / leg',''),
      X('4','Standing Cable Kickback',3,'10 / side',''),
      X('5','Banded Frog Pumps',3,'10–30','Reps rise weekly: 10·15·20·20·30'),
    ]},
    p1arms:{banner:'DAY 5 · SHOULDERS + ARMS',motto:'BOULDERS & GUNS',focus:'Delts & Arms · all ×10',equipTags:['dumbbell','cable'],blocks:[
      BAR('Warm-up · dynamic + 2–3 light sets of the first lift'),
      X('1','DB Seated Shoulder Press',4,'10',''),
      X('2','Seated DB Hammer Curl',4,'10',''),
      X('3','DB Upright Row',3,'10',''),
      X('4','Standing DB Lateral Raises',3,'10',''),
      X('5','Laying Face Pulls',3,'10',''),
    ]},
    /* ---- Phase 2 (new exercises) ---- */
    p2legs:{banner:'DAY 1 · LEGS',motto:'NO WEAK LINKS',focus:'Legs · all sets ×10',equipTags:['barbell','machine'],blocks:[
      BAR('Warm-up · dynamic + 2–3 light sets of the first lift'),
      X('1','Sumo-Stance Barbell Deadlift',4,'10',''),
      X('2','Barbell Front Squat',4,'10',''),
      X('3','Lateral Box Step-Up',3,'10 / leg',''),
      X('4','Heels-Elevated Squat',3,'10',''),
      X('5','Standing Calf Raises',3,'10',''),
    ]},
    p2chest:{banner:'DAY 2 · CHEST',motto:'FORGE THE PLATE',focus:'Chest · all sets ×10',equipTags:['dumbbell','barbell','cable','band','bodyweight'],blocks:[
      BAR('Warm-up · dynamic + 2–3 light sets of the first lift'),
      X('1','DB Flat Bench Press',4,'10',''),
      X('2','Incline Barbell Chest Press',4,'10',''),
      X('3','Decline Push-Ups',3,'10',''),
      X('4','Low-to-High Cable Chest Fly',3,'10',''),
      X('5','Resistance Band Pull-Over',3,'10',''),
    ]},
    p2back:{banner:'DAY 3 · BACK',motto:'BUILD THE BEAM',focus:'Back · all sets ×10',equipTags:['cable','machine','barbell','dumbbell','pullupbar'],blocks:[
      BAR('Warm-up · dynamic + 2–3 light sets of the first lift'),
      X('1','Narrow Neutral-Grip Lat Pulldown',4,'10',''),
      X('2','Single-Arm Bent-Over Row',4,'10 / side',''),
      X('3','Bent-Over Barbell Row',3,'10',''),
      X('4','Pull-Ups',3,'10',''),
      X('5','Seated Bent-Over DB Reverse Flys',3,'10',''),
    ]},
    p2post:{banner:'DAY 4 · POSTERIOR CHAIN',motto:'HINGE & CONQUER',focus:'Glutes & Hams · all ×10',equipTags:['barbell','cable','band'],blocks:[
      BAR('Warm-up · dynamic + 2–3 light sets of the first lift'),
      X('1','Banded Barbell Hip Thrusts',4,'10',''),
      X('2','Stiff-Leg Wide-Stance Deadlifts',4,'10',''),
      X('3','Barbell Bulgarian Split Squat',3,'10 / leg',''),
      X('4','Kneeling Cable Kickback',3,'10 / side',''),
      X('5','Banded Frog Pumps',3,'35–55','Reps rise weekly: 35·40·45·50·55'),
    ]},
    p2arms:{banner:'DAY 5 · SHOULDERS + ARMS',motto:'STEEL & THUNDER',focus:'Delts & Arms · all ×10',equipTags:['cable','barbell'],blocks:[
      BAR('Warm-up · dynamic + 2–3 light sets of the first lift'),
      X('1','Cable Standing Shoulder Press',4,'10',''),
      X('2','Standing High Cable Curls',4,'10',''),
      X('3','Barbell Upright Row',3,'10',''),
      X('4','Cable Lateral Raises',3,'10',''),
      X('5','Standing Cable Face Pulls',3,'10',''),
    ]},
  },
},
];

/* ============================================================================
   COACH'S TUNING — universal, evidence-based programming applied on TOP of every
   packet, so each plan is optimized the same way (rest / tempo / progression),
   not limited to whatever a single PDF happened to specify.
   ========================================================================== */
const REST_RULE = 'Compounds: heavy ≤6 reps → 2–3 min · 8–12 → 90s. Isolation/accessory → 45–75s. Supersets & circuits → minimal, rest after the pair.';
const OVERLOAD = 'Double progression: stay at a weight until you hit the TOP of the rep range on every set with clean form, then add the smallest increment (2.5–5 lb) and rebuild. Log it here so you always beat last time.';
const TUNING = {
  growth: {
    rest: REST_RULE,
    tempo: 'Controlled ~2–3s lowering on every rep — except the week\'s rep-style (slow-eccentric / pause / pulse) overrides it. That weekly style is your intensity, so respect it.',
    progression: 'Push the first two lifts (your 4×10) hardest. ' + OVERLOAD + ' On Test / Re-Test weeks go genuinely heavy and beat your logged numbers.',
    notes: [
      'Take your last 1–2 sets to within ~1–2 reps of failure — that\'s where growth lives.',
      'Add 8–10 min of zone-2 cardio on rest days to stay lean while gaining.',
    ],
  },
  transform12: {
    rest: REST_RULE + ' (PDF only said 1–2 min — bumped for the heavy descending sets.)',
    tempo: 'Lower under control (2–3s), drive up with intent. Descending reps (15·12·10·8) mean you ADD weight each set — not keep it the same.',
    progression: OVERLOAD + ' Even weeks: repeat the prior week or swap a few lifts to keep the stimulus fresh.',
    notes: [
      'Hit AMRAP sets ~1–2 reps shy of failure so form holds.',
      'Added direct arm work on the Quads/Calves day the PDF left thin — arms now get balanced volume across the week.',
      'Rotate the split every 2 weeks as written; the variety is the point.',
    ],
  },
  gbb6: {
    rest: 'As written: 60–90s — take a full 2 min on the heavy 6–8-rep weeks (4–6).',
    tempo: 'Follow the 4-digit tempo (e.g. 30X1 = 3s down, explode up) — controlled tempo is the whole design of this plan. Tempo over ego.',
    progression: OVERLOAD + ' Only add load once you own the full range WITH the prescribed tempo.',
    notes: [
      'Steps + LISS rise every week — that rising NEAT is your fat-loss lever, not extra lifting.',
      'Weeks 4–6 drop compounds to 6–8 reps: go meaningfully heavier.',
    ],
  },
  f12: {
    rest: 'P1 45s · P2 60s · P3 90s (rest grows as reps drop). Finishers/supersets stay short.',
    tempo: 'Controlled reps on the main work; keep the KB swings & med-ball finishers fast and powerful.',
    progression: 'Add load every phase as the rep range drops (12–15 → 8–12 → 6–8). The PDF leaves the weight column blank — log yours and beat it. ' + OVERLOAD,
    notes: [
      'The same template runs 3×/week — DON\'T do three identical days. Make one Heavy, one Moderate, one Rep-focus (undulating) so each session adds something.',
      'Keep the 2 HIIT days — the strength + conditioning combo is what shreds.',
    ],
  },
  shred8: {
    rest: 'Phase 1 (heavy): compounds 90s–2 min, isolation ~60s. Phase 2 circuits: minimal rest, rest after each round.',
    tempo: 'Controlled reps; hold the 3-second squeeze on calves, bridges and planks.',
    progression: 'Phase 1: train every set near failure — if you finish the reps with gas left, add weight next time. Phase 2: progress by adding rounds / cutting rest (density). ' + OVERLOAD,
    notes: [
      'Phase 1 builds the muscle, Phase 2 strips the fat — don\'t skip the heavy phase.',
      'Runs on dumbbells + a bench; swap any machine move with ↺.',
      'Fixed the source\'s leg-curl / leg-extension mix-up so quads and hams are both covered.',
    ],
  },
};
PROGRAMS.forEach(p => { p.tuning = TUNING[p.id]; });

/* ============================================================================
   EXERCISE LIBRARY — for the trainer's "swap" feature.
   Grouped by movement pattern; each move tagged with equipment needed.
   ========================================================================== */
const SWAPS = {
  'Quads / Squat': [
    {n:'Barbell Back Squat',e:['barbell']},{n:'Front Squat',e:['barbell']},
    {n:'Goblet Squat',e:['dumbbell']},{n:'Dumbbell Squat',e:['dumbbell']},
    {n:'Bulgarian Split Squat',e:['dumbbell','bodyweight']},{n:'Leg Press',e:['machine']},
    {n:'Hack Squat',e:['machine']},{n:'Leg Extension',e:['machine']},
    {n:'Walking Lunges',e:['dumbbell','bodyweight']},{n:'Wall Sit',e:['bodyweight']},
    {n:'Jump Squat',e:['bodyweight']},{n:'Banded Squat',e:['band']},
  ],
  'Hamstrings / Hinge': [
    {n:'Barbell RDL',e:['barbell']},{n:'Dumbbell RDL',e:['dumbbell']},
    {n:'Hip Thrust',e:['barbell','dumbbell']},{n:'Glute Bridge',e:['bodyweight','dumbbell']},
    {n:'Seated Leg Curl',e:['machine']},{n:'Hamstring Curl',e:['machine']},
    {n:'Hyperextension',e:['bench','bodyweight']},{n:'Good Morning',e:['barbell']},
    {n:'Banded Good Morning',e:['band']},{n:'Single-Leg Glute Bridge',e:['bodyweight']},
  ],
  'Vertical Push': [
    {n:'Overhead Press',e:['barbell']},{n:'Seated DB Press',e:['dumbbell']},
    {n:'Arnold Press',e:['dumbbell']},{n:'Lateral Raise',e:['dumbbell']},
    {n:'Cable Lateral Raise',e:['cable']},{n:'Banded Overhead Press',e:['band']},
    {n:'Pike Push-Up',e:['bodyweight']},{n:'Front Raise',e:['dumbbell']},
  ],
  'Horizontal Push': [
    {n:'Flat Bench Press',e:['barbell','bench']},{n:'Incline DB Press',e:['dumbbell','bench']},
    {n:'DB Chest Press',e:['dumbbell','bench']},{n:'Chest Press Machine',e:['machine']},
    {n:'Cable Fly',e:['cable']},{n:'Push-Up',e:['bodyweight']},
    {n:'Diamond Push-Up',e:['bodyweight']},{n:'Banded Chest Press',e:['band']},
  ],
  'Vertical Pull': [
    {n:'Pull-Up',e:['pullupbar']},{n:'Chin-Up',e:['pullupbar']},
    {n:'Lat Pulldown',e:['machine','cable']},{n:'Straight-Arm Pulldown',e:['cable']},
    {n:'Single-Arm DB Row',e:['dumbbell']},{n:'Banded Pulldown',e:['band']},
  ],
  'Horizontal Pull': [
    {n:'Barbell Row',e:['barbell']},{n:'Cable Row',e:['cable','machine']},
    {n:'Single-Arm DB Row',e:['dumbbell']},{n:'T-Bar Row',e:['barbell']},
    {n:'Face Pull',e:['cable']},{n:'Rear Delt Fly',e:['dumbbell']},
    {n:'Inverted Row',e:['bodyweight']},{n:'Banded Row',e:['band']},
  ],
  'Biceps': [
    {n:'Barbell Curl',e:['barbell']},{n:'Dumbbell Curl',e:['dumbbell']},
    {n:'Hammer Curl',e:['dumbbell']},{n:'Cable Curl',e:['cable']},
    {n:'Preacher Curl',e:['barbell','dumbbell']},{n:'Banded Curl',e:['band']},
    {n:'Chin-Up',e:['pullupbar']},
  ],
  'Triceps': [
    {n:'Skull Crusher',e:['barbell','dumbbell']},{n:'Rope Pushdown',e:['cable']},
    {n:'Overhead Extension',e:['dumbbell']},{n:'Bench Dips',e:['bench','bodyweight']},
    {n:'Bar Dips',e:['pullupbar','bodyweight']},{n:'Diamond Push-Up',e:['bodyweight']},
    {n:'Banded Pushdown',e:['band']},{n:'Kickback',e:['dumbbell']},
  ],
  'Core': [
    {n:'Plank',e:['bodyweight']},{n:'Hanging Knee Raise',e:['pullupbar']},
    {n:'Leg Raise',e:['bodyweight']},{n:'Bicycle Crunch',e:['bodyweight']},
    {n:'Russian Twist',e:['bodyweight','dumbbell']},{n:'Cable Crunch',e:['cable']},
    {n:'Side Plank',e:['bodyweight']},{n:'Mountain Climber',e:['bodyweight']},
  ],
};

/* ============================================================================
   NUTRITION — calculators + targets straight from the guides
   ========================================================================== */
const NUTRITION = {
  /* Mifflin–St Jeor BMR (recommended in Gains By Brains) */
  bmr({sex, kg, cm, age}){
    const base = 10*kg + 6.25*cm - 5*age;
    return Math.round(sex==='male' ? base+5 : base-161);
  },
  activityFactors: {
    sedentary:{f:1.2,  label:'Sedentary (desk job, little exercise)'},
    light:    {f:1.375,label:'Lightly active (1–3 workouts/wk)'},
    moderate: {f:1.55, label:'Moderately active (3–5 workouts/wk)'},
    very:     {f:1.725,label:'Very active (6–7 workouts/wk)'},
  },
  /* goal -> calorie + macro strategy, sourced from the packets */
  targets({goal, tdee, lb}){
    let cals, note, proteinPerLb, fatPct;
    if(goal==='lose'){
      cals = Math.round(tdee*0.80);                 // ~20% deficit
      proteinPerLb = 1.0;                            // GBB: up to ~1g/lb dieting
      fatPct = 0.25;
      note = '~20% deficit. Aim to lose 1–2 lb / week. Protein high to hold muscle.';
    } else if(goal==='gain'){
      cals = Math.round(tdee + 300);                // Lean Bulk: +200–400
      proteinPerLb = 1.05;                           // ~2.3 g/kg
      fatPct = 0.30;
      note = '+300 kcal lean-bulk surplus (golden rule: +200–400). Expect ~0.5 lb/week.';
    } else if(goal==='recomp'){
      cals = Math.round(tdee);                       // maintenance
      proteinPerLb = 1.1;
      fatPct = 0.28;
      note = 'Eat at maintenance, push protein + progressive overload to recomp slowly.';
    } else {
      cals = Math.round(tdee);
      proteinPerLb = 0.9;
      fatPct = 0.30;
      note = 'Balanced maintenance for general health & performance.';
    }
    const protein = Math.round(lb*proteinPerLb);
    const fat = Math.round((cals*fatPct)/9);
    const carbs = Math.round((cals - protein*4 - fat*9)/4);
    return { cals, protein, fat, carbs:Math.max(carbs,0), note,
             fiber: goal==='gain'?30:25, water: goal==='gain'?3.0:2.0 };
  },
  rules: {
    lose:[
      'Sustained calorie deficit drives fat loss — no single food does it.',
      'Protein every meal (palm-size). Fill half your plate with veg for satiety.',
      'Weigh in 1×/week, same time. Target 0.5–2 lb down per week.',
      'One free meal a week keeps you sane — 80/20 rule.',
    ],
    gain:[
      '5 Golden Rules: +200–400 kcal · hit protein · progressive overload · 3 L water · 8–9 h sleep.',
      'Protein target is non-negotiable; carb-to-fat ratio is flexible (≈40/30/30).',
      'A little fat gain is normal on a lean bulk — that means you\'re eating enough.',
      '30 g+ fiber a day to keep digestion happy on higher calories.',
    ],
    recomp:[
      'Eat around maintenance; let the scale stay flat while strength climbs.',
      'Keep protein very high (~1.1 g/lb) to build while staying lean.',
      'Judge progress by the mirror, photos and lifts — not just the scale.',
    ],
    general:[
      'Mostly whole foods, plenty of protein and veg, stay hydrated.',
      'Move daily — aim for 8–10k steps.',
      'Consistency beats perfection.',
    ],
  },
};

/* ============================================================================
   RECIPE / MEAL LIBRARY — pulled from the guides (per-serving macros)
   tag: cut | bulk | any   ·   meal: breakfast | lunch | dinner | snack
   ========================================================================== */
const RECIPES = [
  // Gains By Brains (fat-loss friendly)
  {n:'Turkish Eggs (Cilbir)',meal:'breakfast',tag:'cut',cal:390,p:28,c:11,f:26,src:'Gains By Brains'},
  {n:'Yogurt Oat Vanilla Pancakes',meal:'breakfast',tag:'cut',cal:308,p:12,c:47,f:8,src:'Gains By Brains'},
  {n:'Avocado Egg Salad on Toast',meal:'breakfast',tag:'cut',cal:377,p:17,c:30,f:21,src:'Gains By Brains'},
  {n:'Matcha Chia Pudding',meal:'breakfast',tag:'cut',cal:384,p:10,c:41,f:20,src:'Gains By Brains'},
  {n:'Garlic Parmesan Shrimp & Broccoli',meal:'lunch',tag:'cut',cal:234,p:26,c:10,f:10,src:'Gains By Brains'},
  {n:'Grilled Chicken & Asparagus Pesto Pasta',meal:'lunch',tag:'cut',cal:433,p:22,c:48,f:17,src:'Gains By Brains'},
  {n:'Creamy Zucchini Potato Soup',meal:'lunch',tag:'cut',cal:381,p:25,c:32,f:17,src:'Gains By Brains'},
  {n:'Cheesy Herby Chicken Caprese w/ Rice',meal:'dinner',tag:'cut',cal:441,p:40,c:59,f:5,src:'Gains By Brains'},
  {n:'Green Goddess Salad',meal:'dinner',tag:'cut',cal:432,p:17,c:19,f:32,src:'Gains By Brains'},
  {n:'Roasted Chickpea Salad w/ Chicken',meal:'dinner',tag:'cut',cal:547,p:46,c:24,f:45,src:'Gains By Brains'},
  {n:'Honey Vanilla Blueberry Frozen Yogurt',meal:'snack',tag:'cut',cal:272,p:20,c:48,f:0,src:'Gains By Brains'},
  {n:'Creamy Avocado Deviled Eggs',meal:'snack',tag:'cut',cal:337,p:20,c:8,f:25,src:'Gains By Brains'},
  {n:'Breakfast Cookies (×16)',meal:'snack',tag:'any',cal:159,p:5,c:19,f:7,src:'Gains By Brains'},
  // Lean Bulking (high-calorie)
  {n:'Cheesy Beef Bulking Omelette',meal:'breakfast',tag:'bulk',cal:811,p:62,c:7,f:58,src:'Lean Bulking'},
  {n:'Spicy Chorizo Breakfast Hash',meal:'breakfast',tag:'bulk',cal:837,p:46,c:78,f:34,src:'Lean Bulking'},
  {n:'Big Boy Breakfast Burrito',meal:'breakfast',tag:'bulk',cal:895,p:52,c:78,f:34,src:'Lean Bulking'},
  {n:'Crispy Bulk-Up Protein Waffles',meal:'breakfast',tag:'bulk',cal:849,p:65,c:88,f:27,src:'Lean Bulking'},
  {n:'Chocolate & Banana Pancakes',meal:'breakfast',tag:'bulk',cal:887,p:43,c:104,f:23,src:'Lean Bulking'},
  {n:'Fully Loaded Breakfast Bagel',meal:'breakfast',tag:'bulk',cal:757,p:50,c:56,f:41,src:'Lean Bulking'},
  // 8 Week Shred meal options (approx, clean)
  {n:'Oats + Blueberries & Scrambled Eggs',meal:'breakfast',tag:'cut',cal:380,p:25,c:40,f:12,src:'8 Week Shred'},
  {n:'Burrito Bowl (chicken, rice, beans)',meal:'lunch',tag:'any',cal:520,p:40,c:45,f:18,src:'8 Week Shred'},
  {n:'Whole-Grain Turkey & Avocado Sandwich',meal:'lunch',tag:'any',cal:450,p:30,c:42,f:16,src:'8 Week Shred'},
  {n:'Grilled Sirloin, Potato & Peppers',meal:'dinner',tag:'any',cal:520,p:42,c:35,f:20,src:'8 Week Shred'},
  {n:'Salmon, Asparagus & Sweet Potato',meal:'dinner',tag:'cut',cal:480,p:38,c:34,f:20,src:'8 Week Shred'},
  {n:'Turkey Burger (whole-grain bun)',meal:'dinner',tag:'any',cal:500,p:38,c:38,f:20,src:'8 Week Shred'},
  {n:'Apple + 2 tbsp Peanut Butter',meal:'snack',tag:'any',cal:280,p:8,c:30,f:16,src:'8 Week Shred'},
  {n:'Spicy Oven-Roasted Chickpeas',meal:'snack',tag:'cut',cal:230,p:10,c:30,f:8,src:'8 Week Shred'},
];

/* expose to app */
window.FITDATA = { PROGRAMS, SWAPS, EQUIP, NUTRITION, RECIPES };
})();
