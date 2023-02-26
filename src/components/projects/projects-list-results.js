import React, {useState,useEffect} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { format } from 'date-fns';
import EditIcon from '@mui/icons-material/Edit';
import {api} from '../../services/api';
import AddTaskIcon from '@mui/icons-material/AddTask';


import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography

} from '@mui/material';
import Link from '@mui/material/Link';
import { getInitials } from '../../utils/get-initials';
import { id } from 'date-fns/locale';

export const ProjectsListResults = ({ projects, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);


  const [projectList, setProjects] = useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  useEffect(() =>{
    async function loadProjects(){
      const response = await api.get("/api/projects/v1");
      setProjects(response.data)

    }
    loadProjects();
  },[]);
  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = projects.map((project) => project.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Nome do Projeto
                </TableCell>
                <TableCell>
                  Cliente
                </TableCell>
                <TableCell>
                  Hora Homem Planejada
                </TableCell>
                <TableCell>
                 Hora Homem Executada
                </TableCell>
                <TableCell>
                 Gestor do Projeto
                </TableCell>
                <TableCell>
                  Início de Execução
                </TableCell>
                <TableCell>
                  Data de Criação
                </TableCell>
                <TableCell>
                  Time
                </TableCell>
                <TableCell>

                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projectList.slice(0, limit).map((projetc) => {
                return (
                  <TableRow
                    hover
                    key={projetc.projectID}
                    selected={selectedCustomerIds.indexOf(projetc.projectID) !== -1}
                  >

                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >

                        <Typography
                          color="textPrimary"
                          variant="body1"
                        >
                          {projetc.projectName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {projetc.clientName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {projetc.plannedManHour}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {0}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {projetc.full_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {projetc.startDate}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {projetc.startDate}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {projetc.departmentName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                    <Link href={`/projects/${projetc.projectID}`}><AddTaskIcon /></Link>

                    </TableCell>

                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>

      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={projects.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>

  );
};

ProjectsListResults.propTypes = {
  projects: PropTypes.array.isRequired
};
