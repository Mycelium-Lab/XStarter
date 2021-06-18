import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'

const styles = {
  root: {
    fontSize: 26,
    fontWeight: 200,
    color: '#DFDFDF',
    marginLeft: 10,
    opacity: 0.9
  },
}

function StyledInfoIcon(props) {
  const { classes } = props
  return <InfoOutlinedIcon {...props} className={classes.tooltip}/>
}

export default withStyles(styles)(StyledInfoIcon)


