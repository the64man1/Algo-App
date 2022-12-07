import React, { SyntheticEvent, useEffect, useState } from 'react';
import './App.css';
import {
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import Home from "./Home.page";
import Problem from "./Problem.page";
import { Box, Container, Toolbar, AppBar, Typography, Drawer, Accordion, AccordionSummary, AccordionDetails, List, ListItemButton, ListItemIcon, ListItemText, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

function App() {
  const [categories, setCategories] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<string | false>(false);
  const navigate = useNavigate();

  const handleTabChange = 
    (tab: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? tab : false);
    }

  useEffect(() => {
    const headers = { 'Content-Type': 'application/json' }
    fetch('/categories', { headers })
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

  const navigateProblem = (name: String) => {
    navigate(`/problem/${name}`);
    setExpanded(false);
  }

  return (
    <Container>
      <Link to="/" onClick={() => setExpanded(false)}>
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ width: '100%', zIndex: '1400' }}>
              <Toolbar>
                <Typography sx={{ p: 3 }} variant="h3">
                  My Algo App
                </Typography>
              </Toolbar>
            </AppBar>
        </Box>
      </Link>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={9}>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/problem/:name" element={<Problem />} />
          </Routes>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Drawer variant="permanent" anchor="right">
            <Toolbar sx={{ height: '105px'}} />
            {categories.map(({_id, category, problems}) => {
              return <Accordion key={_id} sx={{ width: '200px'}} expanded={expanded === category} onChange={handleTabChange(category)}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{category}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {problems.map((problem: String, index: number) => {
                      return <ListItemButton key={index} onClick={() => navigateProblem(problem)}>
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
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
