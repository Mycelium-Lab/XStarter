import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Tooltip } from '@material-ui/core'

const styles = {
  tooltip: {
    fontSize: 12
  },
}

function StyledTooltip(props) {
  const { classes } = props
  return <Tooltip {...props} className={classes.tooltip}/>
}

export default withStyles(styles)(StyledTooltip)


