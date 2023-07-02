<template>
  <div class="forms">
    <form @submit.prevent="addNewPlayerHandler">
      <h3>Add New Player</h3>
      <input
        v-model="formAddPlayer.first"
        type="text"
        placeholder="first"
        required
      />
      <input
        v-model="formAddPlayer.last"
        type="text"
        placeholder="last"
        required
      />
      <input
        v-model="formAddPlayer.age"
        type="number"
        placeholder="age"
        required
      />
      <button type="submit">Add New Player</button>
    </form>

    <form @submit.prevent="updatePlayerHandler">
      <h3>Update Player</h3>
      <input
        v-model="formUpdatePlayer.playerId"
        type="text"
        placeholder="playerId"
        required
      />
      <select v-model="formUpdatePlayer.key">
        <option
          v-for="option in formUpdatePlayer.options"
          :value="option.value"
          :key="option.value"
        >
          {{ option.text }}
        </option>
      </select>
      <input
        v-model="formUpdatePlayer.newValue"
        :type="formUpdatePlayer.key === 'age' ? 'number' : 'text'"
        placeholder="New Value"
        required
      />
      <button type="submit">Update Player</button>
    </form>

    <form @submit.prevent="getPlayerHandler">
      <h3>Get Player</h3>
      <input
        v-model="formGetPlayer.playerId"
        type="text"
        placeholder="playerId"
        required
      />
      <button type="submit">Get Player</button>
    </form>

    <form @submit.prevent="subscribeToFilteredPlayersCollection">
      <h3>Get Filtered Players</h3>
      <select v-model="formGetFilteredUser.key">
        <option
          v-for="option in formGetFilteredUser.options"
          :value="option.value"
          :key="option.value"
        >
          {{ option.text }}
        </option>
      </select>
      <select v-model="formGetFilteredUser.operator">
        <option
          v-for="operator in formGetFilteredUser.operators"
          :value="operator.value"
          :key="operator.value"
        >
          {{ operator.text }}
        </option>
      </select>
      <input
        v-model="formGetFilteredUser.searchValue"
        type="text"
        placeholder="search"
        required
      />
      <input
        v-model="formGetFilteredUser.searchLimit"
        type="number"
        min="1"
        placeholder="limit"
      />
      <button type="submit">Get Player</button>
    </form>
  </div>

  <div>players length: {{ players.length }}</div>
  <ul v-if="players.length">
    <li v-for="player in players" :key="player.id">
      <div>playerId: {{ player.id }}</div>
      <div>authorID: {{ player.authorID }}</div>
      <span>{{ player.first }} {{ player.last }} - age: {{ player.age }}</span>
      <button @click="deletePlayerHandler(player.id)">delete</button>
    </li>
  </ul>

  <h2 v-else>Players list is empty</h2>
</template>

<script setup>
const {
  addNewFirebaseDocument,
  updateFirebaseDocument,
  getFirebaseDocument,
  deleteFirebaseDocument,
  subscribeToFirebaseCollection,
  subscribeToFirebaseCollectionWithFilter,
} = useFirebaseDb();

let unsubscribeFromPlayersCollection, unsubscribeFromFilteredPlayersCollection;

onMounted(() => {
  subscribeToPlayersCollection();
});
onUnmounted(() => {
  if (unsubscribeFromPlayersCollection) unsubscribeFromPlayersCollection();
  if (unsubscribeFromFilteredPlayersCollection)
    unsubscribeFromFilteredPlayersCollection();
});

const players = ref([]);

// GET PLAYERS
async function subscribeToPlayersCollection() {
  unsubscribeFromPlayersCollection = await subscribeToFirebaseCollection(
    "players",
    "age",
    players
  );
}

// GET FILTERED PLAYERS
// https://firebase.google.com/docs/firestore/query-data/queries
const DEFAULT_GET_FILTERED_PLAYER_FORM = {
  key: "age",
  operator: ">",
  searchValue: "",
  searchLimit: 10,
};
const formGetFilteredUser = reactive({
  ...DEFAULT_GET_FILTERED_PLAYER_FORM,
  options: [
    { text: "First", value: "first" },
    { text: "Last", value: "last" },
    { text: "Age", value: "age" },
  ],
  operators: [
    { text: "<", value: "<" },
    { text: "<=", value: "<=" },
    { text: "==", value: "==" },
    { text: ">", value: ">" },
    { text: ">=", value: ">=" },
    { text: "!=", value: "!=" },
    { text: "array-contains", value: "array-contains" },
    { text: "array-contains-any", value: "array-contains-any" },
    { text: "in", value: "in" },
    { text: "not-in", value: "not-in" },
  ],
});
async function subscribeToFilteredPlayersCollection() {
  unsubscribeFromPlayersCollection();
  const { key, operator, searchValue, searchLimit } = formGetFilteredUser;
  const filterValue = key !== "age" ? searchValue : +searchValue; // TODO: This logic needs improvement
  unsubscribeFromFilteredPlayersCollection =
    subscribeToFirebaseCollectionWithFilter(
      "players",
      "age",
      players,
      key,
      operator,
      filterValue,
      searchLimit
    );
}

// ADD NEW PLAYERS
const DEFAULT_ADD_PLAYER_FORM = {
  first: "1",
  last: "1",
  age: 1,
  authorID: "",
};
const formAddPlayer = reactive({ ...DEFAULT_ADD_PLAYER_FORM });
async function addNewPlayerHandler() {
  await addNewFirebaseDocument("players", formAddPlayer);
  Object.assign(formAddPlayer, DEFAULT_ADD_PLAYER_FORM);
}

// UPDATE PLAYERS
const DEFAULT_UPDATE_PLAYER_FORM = {
  playerId: "",
  key: "first",
  newValue: "",
};
const formUpdatePlayer = reactive({
  ...DEFAULT_UPDATE_PLAYER_FORM,
  options: [
    { text: "First", value: "first" },
    { text: "Last", value: "last" },
    { text: "Age", value: "age" },
  ],
});
async function updatePlayerHandler() {
  const { playerId, key, newValue } = formUpdatePlayer;
  const value = key !== "age" ? newValue : +newValue; // TODO: This logic needs improvement
  await updateFirebaseDocument("players", playerId, key, value);
  Object.assign(formUpdatePlayer, DEFAULT_UPDATE_PLAYER_FORM);
}

// GET PLAYERS
const DEFAULT_GET_PLAYER_FORM = {
  playerId: "",
};
const formGetPlayer = reactive({ ...DEFAULT_GET_PLAYER_FORM });
async function getPlayerHandler() {
  const snap = await getFirebaseDocument("players", formGetPlayer.playerId);
  if (snap.exists()) {
    const { first, last, age } = snap.data();
    alert(`name: ${first} ${last}\nage: ${age}`);
    Object.assign(formGetPlayer, DEFAULT_GET_PLAYER_FORM);
  } else {
    console.error("Document does not exists");
  }
}

// DELETE PLAYERS
async function deletePlayerHandler(playerId) {
  await deleteFirebaseDocument("players", playerId);
}

// DELETE FIELD FORM DOC
// async function deleteFieldFromDoc() {
//   const docRef = doc(firestoreDB, 'players', 'DQ7ICfeCtk1k4QLNLpy7')
//   await updateDoc(docRef, {
//     first: deleteField()
//   })
// }
</script>

<style>
.forms {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

form {
  border: 1px solid #ada;
  margin-bottom: 8px;
  padding: 8px;
  margin: 0;
}

input,
button {
  display: block;
  margin-bottom: 8px;
}
</style>
