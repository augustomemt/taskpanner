import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../../components/customer/customer-list-results';
import {ProjectsListActivePlanResults} from '../../components/projects/projects-list-activeplan'
import { ProjectsTaskToolbar} from '../../components/projects/projects-task-toobar';
import { CustomerListToolbar } from '../../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { projectsTasks } from '../../__mocks__/project-task';
import { GetStaticPaths, GetStaticProps } from 'next';


const Page = () => (

<>
    <Head>
      <title>
        Vale | Task Planner
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <ProjectsTaskToolbar />
        <Box sx={{ mt: 3 }}>
        <ProjectsListActivePlanResults  projects={projectsTasks} />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);




export default Page;
