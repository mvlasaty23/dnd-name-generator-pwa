import {
  Button,
  createStyles,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemText,
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
import { Syllables, Languages, races, raceToLanguage } from './components/model';
import dwarvish from './components/language/dwarvish';
import elvish from './components/language/elvish';
import common from './components/language/common';
import draconinc from './components/language/draconic';
import gnomish from './components/language/gnomish';
import hafling from './components/language/hafling';
import orc from './components/language/orc';
import infernal from './components/language/infernal';

const raceToSelectMapping: { name: string; value: keyof typeof races }[] = [
  { name: 'Dragonborn', value: 'dragonborn' },
  { name: 'Dwarf', value: 'dwarf' },
  { name: 'Elf', value: 'elf' },
  { name: 'Gnome', value: 'gnome' },
  { name: 'Hafling', value: 'hafling' },
  { name: 'Half-Elf', value: 'halfElf' },
  { name: 'Half-Orc', value: 'halfOrc' },
  { name: 'Human', value: 'human' },
  { name: 'Tiefling', value: 'tiefling' },
];
const languages: Languages = {
  dragonborn: draconinc,
  dwarf: dwarvish,
  elf: elvish,
  gnome: gnomish,
  hafling: hafling,
  halfElf: elvish,
  halfOrc: orc,
  human: common,
  tiefling: infernal,
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
    genratedNameListing: {
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

function App() {
  function generateRandomName(...syllables: Syllables[]): string {
    function randomizeIndex(upper: number): number {
      return Math.floor(Math.random() * upper + 1);
    }
    function notSame(idx: number | undefined) {
      return (targetIdx: number): number => (idx === undefined || targetIdx !== idx ? targetIdx : targetIdx - 1);
    }
    function firstUpper(value: string): string {
      return value[0].toUpperCase() + value.slice(1);
    }
    const indezes = syllables.map((syllable) => randomizeIndex(syllable.length - 1));
    return firstUpper(syllables.map((syllable, idx) => syllable[notSame(indezes[idx - 1])(indezes[idx])]).join(''));
  }

  const classes = useStyles();

  const [race, setRace] = React.useState(raceToSelectMapping[0].value);
  const handleRaceChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRace(event.target.value as keyof typeof races);
  };

  const [syllablesCount, setSyllablesCount] = React.useState(2);
  const handleSyllablesCountChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSyllablesCount(event.target.value as number);
  };

  type NameAndLanguage = { name: string; language: string };
  const [generatedNames, setGeneratedNames] = React.useState([] as NameAndLanguage[]);

  const [name, setName] = React.useState({ name: '', language: '' });
  const handleGenerateName = () => {
    if (name.name !== '') {
      setGeneratedNames([{ name: name.name, language: name.language }, ...generatedNames]);
    }
    setName({
      name: generateRandomName(...Array(syllablesCount).fill(languages[race])),
      language: raceToLanguage[race],
    });
  };

  return (
    <main className={classes.app}>
      <Typography variant="h3" component="h2" gutterBottom>
        DnD Name Generator
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <TextField id="name-input" label="Randomized name" value={name.name} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="race-select-label">Race</InputLabel>
              <Select labelId="race-select-label" id="race-select" value={race} onChange={handleRaceChange}>
                {raceToSelectMapping.map((race) => (
                  <MenuItem key={race.value} value={race.value}>
                    {race.name}
                  </MenuItem>
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
                <MenuItem key={1} value={2}>
                  Two
                </MenuItem>
                <MenuItem key={2} value={3}>
                  Three
                </MenuItem>
                <MenuItem key={3} value={4}>
                  Four
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGenerateName}
                startIcon={<RefreshIcon />}
                disableElevation
              >
                Generate
              </Button>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.genratedNameListing}>
              <List>
                {generatedNames.map((generated) => (
                  <ListItem key={generated.name}>
                    <ListItemText primary={generated.name} secondary={generated.language} />
                  </ListItem>
                ))}
              </List>
            </div>
          </Grid>
        </Grid>
      </form>
    </main>
  );
}

export default App;
