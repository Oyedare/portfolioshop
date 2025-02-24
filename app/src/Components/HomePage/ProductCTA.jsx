import React from 'react'
import { withStyles } from '@mui/styles'
import { Container, Typography, TextField, Snackbar, Button, Hidden, Grid } from '@mui/material'
import axios from 'axios'

const styles = (theme) => ({
    root: {
        marginTop: theme.spacing(10),
        marginBottom: 0,
        display: 'flex',
    },
    cardWrapper: {
        zIndex: 1,
    },
    card: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: theme.palette.warning.main,
        padding: theme.spacing(8, 3),
    },
    cardContent: {
        maxWidth: 400,
    },
    textField: {
        width: '100%',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
    },
    button: {
        width: '100%',
    },
    imagesWrapper: {
        position: 'relative',
    },
    image: {
        position: 'absolute',
        top: -28,
        left: -28,
        right: 0,
        bottom: 0,
        width: '100%',
        maxWidth: 600,
    },
})

const ProductCTA = (props) => {
    const { classes } = props
    const [open, setOpen] = React.useState(false)
    const [email, setEmail] = React.useState('')
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.get(`/api/newsletterSubscribe?email=${email}`)
            setOpen(true)
            setEmail('')
        } catch (err) {
            alert(err)
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Container className={classes.root} component="section">
            <Grid container>
                <Grid item xs={12} md={6} className={classes.cardWrapper}>
                    <div className={classes.card}>
                        <form onSubmit={handleSubmit} className={classes.cardContent}>
                            <Typography variant="h2" component="h2" gutterBottom>
                                Receive offers
                            </Typography>
                            <Typography variant="h5">
                                Allow us to send you our latest updates.
                            </Typography>
                            <TextField className={classes.textField} placeholder="Your email" value={email} onChange={handleEmailChange} />
                            <Button type="submit" color="primary" variant="contained" className={classes.button}>
                                Keep me updated
                            </Button>
                        </form>
                    </div>
                </Grid>
                <Grid item xs={12} md={6} className={classes.imagesWrapper}>
                    <Hidden smDown>
                        <img
                            src="/productCTA.webp"
                            alt="call to action"
                            className={classes.image}
                            width= {'100%'}
                            height={'auto'}
                        />
                    </Hidden>
                </Grid>
            </Grid>
            <Snackbar
                open={open}
                onClose={handleClose}
                message="We will send you our best offers, once a week."
            />
        </Container>
    )
}


export default withStyles(styles)(ProductCTA)