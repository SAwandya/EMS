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
import useDepartments from "../hooks/useDepartments";
import departmentSevice from "../services/departmentSevice";

const columns = [
  { id: "name", label: "Department Name", minWidth: 120 },
  { id: "code", label: "Department code", minWidth: 120 },
  { id: "manager", label: "Manager", minWidth: 120 },
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
  code,
  manager,
  updateId,
  deleteId
) {
  return { name, code, manager, updateId, deleteId };
}

const DepTable = () => {
  const { data, refetch } = useDepartments();

  refetch();

  console.log("Department table data : ", data);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows =
    data?.map((dept) =>
      createData(
        dept.name,
        dept.code,
        dept.manager,
        dept._id,
        dept._id
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

        departmentSevice
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
        <Button
          variant="contained"
          sx={{
            margin: "27px",
            borderRadius: "8px",
            backgroundColor: "#7350F5",
          }}
          onClick={() => navigate("/adddepartment")}
        >
          Add Department
        </Button>
      </Box>

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
                                sx={{
                                  marginRight: "40px",
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

export default DepTable;
