import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import employeeService from "../services/employeeService";
import Swal from "sweetalert2";
import useEmployees from "../hooks/useEmployees";
import Search from "./Search";

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
    id: "updateId",
    label: "Update",
    minWidth: 100,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "deleteId",
    label: "Delete",
    minWidth: 100,
    align: "center",
    format: (value) => value.toFixed(2),
  },
];

function createData(
  name,
  address,
  department,
  email,
  position,
  updateId,
  deleteId
) {
  return { name, address, department, email, position, updateId, deleteId };
}

const EmpTable = () => {
  const { data, refetch } = useEmployees();

  refetch();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [query, setQuery] = React.useState("");

  const keys = ["firstName", "lastName", "nic", "position", "departmentName"];

  const search = (data) => {
    return data?.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };

  const rows =
    search(data)?.map((employee) =>
      createData(
        employee.firstName + " " + employee.lastName,
        employee.address,
        employee.departmentName,
        employee.email,
        employee.position,
        employee._id,
        employee._id
      )
    ) || [];

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });

        employeeService
          .Delete(id)
          .then((res) => {
            refetch();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const handleUpdate = (id) => {
    navigate(`/updateemployee/${id}`);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "30px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {" "}
        <Typography
          sx={{
            textAlign: "left",
            margin: "27px",
            fontSize: "20px",
            fontWeight: "20",
          }}
        >
          All Employees
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Search setQuery={setQuery} query={query} />
          <Button
            variant="contained"
            sx={{
              margin: "27px",
              borderRadius: "8px",
              backgroundColor: "#7350F5",
            }}
            onClick={() => navigate("/addemployee")}
          >
            Add employee
          </Button>
        </Box>
      </Box>

      <TableContainer sx={{ maxHeight: 420 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns?.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    color: "#7b778c",
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
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
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    {columns?.map((column) => {
                      const value = row[column.id];
                      return (
                        <>
                          <TableCell
                            sx={{
                              whiteSpace: "normal", // Allow text to wrap
                              maxWidth: "205px", // Set a fixed width
                              wordWrap: "break-word", // Break long words
                            }}
                            key={column.id}
                            align={column.align}
                          >
                            {column.id === "updateId" ? (
                              <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                sx={{
                                  borderRadius: "8px",
                                  backgroundColor: "#16C098",
                                }}
                                onClick={() => handleUpdate(value)}
                              >
                                Update
                              </Button>
                            ) : column.id === "deleteId" ? (
                              <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                sx={{
                                  borderRadius: "8px",
                                  backgroundColor: "#E73B3E",
                                }}
                                onClick={() => handleDelete(value)}
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
};

export default EmpTable;
