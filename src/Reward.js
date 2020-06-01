import React from 'react';
import './App.css'

class Reward extends React.Component{
    state = {
        rewards: [
            {id: "1", name:"R1"},
            {id: "2", name:"R2"},
            {id: "3", name:"R3"},
            {id: "4", name:"R4"},
            {id: "5", name:"R5"},
        ]
    }

    onDragStart = (event, taskName) => {
    	console.log('dragstart on div: ', taskName);
    	event.dataTransfer.setData("taskName", taskName);
	}

    render(){
        var rewards = {
	      Reward: []
	    }

        this.state.rewards.forEach ((reward) => {
		  rewards["Reward"].push(
		    <div key={reward.id} 
		      onDragStart = {(event) => this.onDragStart(event, reward.name)}
		      draggable
		      className="draggable"
              style = {{backgroundColor: "red"}}>
		      {reward.name}
		    </div>
		  );
		});
        return(
            <div>{rewards.Reward}</div>
        );
    }
}

export default Reward;