import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@mui/material";
  import React from "react";
  import { useTheme } from "../Context/ThemeContext";
  
  export default function TableUser({ data }) {
    const { theme } = useTheme();
  
    const tableCellStyle = {
      color: theme.textColor,
      textAlign: "center",
    };
  
    return (
      <TableContainer>
        <Table style={{ color: theme.textColor }}>
          <TableHead>
            <TableRow>
              <TableCell style={tableCellStyle}>WPM</TableCell>
              <TableCell style={tableCellStyle}>Accuracy</TableCell>
              <TableCell style={tableCellStyle}>Characters</TableCell>
              <TableCell style={tableCellStyle}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((i) => (
              <TableRow key={i.id}>
                <TableCell>{i.wpm}</TableCell>
                <TableCell>{i.accuracy}</TableCell>
                <TableCell>{i.characters}</TableCell>
                <TableCell>
                  {i.timeStamp.toDate().toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  