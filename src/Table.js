import React from 'react';
import './App.css';

class Table extends React.Component {
    state = {
	    tasks: [
            {id: "1", taskName:"R1",type:"Reward",},
            {id: "2", taskName:"R2", type:"Reward"},
            {id: "3", taskName:"R3", type:"Reward"},
            {id: "4", taskName:"R4", type:"Reward"},
            {id: "5", taskName:"R5", type:"Reward"}
	    ],
        categories: [
            {id: "1", rewards: []},
            {id: "2", rewards: []},
            {id: "3", rewards: []},
            {id: "4", rewards: []},
            {id: "5", rewards: []}
        ],
        drop: false,
        id: ""
    
    }
    onDragStart = (event, taskName, id) => {
    	event.dataTransfer.setData("taskName", taskName);
        if(id){
            this.setState({drop: true,
                            id: id
            })
        }
        else if(id == null){
            this.setState({drop: false,
                            id: ""})
        }
	}
	onDragOver = (event) => {
	    event.preventDefault();
	}

	onDrop = async (event, cat, index) => {
        if(index === 0){
            return
        }
	    let taskName = event.dataTransfer.getData("taskName");
        if(this.state.drop){
            this.remove()
            this.setState({...this.state,
                drop: false,
                id: ""})
        }
        let categories = Object.assign(this.state.categories,{})
	    let tasks = this.state.tasks.filter((task) => {
	        if (task.id === taskName) {
	            task.type = cat;
                if(!categories[index - 1].rewards.includes(taskName)){
                    categories[index - 1].rewards.push(taskName)
                }
                this.setState({categories: categories})
	        }
	        return task;
	    });

	    await this.setState({
	        ...this.state,
	        tasks
	    });
	}

    async remove() {
        let categories = Object.assign(this.state.categories,{})
        const index = categories[this.state.id.charAt(0)-1].rewards.indexOf(this.state.id.charAt(1))
        categories[this.state.id.charAt(0)-1].rewards.splice(index, 1)
        await this.setState({categories: categories,
                    drop: false,
                    id: ""
        },() => {
        })
    }

    async remover(id){
        await this.setState({id: id})
        this.remove()
    }

	render() {
		var tasks = {
	      Reward: [],
	      Done: []
	    }

		this.state.tasks.forEach ((task) => {
            let rewards= (<div key={task.id}
		      onDragStart = {(event) => this.onDragStart(event, task.id, null)}
		      draggable
		      className="draggable"
		      style = {{backgroundColor: task.bgcolor}}>
		      {task.taskName}
		    </div>)
		  tasks.Reward.push(
		    rewards
		  );
          if(task.type === "Done"){
              tasks.Done.push(rewards)
          }
		});

	    return (
	      <div className="drag-container">
		    <div className="inProgress"
                droppable="true"
	    		onDragOver={(event)=>this.onDragOver(event)}
      			onDrop={(event)=>{this.onDrop(event, "Reward", 0)}}>
	          <span className="group-header">Rewards</span>
	          {tasks.Reward}
	        </div>
            <div className="head">Categories</div>
            <div>
            {this.state.categories.map((value,index) => 
                <div className="droppable" key={index}
	        	    onDragOver={(event)=>this.onDragOver(event)}
          		    onDrop={(event)=>this.onDrop(event, "Done", index+1)}>
                          
	            <span className="group-header">C{index+1}</span>
                    {tasks.Done.map ((value,indicies) =>{
                        for(let i=0; i<this.state.categories[index].rewards.length; i++){
                            if(this.state.categories[index].rewards[i] === value.key){
                                let val = Object.create(value)
                                val.id = index+1 + "" + value.key
                                return((<div key={index+1 + "" + value.key}
		                                    onDragStart = {(event) => this.onDragStart(event, value.key, index+1 + "" + value.key)}
		                                    draggable
		                                    className="draggable"
		                                    style = {{backgroundColor: "rgb(255, 72, 0)"}}>
		                                    {this.state.tasks[value.key-1].taskName}
                                            <div type="submit" className="remove"
                                            onClick={() => this.remover(index+1 + "" + value.key)}>x</div>
		                                </div>))
                            }
                        }
                    })}
              </div>
            
            )}
            </div>
	      </div>
	    );
  	}
}

export default Table;