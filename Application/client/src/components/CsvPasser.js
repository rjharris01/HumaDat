import React from 'react';
import { CSVLink } from "react-csv";
import { Alert } from 'react-bootstrap'


const CsvPasser = ({csvData, variant,children}) => {
    const data = csvData
    const filename = "HumaDat Data " + data[0].time.substring(0, 10) + "to" + data[data.length - 1].time.substring(0, 10) ;
    return (
        <Alert variant={variant}>
            <CSVLink filename={filename} data={data}>Download as csv</CSVLink>;
        </Alert>
    )
}


export default CsvPasser