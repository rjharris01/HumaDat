import React from 'react';
import { CSVLink } from "react-csv";
import { Button } from 'react-bootstrap'


const CsvPasser = ({csvData,stats, variant,children}) => {
    const data = csvData
    const filename = "HumaDat Data " + data[0].time.substring(0, 10) + "to" + data[data.length - 1].time.substring(0, 10) ;
    return (
        <>
        <Button variant={variant}>
            <CSVLink filename={filename + "raw"} data={data}>Download Raw csv</CSVLink>
        </Button>
        <Button variant={variant}>
            <CSVLink filename={filename + "stats" } data={stats}>Download Stats csv</CSVLink>
        </Button>
        </>
    )
}


export default CsvPasser