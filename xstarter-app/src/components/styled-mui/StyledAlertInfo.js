import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import StyledAlert from './StyledAlert'

const styles = {
  root: {
    color: '#F3F3F3', 
    borderColor: '#fff',
    '& svg': {
      fill: '#fff'
    }
  },
}

function StyledAlertInfo(props) {
  const { classes } = props
  return <StyledAlert {...props} className={classes.root}/>
}

export default withStyles(styles)(StyledAlertInfo)


