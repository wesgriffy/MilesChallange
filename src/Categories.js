import React from 'react';
import './App.css';
import Reward from './Reward.js';

class Categories extends React.Component{
    state = {
        categories: [
            {id:"1", name:"C1"},
            {id:"2", name:"C2"},
            {id:"3", name:"C3"},
            {id:"4", name:"C4"},
            {id:"5", name:"C5"},
        ]
    }

    onDragOver = (event) => {
	    event.preventDefault();
	}

	onDrop = (event, cat, index) => {
	    let taskName = event.dataTransfer.getData("taskName");

	    /*let rewards = this.state.rewards.filter((reward) => {
	        if (reward.taskName == taskName) {
	            reward.type = cat;
                reward.category.push(index)
	        }
	        return task;
	    });

	    this.setState({
	        ...this.state,
	        categories
	    });*/
	}

    render(){
        return(
            <div>
            <div className="droppable">Rewards<Reward/></div>
            {this.state.categories.map((value,index) => 
                <div className="droppable" key={index}
	        	    onDragOver={(event)=>this.onDragOver(event)}
          		    onDrop={(event)=>this.onDrop(event, "Done", index)}>

	            <span className="group-header">C{index+1}</span>
              </div>
            
            )}
            </div>
        )
    }
}

export default Categories;