const people = {};

function addPerson(personName) {
  people[`${personName}`] = {};

  const nameArr = Object.keys(people);

  for (const person in people) {
    const others = nameArr.filter((name) => name !== person);
    for (const other of others) {
      people[person][other] = 0;
    }
  }

  return;
}

addPerson("alice");
addPerson("bob");
addPerson("candice");
addPerson("dylan");
addPerson("ethan");
addPerson("fred");
addPerson("gretchen");
addPerson("han");

const polls = {};

for (let index = 1; index <= 20; index++) {
  polls[`poll${index}`] = { A: [], B: [] };
}

function randomVotes(person) {
  for (const poll in polls) {
    const randomNumber = Math.random();
    if (randomNumber < 0.5) {
      polls[`${poll}`]["A"].push(person);
    } else {
      polls[`${poll}`]["B"].push(person);
    }
  }
  return;
}

function seedRandomVotes(peopleObj) {
  for (const person in peopleObj) {
    randomVotes(person);
  }
  return polls;
}

const realPolls = seedRandomVotes(people);
console.log(realPolls);

// const realPolls = {
//   poll1: { A: ["alice", "candice", "dylan"], B: ["bob"] },
//   poll2: { A: ["alice", "bob", "candice"], B: ["dylan"] },
//   poll3: { A: ["alice", "candice"], B: ["bob", "dylan"] },
//   poll4: { A: ["alice", "candice"], B: ["bob", "dylan"] },
//   poll5: { A: ["alice", "dylan"], B: ["bob", "candice"] },
//   poll6: { A: ["candice", "dylan"], B: ["alice", "bob"] },
//   poll7: { A: ["alice", "bob", "candice", "dylan"], B: [] },
//   poll8: { A: ["bob", "candice"], B: ["alice", "dylan"] },
//   poll9: { A: ["bob", "candice"], B: ["alice", "dylan"] },
//   poll10: { A: ["dylan"], B: ["alice", "bob", "candice"] },
//   poll11: { A: ["alice", "bob", "dylan"], B: ["candice"] },
//   poll12: { A: ["alice"], B: ["bob", "candice", "dylan"] },
//   poll13: { A: ["alice", "bob", "candice", "dylan"], B: [] },
//   poll14: { A: ["bob"], B: ["alice", "candice", "dylan"] },
//   poll15: { A: ["alice"], B: ["bob", "candice", "dylan"] },
//   poll16: { A: ["alice", "dylan"], B: ["bob", "candice"] },
//   poll17: { A: ["dylan"], B: ["alice", "bob", "candice"] },
//   poll18: { A: ["alice", "bob", "candice", "dylan"], B: [] },
//   poll19: { A: ["dylan"], B: ["alice", "bob", "candice"] },
//   poll20: { A: ["alice", "bob", "candice"], B: ["dylan"] },
// };

function getTopFiveShared(personName) {
  if (!people[personName]) {
    return "Please enter a valid name";
  }

  for (const poll in polls) {
    let aVotes = realPolls[`${poll}`]["A"];
    let bVotes = realPolls[`${poll}`]["B"];

    for (const person of aVotes) {
      const others = aVotes.filter((name) => name !== person);
      for (const peep of others) {
        people[person][peep]++;
      }
    }
    for (const person of bVotes) {
      const others = bVotes.filter((name) => name !== person);
      for (const peep of others) {
        people[person][peep]++;
      }
    }
  }

  console.log(people);

  const sortable = Object.entries(people[personName])
    .sort(([, a], [, b]) => b - a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

  if (Object.keys(sortable).length > 5) {
    const entries = Object.entries(sortable);

    const firstFiveEntries = entries.slice(0, 5);

    const firstFiveObject = Object.fromEntries(firstFiveEntries);

    return firstFiveObject;
  } else {
    return sortable;
  }
}

console.log(getTopFiveShared("alice"));
