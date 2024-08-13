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

// const realPolls = seedRandomVotes(people);
// console.log(realPolls);

const realPolls = {
  poll1: {
    A: ["alice", "dylan", "ethan", "fred", "han"],
    B: ["bob", "candice", "gretchen"],
  },
  poll2: {
    A: ["dylan", "ethan", "fred", "gretchen"],
    B: ["alice", "bob", "candice", "han"],
  },
  poll3: {
    A: ["candice", "dylan", "ethan", "fred", "han"],
    B: ["alice", "bob", "gretchen"],
  },
  poll4: {
    A: ["alice", "dylan", "ethan", "han"],
    B: ["bob", "candice", "fred", "gretchen"],
  },
  poll5: {
    A: ["alice", "bob", "candice", "ethan", "gretchen", "han"],
    B: ["dylan", "fred"],
  },
  poll6: {
    A: ["bob", "dylan", "ethan"],
    B: ["alice", "candice", "fred", "gretchen", "han"],
  },
  poll7: {
    A: ["candice", "dylan", "han"],
    B: ["alice", "bob", "ethan", "fred", "gretchen"],
  },
  poll8: {
    A: ["bob", "candice", "han"],
    B: ["alice", "dylan", "ethan", "fred", "gretchen"],
  },
  poll9: {
    A: ["alice", "candice", "dylan", "ethan", "fred", "gretchen"],
    B: ["bob", "han"],
  },
  poll10: {
    A: ["dylan", "fred"],
    B: ["alice", "bob", "candice", "ethan", "gretchen", "han"],
  },
  poll11: {
    A: ["bob", "candice", "ethan", "fred", "gretchen"],
    B: ["alice", "dylan", "han"],
  },
  poll12: {
    A: ["alice", "bob", "ethan", "fred", "han"],
    B: ["candice", "dylan", "gretchen"],
  },
  poll13: {
    A: ["alice", "fred", "gretchen", "han"],
    B: ["bob", "candice", "dylan", "ethan"],
  },
  poll14: {
    A: ["alice", "candice", "fred", "gretchen", "han"],
    B: ["bob", "dylan", "ethan"],
  },
  poll15: {
    A: ["bob", "fred"],
    B: ["alice", "candice", "dylan", "ethan", "gretchen", "han"],
  },
  poll16: {
    A: ["alice", "bob", "candice", "dylan", "fred", "gretchen", "han"],
    B: ["ethan"],
  },
  poll17: {
    A: ["dylan", "ethan", "fred", "gretchen", "han"],
    B: ["alice", "bob", "candice"],
  },
  poll18: {
    A: ["alice", "dylan", "ethan", "han"],
    B: ["bob", "candice", "fred", "gretchen"],
  },
  poll19: {
    A: ["dylan"],
    B: ["alice", "bob", "candice", "ethan", "fred", "gretchen", "han"],
  },
  poll20: {
    A: ["alice", "candice", "fred"],
    B: ["bob", "dylan", "ethan", "gretchen", "han"],
  },
};

function getTopFiveShared(personName) {
  if (!people[personName]) {
    return "Please enter a valid name";
  }

  for (const poll in realPolls) {
    let aVotes = realPolls[`${poll}`]["A"];
    let bVotes = realPolls[`${poll}`]["B"];

    for (const person of aVotes) {
      const others = aVotes.filter((name) => name !== person);
      for (const other of others) {
        people[person][other]++;
      }
    }
    for (const person of bVotes) {
      const others = bVotes.filter((name) => name !== person);
      for (const other of others) {
        people[person][other]++;
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

console.log(getTopFiveShared("dylan"));
