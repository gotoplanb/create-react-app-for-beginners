import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  render() {
    // Vanilla JavaScript comment
    return (
      <form className="store-selector">
        { /* JSX comment must be inside your returned element */ }
        <h2>Please Enter a Store</h2>
        <input type="text" required placeholder="Store Name" defaultValue={getFunName()}/>
        <button type="submit">Visit Store →</button>
      </form>
    )
  }
}

export default StorePicker;
