import React, { Component } from 'react';
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import PropTypes from "prop-types";
import Login from "./Login";
import base, { firebaseApp } from '../base';
import firebase from 'firebase';

class Inventory extends Component {
    static propTypes = {
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func,
        fishes: PropTypes.object,
        addFish: PropTypes.func
    }
    state = {
        uid: null,
        owner: null
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.authHandler({ user });
            }
        })
    }

    logout = async () => {
        await firebase.auth().signOut();
        this.setState({ uid: null })
    }
    authHandler = async (authData) => {
        // console.log(authData)
        // look up store in firebase db
        const store = await base.fetch(this.props.storeName, { context: this});

        //claim if no owner
        if(!store.owner){
            // claim it
            await base.post(`${this.props.storeName}/owner`, { 
                data: authData.user.uid
            })
        }
        // console.log(store)
        //set state of inventory component to reflect currect user
        this.setState({ 
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        })
    }
    authenticate = (service) => {
        const authProvider = new firebase.auth[`${service}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    }
    render() {
        const logout = <button onClick={this.logout} >Log Out!</button>
        if(!this.state.uid) {
            return <Login authenticate={this.authenticate} />
        }

        if(this.state.uid !== this.state.owner){
            return (

            <div>
                <p>Yarr, wrong ship matey!</p>
                {logout}
            </div>
            )
        }
        
        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(key => 
                <EditFishForm 
                key={key} 
                index={key} 
                fish={this.props.fishes[key]}
                updateFish={this.props.updateFish}
                deleteFish={this.props.deleteFish}
                />)}
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div> 
        );
    }
}
 
export default Inventory;