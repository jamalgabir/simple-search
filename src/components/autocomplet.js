import React from 'react';
import country from '../country';

export default class Autocomplet extends React.Component {
    constructor(props){
        super(props)

        this.state={
            suggestion:[],
            text:'',
        }
    }

    ontextChange = (e) =>{
        const value = e.target.value;
        let suggestion = [];
        if(value.length>0){
            const regex = new RegExp(`^${value}`,'i');
            suggestion = country.sort().filter(v => regex.test(v))
        }
        this.setState(()=>({
            suggestion,
            text:value
             
        }))
    }
    selectedText(value){
        this.setState(()=>({
            text:value,
            suggestion:[],
        }))
    }
    rendersuggestion = () =>{
        let {suggestion} = this.state;
        if(suggestion.length === 0){
            return null;
        }
        return (
            <ul>
                {
                    suggestion.map((item,index)=>(<li key={index} onClick={()=>this.selectedText(item)}>{item}</li>))
                }
            </ul>
        );
    }
    render(){
        const{text,suggestion} = this.state;
        return(
            <div id='notebooks'>
                <h2 >Search a country</h2>
                <input id='query' type='text' onChange={this.ontextChange} value={text} placeholder='Search'/>
                {this.rendersuggestion()}
                <span>suggestion: {suggestion.length}</span>
            </div>
        );
    }
}