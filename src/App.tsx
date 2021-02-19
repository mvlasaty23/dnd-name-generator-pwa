import {
  Button,
  ButtonGroup,
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
  Slider,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import 'fontsource-roboto';
import React from 'react';
import { generateRandomName } from './components/generator/name-generator';
import languages from './components/language';
import { Gender, races, raceToLanguage } from './components/model';

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

const genderToSelectMapping: { name: string; value: Gender }[] = [
  { name: 'Female', value: 'female' },
  { name: 'Male', value: 'male' },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    app: {
      textAlign: 'center',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    raceSelect: {
      margin: theme.spacing(1),
      minWidth: 145,
    },
    syllablesSlider: {
      margin: theme.spacing(1),
      minWidth: 300,
    },
    genratedNameListing: {
      margin: 'auto',
      maxHeight: 'calc(40vh - 5px)',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
    },
  }),
);

function App() {
  const classes = useStyles();

  const [race, setRace] = React.useState(raceToSelectMapping[0].value);
  const handleRaceChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRace(event.target.value as keyof typeof races);
  };

  const [gender, setGender] = React.useState(genderToSelectMapping[0].value);

  const [syllablesCount, setSyllablesCount] = React.useState(2);
  const handleSyllablesCountChange = (event: React.ChangeEvent<any>, value: number | number[]) =>
    setSyllablesCount(value as number);

  type NameAndLanguage = { name: string; language: string };
  const [generatedNames, setGeneratedNames] = React.useState([] as NameAndLanguage[]);

  const [name, setName] = React.useState({ name: '', language: '' });
  const handleGenerateName = () => {
    if (name.name !== '') {
      setGeneratedNames([{ name: name.name, language: name.language }, ...generatedNames]);
    }
    setName({
      name: generateRandomName(syllablesCount, languages[race], gender),
      language: raceToLanguage[race],
    });
  };

  return (
    <main className={classes.app}>
      <Typography variant="h3" component="h3" gutterBottom>
        Name Generator
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl className={classes.raceSelect}>
              <InputLabel id="race-select-label">Race</InputLabel>
              <Select labelId="race-select-label" id="race-select" value={race} onChange={handleRaceChange}>
                {raceToSelectMapping.map((race) => (
                  <MenuItem key={race.value} value={race.value}>
                    {race.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <ButtonGroup color="primary" aria-label="outlined primary button group">
                {genderToSelectMapping.map(({ name, value }) => (
                  <Button
                    key={value}
                    variant={gender === value ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={() => setGender(value)}
                  >
                    {name}
                  </Button>
                ))}
              </ButtonGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.syllablesSlider}>
              <Typography id="syllables-slider" gutterBottom>
                Syllables
              </Typography>
              <Slider
                defaultValue={2}
                aria-labelledby="syllables-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={2}
                max={4}
                onChange={handleSyllablesCountChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <TextField id="name-input" label="Randomized name" value={name.name} />
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
