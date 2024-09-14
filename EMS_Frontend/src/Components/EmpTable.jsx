import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import useEmployee from "../hooks/useEmployee";
import { Button, Typography } from "@mui/material";

const columns = [
  { id: "name", label: "Name", minWidth: 120 },
  { id: "address", label: "Address", minWidth: 120 },
  {
    id: "department",
    label: "Department",
    minWidth: 120,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "email",
    label: "Email",
    minWidth: 120,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "position",
    label: "Position",
    minWidth: 120,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "update",
    label: "Update",
    minWidth: 100,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "delete",
    label: "Delete",
    minWidth: 100,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];


function createData(name, address, department, email, position) {
  return { name, address, department, email, position };
}

 const EmpTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { data, error, refetch } = useEmployee();
  
  const rows =
    data?.map((employee) =>
      createData(
        employee.firstName + " " + employee.lastName,
        employee.Address,
        employee.departmentName,
        employee.email,
        employee.position,
      
      )
    ) || [];

  console.log(rows);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginTop: '30px' }}>
      <Typography sx={{ textAlign: 'left', margin: '27px', fontSize: '20px', fontWeight:'20' }} >All Employees</Typography>
      <TableContainer sx={{ maxHeight: 420 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns?.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns?.map((column) => {
                      const value = row[column.id];
                      return (
                        <>
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "update" ? (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                  console.log(`Update ${row.name}`)
                                }
                              >
                                Update
                              </Button>
                            ) : column.id === "delete" ? (
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() =>
                                  console.log(`Delete ${row.name}`)
                                }
                              >
                                Delete
                              </Button>
                            ) : column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : (
                              value
                            )}
                          </TableCell>
                        </>
                      );
                    
                    })}
                   
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default EmpTable;