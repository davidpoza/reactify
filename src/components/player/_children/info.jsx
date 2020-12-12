import React from 'react';
import {connect} from 'react-redux';
import PropType from 'prop-types';

// material ui
import Avatar from '@material-ui/core/Avatar';

// own
import Config from '../../../utils/config';
import useStyles from '../styles';

function PlayerInfo({
  playerState, isMobile
}) {
  const classes = useStyles();
  const {name, artist, cover, album} = playerState.queue[0];
  return (
    <div className={isMobile ? classes.infoMobile : classes.info}>
      <Avatar
          className={isMobile ? classes.infoCoverMobile : classes.infoCover}
          variant="square"
          alt={`album cover for ${album}`}
          src={`${Config.API_HOST}${cover}`}
        />
      <div className={classes.infoText}>
        <p>{name}</p>
        <p>{artist}</p>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return ({
    playerState: state.player,
  })
}

PlayerInfo.propType = {
  isMobile: PropType.bool,
}

export default connect(mapStateToProps)(PlayerInfo);