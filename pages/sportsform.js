import React from 'react'
import firebase from 'firebase'
import Layout from '../components/layout'



export default class extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            firstname: "",
            lastname: "",
            house: "",
            category: "",
            statistics: "",
            rank: "",
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
        console.log(`${this.state.rank}`)
    } 

    handleSelect(event){
        event.preventDefault()
        this.setState({
            category: event.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault()
        firebase.database().ref().child(new Date().getFullYear())
            .child("House").child(this.state.house)
                .child("Category").child(this.state.category)
                .child(`${this.state.firstname} ${this.state.lastname}`)
                .set({
                    Rank: this.state.rank,
                    Statistics: this.state.statistics
                })
    }

    render(){
        return(
            <Layout>
            <div className="container" style={{marginTop: 100}}>
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">First Name</label>
              <input type="script" 
              className="form-control" 
              id="exampleFormControlInput1" 
              placeholder="Alice"
              style={{width: 400}}
              name="firstname"
              value={this.state.firstname}
              onChange={this.handleChange}
              />
              <label htmlFor="exampleFormControlInput1">Last Name</label>
              <input type="script" 
              className="form-control" 
              id="exampleFormControlInput1" 
              placeholder="Miller"
              style={{width: 400}}
              name="lastname"
              value={this.state.lastname}
              onChange={this.handleChange}
              />
            </div>

            <div onChange={this.handleChange} className="form-group">
                <input type="radio" name="house" value="L House"/>&nbsp;&nbsp;&nbsp;L House 
                <input type="radio" name="house" value="D House" style={{marginLeft: 20}}/>&nbsp;&nbsp;&nbsp;D House 
                <input type="radio" name="house" value="C House" style={{marginLeft: 20}}/>&nbsp;&nbsp;&nbsp;C House 
                <input type="radio" name="house" value="E House" style={{marginLeft: 20}}/>&nbsp;&nbsp;&nbsp;E House 
            </div>

            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Sports Category</label>
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
              <label htmlFor="exampleFormControlInput1">Statistics</label>
              <input type="number" 
              className="form-control" 
              id="exampleFormControlInput1" 
              placeholder="eg. 13 (sec) or 4.2 (m)"
              style={{width: 400}}
              name="statistics"
              onChange={this.handleChange}
              />
            </div>

             <div onChange={this.handleChange} className="form-group">
                <label>Rank</label><br/>
                <input type="radio" name="rank" value={400}/>&nbsp;&nbsp;&nbsp;1st
                <input type="radio" name="rank" value={300} style={{marginLeft: 20}}/>&nbsp;&nbsp;&nbsp;2nd 
                <input type="radio" name="rank" value={200} style={{marginLeft: 20}}/>&nbsp;&nbsp;&nbsp;3rd 
                <div>
                    <input type="radio" name="rank" value={100} style={{marginLeft: 20}}/>&nbsp;&nbsp;&nbsp;4th
                    <input type="radio" name="rank" value={10} style={{marginLeft: 20}}/>&nbsp;&nbsp;&nbsp;participated
                </div> 
            </div>

            <button type="submit" className="btn btn-primary" style={{marginLeft: 60}}> Submit </button> 

            </form>      
            </div>
            </Layout>
        )
    }
}