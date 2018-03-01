import { h, Component } from "preact";
import style from "./style.scss";

import { connect } from "unistore/preact";
import { actions } from "../../store";

@connect(["notification"], actions)
class Notification extends Component {
  componentDidMount() {
    if( this.props.type !== 'SW_UPDATE' ) {
      setTimeout( this.props.hideNotification, 3000 );
    }
  }
  render({ notification }) {
    let {type, message} = notification;
    if( type !== null ) {
      return (
        <div className={style.notification}>
          {message}
          {type === 'SW_UPDATE' && <a className={style.link} onClick={() => window.location.reload()}> Reload </a>}
        </div>
      )
    }
    return null
  }
}

export default Notification;
