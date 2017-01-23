import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';

class Inventory extends React.Component {

  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.state = {
      uid: null,
      owner: null
    }
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];
    // take a copy of the fish
    const updatedFish = {...fish,
      [e.target.name]: e.target.value
    }
    this.props.updateFish(key, updatedFish);
  }

  renderLogin() {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button
          className="facebook"
          onClick={() => this.authenticate('facebook')}
        >
          Log In with Facebook
      </button>
      </nav>
    )
  }

  authenticate(provider) {
    console.log(`Trying to log in with ${provider}`);
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  authHandler(err, authData) {
    console.log(authData);
  }

  renderInventory(key) {
    const fish = this.props.fishes[key];
    // Input values are not updated dynamically. Currently only updated when the component mounts.
    return (
      <div className="fish-edit" key={key}>
        <input type="text" name="name" defaultValue={fish.name} onChange={(e) => this.handleChange(e, key)} />
        <input type="text" name="price" defaultValue={fish.price} onChange={(e) => this.handleChange(e, key)} />
        <select type="text" name="status" defaultValue={fish.status} onChange={(e) => this.handleChange(e, key)}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" name="desc" defaultValue={fish.desc} onChange={(e) => this.handleChange(e, key)}>
        </textarea>
        <input type="text" name="image" defaultValue={fish.image} onChange={(e) => this.handleChange(e, key)} />
        <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
      </div>
    )
  }

  render() {

    const logout = <button>Log Out!</button>

    // Check if they are not logged in at all
    if(!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    // Check if they are the owner of the current store
    if(this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you aren't the owner of this store!</p>
          {logout}
        </div>
      )
    }

    return (
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
}

Inventory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  addFish: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  updateFish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired
};

export default Inventory;
