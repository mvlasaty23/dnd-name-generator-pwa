import {
  Button,
  createStyles,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import 'fontsource-roboto';
import React from 'react';
import './App.css';

const prefix = ['asd', 'das', 'sad', 'def', 'fed', 'aed', 'dea', 'oid', 'dio', 'odi', 'uid'];

const suffix = ['asd', 'das', 'sad', 'def', 'fed', 'aed', 'dea', 'oid', 'dio', 'odi', 'uid'];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
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

  const [race, setRace] = React.useState('');
  const handleRaceChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRace(event.target.value as string);
  };

  const [syllablesCount, setSyllablesCount] = React.useState(2);
  const handleSyllablesCountChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSyllablesCount(event.target.value as number);
  };

  const [name, setName] = React.useState('');

  return (
    <main className="App">
      <Typography variant="h3" component="h2" gutterBottom>
        Name Generator
      </Typography>
      <form className={classes.formControl}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <TextField id="name-input" label="Randomized name" value={name} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="race-select-label">Race</InputLabel>
              <Select labelId="race-select-label" id="race-select" value={race} onChange={handleRaceChange}>
                <MenuItem value="dwarf">Dwarf</MenuItem>
                <MenuItem value="elve">Elve</MenuItem>
                <MenuItem value="human">Human</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id="syllables-count-select-label">Sybllables</InputLabel>
              <Select
                labelId="syllables-count-select-label"
                id="syllables-count-select"
                value={syllablesCount}
                onChange={handleSyllablesCountChange}
              >
                <MenuItem value={2}>Two</MenuItem>
                <MenuItem value={3}>Three</MenuItem>
                <MenuItem value={4}>Four</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setName(generateRandomName(prefix, suffix))}
                startIcon={<RefreshIcon />}
                disableElevation
              >
                Generate
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </main>
  );
}

export default App;
