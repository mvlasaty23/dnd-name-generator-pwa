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
import CytoscapeComponent from 'react-cytoscapejs';
import './App.css';
import { allNonPermutationsOf3, generateRandomName } from './components/generator/name-generator';
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
  const prefix = languages[race].syllables[gender].prefix[20];
  const names = allNonPermutationsOf3(
    { ...languages[race].syllables[gender], prefix: [prefix] },
    languages[race].rules,
  );
  const elements = CytoscapeComponent.normalizeElements({
    nodes: [
      // ...languages[race].syllables[gender].prefix
      //   .filter((p) => languages[race].syllables[gender].infix.indexOf(p) === -1)
      //   .map((p, index) => ({
      //     data: { id: p, label: p },
      //     position: { x: 0, y: index * 200 },
      //   })),
      // ...languages[race].syllables[gender].infix.map((i, index) => ({
      //   data: { id: i, label: i },
      //   position: { x: 400, y: index * 200 },
      // })),
      // ...languages[race].syllables[gender].suffix.map((s, index) => ({
      //   data: { id: s, label: s },
      //   position: { x: 800, y: index * 200 },
      // })),
      {
        data: { id: '0-' + prefix, label: prefix },
        position: { x: 0, y: 0 },
      },
      ...circleOf(0, languages[race].syllables[gender].infix, '1'),
      ...circleOf(800, languages[race].syllables[gender].suffix, '2'),
    ],
    edges: [
      ...names.map((n) => ({
        data: {
          source: n.word.length - 1 + '-' + n.word[n.word.length - 1],
          target: n.word.length + '-' + n.syllable,
          label: n.rule,
        },
      })),
      // ...names.map((name) => ({ data: { source: name[1], target: name[2] } })),
      // {
      //   data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' },
      // },
    ],
  });

  function circleOf(center: number, syllables: string[], prefix: string) {
    const angle = syllables.length * 10 + center;
    return syllables.map((s, index, self) => ({
      data: { id: prefix + '-' + s, label: s },
      position: {
        x: angle * Math.cos(2 * Math.PI * (index / self.length)),
        y: angle * Math.sin(2 * Math.PI * (index / self.length)),
      },
    }));
  }
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
          <Grid item xs={12}>
            <CytoscapeComponent
              elements={elements}
              zoom={0.6}
              style={{ border: '1px solid #ccc', width: '100%', height: '700px' }}
              className="graph"
              pan={{ x: 500, y: 400 }}
              stylesheet={[
                {
                  selector: 'node',
                  style: {
                    width: 20,
                    height: 20,
                    label: 'data(label)',
                  },
                },
                {
                  selector: 'edge',
                  style: {
                    width: 3,
                    label: 'data(label)',
                  },
                },
              ]}
            />
          </Grid>
        </Grid>
      </form>
    </main>
  );
}

export default App;
