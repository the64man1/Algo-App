import React, { SyntheticEvent, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Box, Container, Toolbar, AppBar, Typography, Drawer, Accordion, AccordionSummary, AccordionDetails, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

function App() {
  const [categories, setCategories] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleTabChange = 
    (tab: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? tab : false);
    }

  useEffect(() => {
    const headers = { 'Content-Type': 'application/json' }
    fetch('http://localhost:5000/categories', { headers })
      .then(res => res.json())
      .then(
        (result) => {
          setCategories(result);
        },
        (error) => {
          console.log(error);
        }
      )
  }, [])

  console.log(categories)

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <ul>
    //       {categories.map(({_id, category, problems}) => {
    //         return (
    //           <div key={_id}>
    //             <div>{category}</div>
    //             {problems.map((problem: String, index: number) => {
    //               return <li key={index}>{problem}</li>
    //             })}
    //           </div>
    //         )
    //       })}
    //     </ul>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <Container>
      <Box sx={{ display: 'flex' }}>
        <AppBar sx={{ position: 'absolute', width: '100%', zIndex: '1400' }}>
          <Toolbar>
            <Typography sx={{ p: 3 }} variant="h3">
              My Algo App
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box>
        <Toolbar sx={{ height: '105px'}} />
        <Typography sx={{ padding: '50px'}} paragraph>
          This is where my content will go
        </Typography>
        <Typography sx={{ padding: '50px'}} paragraph>
          More stuff here
        </Typography>
      </Box>
      <Drawer variant="permanent" anchor="right">
        <Toolbar sx={{ height: '105px'}} />
        {categories.map(({_id, category, problems}) => {
          return <Accordion key={_id} expanded={expanded === category} onChange={handleTabChange(category)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{category}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {problems.map((problem: String, index: number) => {
                  return <ListItemButton key={index}>
                    <ListItemIcon>
                      <ChevronLeftIcon />
                    </ListItemIcon>
                    <ListItemText primary={problem} />
                  </ListItemButton>
                })}
              </List>
            </AccordionDetails>
          </Accordion>
        })}
      </Drawer>
    </Container>
  );
}

export default App;
