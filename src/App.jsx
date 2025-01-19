import PropTypes from "prop-types";
import React from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

console.log(initialFriends);

function Button(props) {
  return (
    <button onClick={props.handleShowAddFriend} className="button">
      {props.children}
    </button>
  ); // alt innhold mellom >< kommer inn
}

export default function App() {
  const [showAddFriend, setShowAddFriend] = React.useState(false);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList />
        {showAddFriend && <FormAddFriend />}
        <Button handleShowAddFriend={handleShowAddFriend}>
          {" "}
          {!showAddFriend ? "Add Friend" : "Close"}{" "}
        </Button>
      </div>

      <FormSplitBill />
    </div>
  );
}

function FriendList() {
  const friends = initialFriends; // lagre midlertidig med eget lokcal initialfriends

  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}€
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} ows you {Math.abs(friend.balance)}€
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even!</p>}

      <Button>Select</Button>
    </li>
  );
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>👭 Friend Name</label>
      <input type="text" />

      <label htmlFor="">🎇 Img URL </label>
      <input type="text" />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a Bill with X </h2>

      <label htmlFor=""> 💰 Bill Value </label>
      <input type="text" />

      <label htmlFor="">🧍🏾‍♂️ Your expense </label>
      <input type="text" />

      <label htmlFor="">🧍🏾👭 X`s expense </label>
      <input type="text" disabled />

      <label>💵 Who is paying the bill? </label>
      <select name="" id="">
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}

Friend.propTypes = {
  friend: PropTypes.shape({
    name: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  handleShowAddFriend: PropTypes.func.isRequired,
};
