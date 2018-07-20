import React from 'react'
import Layout from "../components/layout"



let dataObj = [];

export default class extends React.Component {
    componentDidMount(){
        if(!firebase.apps.length){
            firebase.initializeApp(config)
        }
        firebase.database()
            .ref().once("value", snapshot => {
                console.log(snapshot.val())
            })
    }
    render (){
        return (
            <div>
                    <Layout>
                    </Layout>

            </div>
        )
    }
}