type Kind = "birthday" | "corporate" | "academy";
const content = {
 birthday: {
  eyebrow: "Your people. Your celebration.", title: "Make it their kind of birthday.", intro: "A game to get everyone going. Cake to bring them together. Let’s work out the details around your group.",
  steps: [{ title: "Pick your play", text: "Cricket, football or pickleball? Tell us the birthday person’s age and what the group enjoys." }, { title: "Make room for cake", text: "Talk to us about food, cake-cutting and time together at the café, so the celebration has its own rhythm." }, { title: "Bring your people", text: "Share your date and group size. We’ll discuss availability and confirm the plan with you." }],
  questions: [{ q: "Can we plan a birthday for children?", a: "Yes. Share the birthday child’s age, the group size and preferred games so the team can discuss a suitable plan with you." }, { q: "Can we bring a cake or arrange food?", a: "Tell us what you have in mind. Confirm cake arrangements, food options and any decoration requests with the team before booking." }, { q: "Can we book the whole venue?", a: "You can enquire about full venue hire for your group. The team will confirm availability and the spaces included for your date." }, { q: "How do we confirm the celebration?", a: "Send an enquiry with your date and guest count. A WhatsApp enquiry starts the conversation; your booking is confirmed directly with Club 7." }]
 },
 corporate: {
  eyebrow: "A team day with a little more play", title: "Less agenda. More together.", intro: "A friendly match, a team celebration or an afternoon away from the desks. Start with the people, then build the plan.",
  steps: [],
  questions: [{ q: "Do we need to be regular players?", a: "Tell us your group’s experience and preferred sport. The team can discuss a format that suits your colleagues, whether it’s a casual game or some friendly competition." }, { q: "Can we arrange food and time at the café?", a: "Yes, ask the team about food and café arrangements when planning. Confirm your menu, timing and any dietary requests directly before booking." }, { q: "Can the outing include more than one sport?", a: "Ask about cricket, football and pickleball for your preferred date. The team will confirm how the spaces and timings can work for your group." }, { q: "What should we share in our enquiry?", a: "Your preferred date, approximate headcount, sports of interest and whether you’d like food or full venue hire. Booking and event details are confirmed directly with Club 7." }]
 },
 academy: {
  eyebrow: "A few things parents ask", title: "Before the first session.", intro: "The right start begins with knowing your child. Ask us about their age, experience and what’s available now.", steps: [],
  questions: [{ q: "My child is new to cricket. Can we enquire?", a: "Absolutely. Tell us their age and that they’re starting out. The Club 7 team will discuss current coaching options and what could suit them." }, { q: "When are coaching sessions held?", a: "Please contact the team for current coaching days, timings and availability. Venue opening hours are different from coaching session times." }, { q: "Can we visit or ask about a first session?", a: "Message the team to discuss visiting, meeting the coach and options for a first session. Please confirm arrangements before coming." }, { q: "What should my child bring?", a: "Ask the team about the kit and protective equipment needed for the session, and what is available at the venue, before your first visit." }]
 }
};
export default function OccasionGuide({ kind }: { kind: Kind }) {
 const data = content[kind];
 return <section className="occasion-guide events-container">
   <div className="occasion-heading"><div><p className="events-eyebrow">{data.eyebrow}</p><h2>{data.title}</h2></div><p className="events-muted">{data.intro}</p></div>
   {data.steps.length > 0 && <div className="occasion-steps">{data.steps.map((s, i) => <article key={s.title}><span>0{i + 1}</span><h3>{s.title}</h3><p>{s.text}</p></article>)}</div>}
   <div className="occasion-faq"><p className="events-eyebrow">Good to know</p><div>{data.questions.map(item => <details key={item.q}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div></div>
 </section>;
}
