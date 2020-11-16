import React, { Component } from 'react';

class Liste extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
        };
    }

    componentDidMount(){
        fetch("http://127.0.0.1:3333/quizzes")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                    
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items} = this.state;
  
        if(error) {      
            return <div>Erreur : {error.message}</div>;
        } else if(!isLoaded) {
            return <div>Chargement…</div>;
        } else {
            return (
                <ul>
                    {items.map(item => (
                        <li key={item.name}>
                            {item.name} {item.price}
                        </li>
                    ))}
                </ul>
            );
        }
    }
}

export default Liste;