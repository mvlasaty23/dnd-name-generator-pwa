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

const races = [
  { name: 'Dwarf', value: 'dwarf' },
  { name: 'Elve', value: 'elve' },
  { name: 'Human', value: 'human' },
];
const dwarvish = [
  'aza',
  'ghal',
  'nul',
  'bi',
  'zar',
  'bun',
  'dush',
  'ath',
  'ur',
  'buz',
  'un',
  'fel',
  'ak',
  'gun',
  'du',
  'gab',
  'il',
  'an',
  'gath',
  'ol',
  'gam',
  'il',
  'zir',
  'ak',
  'da',
  'bad',
  'ki',
  'bil',
  'aed',
];
const elvish = ['tree', 'hugger', 'stupid', 'name', 'ish'];
const human = ['bli', 'blah', 'blub', 'foo', 'bar'];

const languages: { [k: string]: string[] } = {
  dwarf: dwarvish,
  elve: elvish,
  human: human,
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    app: {
      textAlign: 'center',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
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
    return firstUpper(syllables.map((syllable, idx) => syllable[notSame(indezes[idx - 1])(indezes[idx])]).join(''));
  }

  const classes = useStyles();

  const [race, setRace] = React.useState(races[0].value);
  const handleRaceChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRace(event.target.value as string);
  };

  const [syllablesCount, setSyllablesCount] = React.useState(2);
  const handleSyllablesCountChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSyllablesCount(event.target.value as number);
  };

  const [name, setName] = React.useState('');

  return (
    <main className={classes.app}>
      <Typography variant="h3" component="h2" gutterBottom>
        Name Generator
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <TextField id="name-input" label="Randomized name" value={name} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="race-select-label">Race</InputLabel>
              <Select labelId="race-select-label" id="race-select" value={race} onChange={handleRaceChange}>
                {races.map((race) => (
                  <MenuItem value={race.value}>{race.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id="syllables-count-select-label">Syllables</InputLabel>
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
                onClick={() => setName(generateRandomName(...Array(syllablesCount).fill(languages[race])))}
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
