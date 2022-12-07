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
import { snakeCase } from 'snake-case';

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
    const [response, setResponse] = useState('')

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

    useEffect(() => {
        setUserInput([{label: '', val: ''}]);
        setResponse('');
        const headers = { 'Content-Type': 'application/json' }
        fetch(`/problem/${name}`, { headers })
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

    const handleInputChange = (input: string, idx: number) => {
        let data = [...userInput];
        data[idx].val = input;
        setUserInput(data);
    }

    const submitInput = () => {
        let formData : any = {};
        userInput.forEach((input: inputObject) => {
            if (input.label === "Array") {
                formData[input.label] = JSON.parse(input.val);
            } else {
                formData[input.label] = input.val;
            }
            
        })
        const headers = { 'Content-Type': 'application/json' };
        const body = JSON.stringify(formData);
        const snakeName = snakeCase(name as string)
        fetch(`/${snakeName}`, {
            method: "POST",
            headers: headers,
            body: body
        })
        .then(res => res.json())
        .then(
          (result) => {
            console.log(typeof result)
            setResponse(result.toString());
          },
          (error) => {
            console.log(error);
          }
        )
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
                    {response.length > 0 &&
                    <Box>
                        <TextField value={response}/>
                    </Box>
                    }
                    <Button sx={{ marginTop: '5px' }} variant="contained" onClick={() => submitInput()}>Go</Button>
                </CardContent>
            </Card>
        </Box>
    )
}