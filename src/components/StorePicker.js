import React from "react";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
    myInput = React.createRef();
    goToStore = (e) => {
        // stop form from submitting
        e.preventDefault();
        // get text from input
        const store = this.myInput.current.value;
        // change the page to /store/whatwasentered
        this.props.history.push(`/store/${store}`);
    }
    render() {
        return (
            <form action="" className="store-selector" onSubmit={this.goToStore}>
                <h2>Please enter a store</h2>
                <input 
                    type="text"
                    ref={this.myInput}
                    required 
                    placeholder="Store Name" 
                    defaultValue={getFunName()} 
                />
                <button type="submit">Visit Store ⮕</button>
            </form>
        
        )
    }
}

export default StorePicker;