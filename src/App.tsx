import { Button, createStyles, Grid, makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import 'fontsource-roboto';
import React from 'react';
import './App.css';

const prefix = ['asd', 'das', 'sad', 'def', 'fed', 'aed', 'dea', 'oid', 'dio', 'odi', 'uid'];

const suffix = ['asd', 'das', 'sad', 'def', 'fed', 'aed', 'dea', 'oid', 'dio', 'odi', 'uid'];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    generateBtn: {
      textAlign: 'left',
    },
  }),
);

function App() {
  function generateRandomName(...syllables: string[][]): string {
    function randomizeIndex(upper: number): number {
      return Math.floor(Math.random() * upper + 1);
    }
    function notSame(idx: number | undefined) {
      return (targetIdx: number): number => (idx === undefined || targetIdx != idx ? targetIdx : targetIdx - 1);
    }
    function firstUpper(value: string): string {
      return value[0].toUpperCase() + value.slice(1);
    }
    const indezes = syllables.map((syllable) => randomizeIndex(syllable.length - 1));
    return syllables.map((syllable, idx) => syllable[notSame(indezes[idx - 1])(indezes[idx])]).join(' ');
  }

  const classes = useStyles();
  const [name, setName] = React.useState('');

  return (
    <main className="App">
      <Typography variant="h3" component="h2" gutterBottom>
        Name Generator
      </Typography>
      <form noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField id="input-name" label="Randomized name" value={name} />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6} className={classes.generateBtn}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setName(generateRandomName(prefix, suffix))}
              startIcon={<RefreshIcon />}
              disableElevation
            >
              Generate
            </Button>
          </Grid>
        </Grid>
      </form>
    </main>
  );
}

export default App;
