import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';
// import firebase from 'firebase';
import PropTypes from 'prop-types';

class App extends React.Component {
    static propTypes = {
        match: PropTypes.object
    }
    state = {
        fishes: {},
        order: {},
    };
    componentDidMount() {
        const { params } = this.props.match;
        const localStorageRef = localStorage.getItem(params.storeId);
        
        if(localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef)});
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }
    componentDidUpdate() {
        // console.log(this.state.order);
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }
    addFish = fish => {
        // take a copy of the existing state
        const fishes = { ...this.state.fishes };

        // add new fishes to that fishes variable
        fishes[`fish${Date.now()}`] = fish;
        
        // set the new fishes object to state
        this.setState({ fishes })
    };
    updateFish = (key, updatedFish) => {
        //copy current state
        const fishes = { ...this.state.fishes };
        //update that state
        fishes[key] = updatedFish;
        //set that to state
        this.setState({ fishes });
    };
    deleteFish = (key) => {
        const fishes = { ...this.state.fishes};
        fishes[key] = null;
        this.setState({ fishes });
    }
    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });

    };
    addToOrder = (key) => {
        // take a copy of state
        const order = { ...this.state.order };
        // either add to order or update number
        order[key] = order[key] + 1 || 1;
        console.log(order[key])
        // call set state
        this.setState({ order })
    }
    removeFromOrder = (key) => {
        // take a copy of state
        const order = { ...this.state.order };
        // either add to order or update number
        delete order[key];
        // call set state
        this.setState({ order })
    }
    subtractFromOrder = (key) => {
        // take a copy of state
        const order = { ...this.state.order };
        // either add to order or update number
        if(order[key] > 1) {
            order[key] = order[key] - 1
        } else {
            delete order[key]
        }
        // call set state
        this.setState({ order })
    }
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => 
                        <Fish 
                        key={key}
                        index={key}
                        details={this.state.fishes[key]} 
                        addToOrder={this.addToOrder} 
                        >{key}</Fish>)}
                    </ul>
                </div>
                    <Order 
                    fishes={this.state.fishes} 
                    order={this.state.order}
                    removeFromOrder={this.removeFromOrder}
                    subtractFromOrder={this.subtractFromOrder}
                    />
                    <Inventory 
                    storeName={this.props.match.params.storeId}
                    addFish={this.addFish} 
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSampleFishes}
                    fishes={this.state.fishes}
                    />
            </div>
        )
    }
}
export default App;