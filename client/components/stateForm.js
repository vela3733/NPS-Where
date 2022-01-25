import React from "react";
import { render } from "react-dom";






class StateForm extends React.Component {
    constructor() {
        super()
        this.state = {
            stateAbbreviations: [
                'AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA',
                'GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA',
                'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
                'MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT',
                'VT','VI','VA','WA','WV','WI','WY'
               ],
               selectedState: ""
    
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }
    
   
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(event.target.name , event.target.value)

    }


    handleSubmit(event) {
        event.preventDefault()
    }

    render() {
        console.log('submitted', this.state)

        return(
                <form onSubmit={this.handleSubmit}>
                    <label className="text">Select a state </label> 
                    <select name="selectedState" value={this.state.selectedState} onChange={this.handleChange}>
                        {
                            this.state.stateAbbreviations.map(stateCode => (
                                <option value={stateCode} key={stateCode}>{stateCode}</option>

                            ))
                        }
                    </select>
                    <input type="submit" value="Submit" />

                </form>
        
        )
    }
    
}



export default StateForm;
