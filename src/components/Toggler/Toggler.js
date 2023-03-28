import React from 'react';
import { ToggleContainer, ToggleSwitch} from './Toggler.styled'

class Toggler extends React.Component {
  
    render() {
        return (
            <ToggleContainer
                className="toggle-container" 
                style={{background: (this.props.theme ? 'white' : '#191b1f')}} 
                onClick={this.props.changeTheme}
            >
                <span
                    className="toggle-switch" 
                    style={{
                        left: (this.props.theme ? '0px' : '20px'), 
                        background: (this.props.theme ? '#191b1f' : "white") 
                    }}
                >
                </span>
            </ToggleContainer>
        )
    }
}

export default Toggler
