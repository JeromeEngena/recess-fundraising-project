import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import FormField from '../../../components/FormField'
import ProjectHeader from '../../public/ProjectPage/ProjectPageHeader'
import ProjectFooter from '../../public/SecondaryFooter'
import { Container, Grid, Input } from '@material-ui/core'
import { validateProjectName } from '../../../utils/validation'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: theme.palette.primary.main
  },
  wrapper: {
    backgroundColor: 'red',
    margin: theme.spacing(0),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'center'
    }
  },
  form: {
    backgroundColor: 'pink',
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: '10px'
  },
  fieldset: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
  
}))

const initialValues = {
  projectDetails: {
    projectName: '',
    projectCategory: '',
    projectCountry: 'Uganda',
    projectTown: '',
    projectStory: '',
    projectPrimaryImage: null,
    projectSecondaryImages: [],
    projectCurrency: 'UGX',
    projectTarget: 50000,
    projectVerificationStatus: '',
    projectSocialHandles: {
      facebook: '',
      twitter: '',
      instagram: '',
      email: ''
    }
  },
  ownerDetails: {
    ownerId: '',
    ownerFirstName: '',
    ownerLastName: '',
    ownerEmail: '',
    ownerTelephone: '',
    ownerNIN: '',
    ownerVerification: '',
    ownerOrganizationName: ''
  }
}

const validationSchema = yup.object({
  projectName: validateProjectName
})

const handleSubmit = values => {
  console.log(values);
}

function CreateProjectPage() {
  const classes = useStyles()

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit
  })

  return (
    <div className={classes.root}>
      <ProjectHeader />
      <Container maxWidth={'md'} className={classes.wrapper}>
        <Grid component='form' xs={12} md={8} onSubmit={formik.handleSubmit} className={classes.form}>
          <h2>Let's start with the basics...</h2>
          <fieldset className={classes.fieldset}>
            <legend className={classes.legendTitle}>Tell us about your fundraiser</legend>
            <FormField
              name='projectDetails.projectName'
              label="What's your fundraiser title?"
              type='text'
              fullWidth
              value={formik.values.projectDetails.projectName}
              onChange={formik.handleChange}
              error={formik.touched.projectName && Boolean(formik.errors.projectName)}
              helperText={formik.touched.projectName && formik.errors.projectName}
            />

            <FormField
              name='projectDetails.projectCategory'
              label="What are you fundraising for?"
              option={['Personal, Health, Education']}
              type='autocomplete'
              fullWidth
            />

            <FormField
              name='projectDetails.projectTarget'
              type='text'
              label='How much would you like to raise?'
              fullWidth
              value={formik.values.projectDetails.projectTarget}
              onChange={formik.handleChange}
              // error={formik.touched.projectName && Boolean(formik.errors.projectName)}
              // helperText={formik.touched.projectName && formik.errors.projectName}
            />

            <FormField
              name='projectDetails.projectStory'
              label='Tell your story to the world'
              type='multiline'
              fullWidth
              value={formik.values.projectDetails.projectStory}
              onChange={formik.handleChange}
              // error={formik.touched.projectName && Boolean(formik.errors.projectName)}
              // helperText={formik.touched.projectName && formik.errors.projectName}
            />

            <FormField
              type='text'
              name='projectDetails.projectSocialHandles.facebook'
              label='If available, please provide a facebook page url'
              value={formik.values.projectDetails.projectSocialHandles.facebook}
              fullWidth
              onChange={formik.handleChange}
              // error={formik.touched.projectName && Boolean(formik.errors.projectName)}
              // helperText={formik.touched.projectName && formik.errors.projectName}
            />

          </fieldset>

          <fieldset className={classes.fieldset}>
            <legend className={classes.legendTitle}>Help us secure your project</legend>

            <FormField
              type='text'
              name='ownerDetails.ownerNIN'
              label='National Identification Number (NIN)'
              value={formik.values.ownerDetails.ownerNIN}
              fullWidth
              onChange={formik.handleChange}
              // error={formik.touched.projectName && Boolean(formik.errors.projectName)}
              // helperText={formik.touched.projectName && formik.errors.projectName}
            />

            <FormField
              type='text'
              name='ownerDetails.ownerOrganizationName'
              label='Beneficiary organization'
              value={formik.values.ownerDetails.ownerOrganizationName}
              fullWidth
              onChange={formik.handleChange}
              // error={formik.touched.projectName && Boolean(formik.errors.projectName)}
              // helperText={formik.touched.projectName && formik.errors.projectName}
            />

            <FormField
              type='text'
              name='ownerDetails.ownerTelephone'
              label='Associated Phone Number'
              value={formik.values.ownerDetails.ownerTelephone}
              fullWidth
              onChange={formik.handleChange}
              // error={formik.touched.projectName && Boolean(formik.errors.projectName)}
              // helperText={formik.touched.projectName && formik.errors.projectName}
            />
          </fieldset>

          <button type='submit'>Create Project</button>
        </Grid>
      </Container>
      <ProjectFooter />
    </div>
  )
}

export default CreateProjectPage



