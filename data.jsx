/* Vera Sung — site data.
   Voice rules from the design system:
     - lowercase, fragmentary
     - no marketing language, no imperatives, no "you"
     - en-dash for ranges, sentence-case prose
     - tracked ALL-CAPS only on labels (not in this file — applied in CSS)
*/

/* Tone gradients used where no real photograph exists yet. Same palette as
   the design system's Photo placeholder. Each tone is intentional, not random. */
const PHOTO_TONES = {
  shore:    'linear-gradient(160deg, rgba(28,24,20,0) 0%, rgba(28,24,20,.5) 100%), linear-gradient(20deg, #C9C0AE 0%, #6B6359 55%, #1F1B16 100%)',
  portrait: 'linear-gradient(180deg, rgba(28,24,20,0) 0%, rgba(28,24,20,.35) 80%), linear-gradient(10deg, #B4AB9B 0%, #5F564B 55%, #2A2620 100%)',
  paper:    'linear-gradient(180deg, #D8CFBC 0%, #9A9183 80%, #6B6359 100%)',
  water:    'linear-gradient(170deg, #C9C0AE 0%, #6B6359 70%, #2A2620 100%)',
  hands:    'linear-gradient(200deg, rgba(28,24,20,0) 0%, rgba(28,24,20,.4) 100%), linear-gradient(40deg, #BFB6A2 0%, #7A7264 60%, #2A2620 100%)',
  stillife: 'linear-gradient(180deg, #E5DDCB 0%, #A89E89 70%, #36302A 100%)',
  light:    'linear-gradient(165deg, #ECE3D2 0%, #BFB6A2 50%, #5F564B 100%)',
  shadow:   'linear-gradient(180deg, rgba(28,24,20,.0) 0%, rgba(28,24,20,.85) 100%), linear-gradient(20deg, #8A8174 0%, #3C3630 100%)',
  window:   'linear-gradient(90deg, rgba(28,24,20,.55) 0%, rgba(28,24,20,.1) 50%, rgba(28,24,20,.6) 100%), linear-gradient(180deg, #C9C0AE 0%, #5F564B 100%)',
  field:    'linear-gradient(180deg, #C9C0AE 0%, #8A8174 50%, #36302A 100%)',
  ink:      'linear-gradient(180deg, #2b2823 0%, #131210 100%)',
  bruise:   'linear-gradient(170deg, #6e5f5a 0%, #4a403c 60%, #2a2422 100%)',
};

/* ------------------------- HOME plates ------------------------- */
const HOME_PLATES = [
  { n: "I",   place: "BRITTANY · 2023",    src: "assets/drifting-01.jpg", aspect: "3/2", cap: "the figure, the wide tide.",      meta: "35mm · low tide" },
  { n: "II",  place: "STUDIO · 2023",      src: "assets/practice-01.jpg", aspect: "21/9", cap: "three positions, a rehearsal.",  meta: "paris · 11.2023" },
  { n: "III", place: "STUDIO · 2023",      src: "assets/practice-02.jpg", aspect: "16/9", cap: "turning away.",                    meta: "paris · 12.2023" },
];

/* ------------------------- Photographic projects ------------------------- */
const PROJECTS = [
  {
    id: "passage",
    no: "I",
    title: "passage",
    years: "2022 — 2024",
    place: "brittany / normandy",
    medium: "digital photography",
    epigraph: "a passage is not a place — it is the slow consent of one place to become another.",
    intro: "made between two coastlines. the body crosses thresholds — tide-lines, the long flat sand, the held breath between places. the series resists arrival.",
    /* The Passage sequence is hand-composed, not cycled. The component
       PassageSequence reads this array verbatim. */
    sequence: [
      { src: "assets/passage-01.jpg", n: "I",    y: "baie du mont-saint-michel · 2023", extraGap: 120 },
      { src: "assets/passage-10.jpg", n: "II",   y: "baie du mont-saint-michel · 2023" },
      { src: "assets/passage-11.jpg", n: "III",  y: "baie du mont-saint-michel · 2023" },
      { src: "assets/passage-04.jpg", n: "IV",   y: "baie du mont-saint-michel · 2023" },
      { src: "assets/passage-06.jpg", n: "V",    y: "baie du mont-saint-michel · 2023" },
      { src: "assets/passage-09.jpg", n: "VI",   y: "baie du mont-saint-michel · 2023" },
      { src: "assets/passage-07.jpg", n: "VII",  y: "baie du mont-saint-michel · 2023" },
      { src: "assets/passage-05.jpg", n: "VIII", y: "baie du mont-saint-michel · 2023" },
      { src: "assets/passage-08.jpg", n: "IX",   y: "normandy · 2024" },
      { src: "assets/passage-02.jpg", n: "X",    y: "normandy · 2023" },
      { src: "assets/passage-03.jpg", n: "XI",   y: "normandy · 2024" },
    ],
    plates: [], // legacy — unused for passage
  },
  {
    id: "night-walks",
    no: "II",
    title: "night walks",
    years: "2023 — ongoing",
    place: "taipei / paris",
    medium: "digital photography, after dark",
    epigraph: "to walk at night is to listen with the eyes.",
    intro: "photographs made between midnight and the first light. streets emptied of their daytime selves; the body moves slowly through them, looking for nothing in particular.",
    sequence: [
      { src: "assets/night-walks-01.jpg", n: "I",    y: "wilson · 2023" },
      { src: "assets/night-walks-02.jpg", n: "II",   y: "wilson · 2023" },
      { src: "assets/night-walks-03.jpg", n: "III",  y: "wilson · 2023" },
      { src: "assets/night-walks-04.jpg", n: "IV",   y: "wilson · 2023" },
      { src: "assets/night-walks-05.jpg", n: "V",    y: "wilson · 2023", extraGap: 200 },
      { src: "assets/night-walks-06.jpg", n: "VI",   y: "wilson · 2023" },
      { src: "assets/night-walks-07.jpg", n: "VII",  y: "wilson · 2023" },
      { src: "assets/night-walks-08.jpg", n: "VIII", y: "wilson · 2023" },
      { src: "assets/night-walks-09.jpg", n: "IX",   y: "wilson · 2023", extraGap: 200 },
      { src: "assets/night-walks-10.jpg", n: "X",    y: "wilson · 2023" },
    ],
    plates: [],
  },
  {
    id: "practice",
    no: "III",
    title: "a practice without objects",
    years: "2021 — ongoing",
    place: "studio, paris",
    medium: "digital photography, triptychs",
    epigraph: "nothing is held. something is offered.",
    intro: "a continuing study of gesture, in the absence of props. the body addresses an empty room; the room answers in shadow. each photograph is a frame from a private rehearsal — for which there is no audience, and no object.",
    /* Bespoke editorial sequence. */
    sequence: [
      { src: "assets/practice-04.jpg", n: "I", y: "studio · 2023" },
      /* A triptych — three positions, side by side. Breaks out wider than
         the column so each frame reads larger. */
      { kind: "triptych", n: "II—IV", y: "studio · 2023", breakout: "-14%",
        a: { src: "assets/practice-05.jpg" },
        b: { src: "assets/practice-06.jpg" },
        c: { src: "assets/practice-07.jpg" },
      },
      /* Curled body, beige dress — new single plate. */
      { src: "assets/practice-11.jpg", n: "V", y: "studio · 2024" },
      { src: "assets/practice-02.jpg", n: "VI",  y: "paris · 12.2023" },
      /* Red dress diptych. */
      { kind: "diptych", n: "VII—VIII", y: "studio · 2024",
        a: { src: "assets/practice-09.jpg" },
        b: { src: "assets/practice-10.jpg" },
      },
      { src: "assets/practice-08.jpg", n: "IX", y: "studio · 2023" },
    ],
    plates: [], // legacy — unused; sequence is read instead
  },
  {
    id: "drifting",
    no: "IV",
    title: "drifting",
    years: "2019 — 2023",
    place: "taiwan / france",
    medium: "digital photography",
    epigraph: "to drift is to be moved by what cannot be named.",
    intro: "the figure at scale — small against water, sky, stretches of pale ground. the photographs do not insist; they wait for the eye to find what is barely there.",
    sequence: [
      { src: "assets/drifting-02.jpg", n: "I",   y: "2023", breakout: "-14%", extraGap: 120 },
      { src: "assets/drifting-03.jpg", n: "II",  y: "2023", breakout: "-14%", extraGap: 120 },
      { src: "assets/drifting-04.jpg", n: "III", y: "2023", breakout: "-14%", extraGap: 120 },
    ],
    plates: [],
  },

];

/* ------------------------- Performance ------------------------- */
const PERFORMANCE_FRAGMENTS = [
  "i learn the stage by walking it slowly, in the dark, before anyone arrives.",
  "presence is not what fills the room. it is what stays after one leaves.",
  "the body remembers what the script does not.",
  "a gesture, half-finished. held in the air like a small bell.",
];

const PERFORMANCE_ENTRIES = [
  { y: "2023", r: "performer",       t: "a day",                                                 c: "singapore international festival of arts — by joyce ho" },
  { y: "2023", r: "performer",       t: "counting",                                              c: "joyce ho solo exhibition, tkg+, taipei" },
  { y: "2022", r: "residency",       t: "nina von maltzahn fellowship for the performing arts", c: "the watermill center, new york" },
  { y: "2021", r: "performer",       t: "an artist talk",                                        c: "asia society triennial, online — joyce ho" },
  { y: "2020", r: "performer",       t: "next scene",                                            c: "c-lab annual exhibition re: play — joyce ho & snow huang" },
  { y: "2020", r: "performer",       t: "grandmom mom",                                          c: "the cube project space — dir. wen qi yu" },
  { y: "2019", r: "performer",       t: "artist talk",                                           c: "ozasia festival, adelaide — joyce ho" },
  { y: "2018", r: "performer",       t: "the first time i walked on the moon",                   c: "riverbed theatre — dir. craig quintero — tifa / beseto / tainan" },
  { y: "2018", r: "performer",       t: "island bar",                                            c: "taipei arts festival — joyce ho" },
  { y: "2017", r: "performer",       t: "unspoken",                                              c: "kaohsiung museum of fine arts — riverbed theatre, dir. craig quintero" },
  { y: "2017", r: "performer",       t: "on the second day, saturday, your three minutes",        c: "art basel hong kong — joyce ho" },
  { y: "2016", r: "performer",       t: "one thousand circles for space travel",                  c: "riverbed theatre, cloud gate dance theatre — c. quintero & j. ho" },
  { y: "2015", r: "performer",       t: "dreaming david lynch",                                   c: "riverbed theatre, national experimental theater — dir. craig quintero" },
  { y: "2014", r: "performer",       t: "semi-transparent",                                       c: "asian art biennial, national taiwan museum of fine arts — joyce ho" },
  { y: "2012 —", r: "improviser & director", t: "guts improv theatre",                            c: "theatresports / harold / improvised dystopia / life is improv — over a hundred performances" },
];

/* ------------------------- CV ------------------------- */
const CV_GROUPS = [
  {
    title: "performance & residency",
    rows: [
      ["2012 — 2024", "improviser & director", "theatresports / harold / improvised dystopia / the big improv lab / life is improv — over a hundred performances", "guts improv theatre"],
      ["2023", "performer",  "a day — Joyce Ho",                                                   "singapore international festival of arts"],
      ["2023", "performer",  "counting — Joyce Ho solo exhibition",                                "tkg+, taipei, taiwan"],
      ["2022", "performer",  "baroness nina von maltzahn fellowship for the performing arts — Joyce Ho", "the watermill center, new york"],
      ["2021", "performer",  "an artist talk — Joyce Ho",                                          "new york asia society triennial (online)"],
      ["2020", "performer",  "next scene — Joyce Ho & snow huang",                                 "c-lab annual exhibition re: play"],
      ["2020", "performer",  "grandmom mom — dir. wen qi yu, ku kuang-yi",                         "the cube project space"],
      ["2019", "performer",  "artist talk — Joyce Ho",                                             "adelaide ozasia festival, space theatre, australia"],
      ["2019", "performer / host", "the 17th taishin arts award ceremony",                         "taipei"],
      ["2019", "improviser", "nuit blanche taipei — guts improv theatre",                          "taipei"],
      ["2018", "performer",  "artist talk — Joyce Ho",                                             "asia pacific triennial of contemporary art (apt), goma"],
      ["2018", "performer",  "time stitching — dir. wen qi yu",                                    "taoyuan iron rose festival, flying birds theatre group"],
      ["2018", "performer",  "the first time i walked on the moon — dir. Craig Quintero, riverbed theatre", "beseto festival, asia culture center, gwangju, korea"],
      ["2018", "performer",  "island bar — Joyce Ho",                                              "taipei arts festival"],
      ["2018", "performer",  "the first time i walked on the moon — dir. Craig Quintero, riverbed theatre", "taiwan international festival of arts (tifa)"],
      ["2018", "performer",  "the first time i walked on the moon — dir. Craig Quintero, riverbed theatre", "tainan arts festival"],
      ["2017", "performer",  "a day at acaw — Joyce Ho",                                           "asia contemporary art week / field meeting, sva theatre, new york"],
      ["2017", "performer",  "on the second day, saturday, your three minutes — Joyce Ho",         "art basel hong kong"],
      ["2017", "performer",  "hypnosis: the just for you project — dir. Craig Quintero, riverbed theatre", "macao bok festival"],
      ["2017", "performer",  "just for you: night magic — dir. Craig Quintero, riverbed theatre",  "the place hotel"],
      ["2017", "performer / co-director", "things that drift away — Joyce Ho",                     "air plant: performance ability within contemporary arts"],
      ["2017", "performer",  "unspoken — dir. Craig Quintero, riverbed theatre",                   "kaohsiung museum of fine arts, “and then there were none”"],
      ["2017", "performer",  "times of unauthorized occupancy — Joyce Ho",                         "video work, a restated history of treasure hill"],
      ["2016", "performer",  "one thousand circles for space travel — Craig Quintero, Joyce Ho",   "riverbed theatre, cloud gate dance theatre"],
      ["2016", "performer",  "time stitching — dir. wen qi yu",                                    "taoyuan performing art chungli theater"],
      ["2016", "improviser", "creatures of a day — guts improv theatre",                           "canberra international improv festival, australia"],
      ["2016", "performer",  "a day — Joyce Ho",                                                   "taipei fine arts museum, alice’s rabbit hole"],
      ["2015", "performer",  "dreaming david lynch — dir. Craig Quintero",                         "national experimental theater, riverbed theatre"],
      ["2015", "performer",  "three sisters — beyond time — dir. wen qi yu",                       "flying birds theatre group, guling street avant-garde theatre"],
      ["2014", "performer",  "one thousand circles for space travel — Craig Quintero, Joyce Ho, riverbed theatre", "taiwan international festival of arts, national experimental theater"],
      ["2014", "improviser", "guts improv — guts improv theatre",                                  "shanghai jingan modern drama valley"],
      ["2014", "performer",  "semi-transparent — dir. Joyce Ho",                                   "asian art biennial, national taiwan museum of fine arts"],
      ["2013", "performer",  "us — dir. chiu pi",                                                  "chiu pi gallery"],
      ["2013", "performer",  "single apartment",                                                   "why not theater"],
      ["2012", "performer",  "baby — dir. wen qi yu",                                              "be theatre"],
      ["2011", "performer",  "taipei female experimental comedy club — michael portnoy",           "asian art biennial, taipei fine arts museum"],
    ],
  },
];

Object.assign(window, {
  PHOTO_TONES, HOME_PLATES, PROJECTS,
  PERFORMANCE_FRAGMENTS, PERFORMANCE_ENTRIES, CV_GROUPS,
});
