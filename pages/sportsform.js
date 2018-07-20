import React from 'react'
import firebase from 'firebase'
import Layout from '../components/layout'

var config = {
    apiKey: "AIzaSyA4lnb5BIT-8J8Vtrpk3PC7YTzz33IT7eA",
    authDomain: "sportform-dc6ca.firebaseapp.com",
    databaseURL: "https://sportform-dc6ca.firebaseio.com",
    projectId: "sportform-dc6ca",
    storageBucket: "sportform-dc6ca.appspot.com",
    messagingSenderId: "1072348212335"
};

export default class extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            firstname: "",
            category: "",
            score: "",
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        if(!firebase.apps.length){
            firebase.initializeApp(config)
        }else{
            console.log("error")
        }
    }

    handleChange(event){
        const value = event.target.value
        const name = event.target.name
        this.setState({
            [name]: value
        })
    } 

    handleSelect(event){
        event.preventDefault()
        this.setState({
            category: event.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault()
        firebase.database().ref().child("Category")
            .child(this.state.category).child(this.state.firstname)
            .set({
                score: this.state.score
            })
    }

    render(){
        return(
            <Layout>
            <div className="container" style={{marginTop: 100}}>
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label for="exampleFormControlInput1">firstname</label>
              <input type="script" 
              className="form-control" 
              id="exampleFormControlInput1" 
              placeholder="Alice"
              style={{width: 400}}
              name="firstname"
              onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
                <label for="exampleFormControlInput1">Sports Category</label>
                <select onChange={this.handleSelect} className="form-control" id="exampleFormControlSelect1"
                    style={{width: 400}}>
                    <option name="" value=""> Selected Category </option>
                    <option name="run100m" value="run100m"> Run 100 m </option>
                    <option name="run500m" value="run500m"> Run 500 m </option>
                    <option name="longjump" value="longjump"> Long jump </option>
                    <option name="javelin" value="javelin"> Javelin </option>
                </select>
            </div>

            <div className="form-group">
              <label for="exampleFormControlInput1">Score</label>
              <input type="integer" 
              className="form-control" 
              id="exampleFormControlInput1" 
              placeholder="eg. 13 (sec) or 4.2 (m)"
              style={{width: 400}}
              name="score"
              onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{marginLeft: 60}}> Submit </button> 

            </form>      
            </div>
            </Layout>
        )
    }
}