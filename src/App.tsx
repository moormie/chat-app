import "./App.css";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function App() {
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            rowSpacing={2}
        >
            <Grid item xs textAlign="center">
                <Typography variant="h4" color="primary">
                    TEST
                </Typography>
            </Grid>
            <Grid item xs textAlign="center">
                <Typography variant="h4" color="secondary">
                    TEST
                </Typography>
            </Grid>
            <Grid item xs textAlign="center">
                <Typography variant="h4" color="error">
                    TEST
                </Typography>
            </Grid>
        </Grid>
    );
}

export default App;
