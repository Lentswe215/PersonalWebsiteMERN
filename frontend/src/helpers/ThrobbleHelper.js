import React, { Component } from 'react'
import { Vortex } from 'react-loader-spinner';
import { Spinner } from 'reactstrap';

export default class ThrobbleHelper extends Component {
    static parentThis = null;

    constructor(props) {
        super(props);

        ThrobbleHelper.parentThis = this;
        this.state = {
            ShowThrobble: false,
            Message: ""
        }
    }


    static show(Message) {
        if (!ThrobbleHelper.parentThis.state.ShowThrobble)
            ThrobbleHelper.parentThis.setState({ ShowThrobble: true, Message });
    }

    static hide(timeout) {
        if (timeout) {
            setTimeout(() => {
                ThrobbleHelper.parentThis.setState({ ShowThrobble: false });
            }, 2000);
        } else
            ThrobbleHelper.parentThis.setState({ ShowThrobble: false });
    }

    render() {
        return (
            <div hidden={!this.state.ShowThrobble} className='throbble-wrapper'>
                <div className='throbble-inner'>
                    <Vortex
                        height={"100px"}
                        width={"100px"}
                        colors={["#445D48", "#005B41","#008170","#445D48", "#005B41","#008170"]} />
                    <br />
                    <span className="fw-bold">{this.state.Message}</span>
                </div>
            </div>
        )
    }
}
