import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {

  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];
    // take a copy of the fish
    const updatedFish = {...fish,
      [e.target.name]: e.target.value
    }
    console.log(updatedFish);
  }

  renderInventory(key) {
    const fish = this.props.fishes[key];
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
      </div>
    )
  }

  render() {
    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
}

export default Inventory;
