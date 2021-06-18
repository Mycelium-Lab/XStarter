import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'

const styles = {
  root: {
    borderRadius: 8,
    fontFamily: 'inherit',
    textAlign: 'center'
  },
}

function StyledAlert(props) {
  const { classes } = props
  return <Alert {...props} className={classes.root}/>
}

export default withStyles(styles)(StyledAlert)


