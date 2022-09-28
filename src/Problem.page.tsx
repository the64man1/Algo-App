// import { Box, Toolbar, Typography } from "@mui/material";
// import { useParams } from 'react-router-dom';

// export default function Problem() {
//     let { name } = useParams();
//     return (
//     <Box>
//         <Typography>Name: {name}</Typography>
//     </Box>)
// }

import { Box, Toolbar, Typography, Card, CardHeader, CardContent, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Problem() {
    class inputObject {
        constructor(public label: string, public val: string) {
            this.label = label;
            this.val = val;
        }
    }
    const { name } = useParams();
    const [problem, setProblem] = useState({name: '', description: '', pseudocode: '', info: '', inputs: [], samples: []});
    const [userInput, setUserInput] = useState([{label: '', val: ''}]);

    useEffect(() => {
        setUserInput([{label: '', val: ''}]);
        const headers = { 'Content-Type': 'application/json' }
        fetch(`http://localhost:5000/problem/${name}`, { headers })
          .then(res => res.json())
          .then(
            (result) => {
              setProblem(result[0]);
              createInputFieldsArray(result[0].inputs)
            },
            (error) => {
              console.log(error);
            }
          )
      }, [name])

    const createInputFieldsArray = (arr: [string]) => {
        let data: inputObject[] = [];
        arr.forEach((lab: string) => {
            const field: inputObject = {
                label: lab,
                val: ''
            }
            data.push(field);
        })
        setUserInput(data);
    }

    const handleInputChange = (input: string, idx: number) => {
        let data = [...userInput];
        data[idx].val = input;
        setUserInput(data);
    }

    return (
        <Box>
            <Toolbar sx={{ height: '115px'}} />
            <Card sx={{ width: '80%'}}>
                <CardHeader title={problem.name} />
                <CardContent>{problem.description}</CardContent>
                <CardContent>
                    {userInput.map(({label, val}, index: number) => {
                        return <Box>
                            <TextField sx={{ marginBottom: '10px'}} key={index} variant="outlined" size="small" label={label} value={val} onChange={event => handleInputChange(event.target.value, index)} />
                        </Box>
                    })}
                    <Button sx={{ marginTop: '5px' }} variant="contained" onClick={() => console.log(userInput)}>Go</Button>
                </CardContent>
            </Card>
        </Box>
    )
}