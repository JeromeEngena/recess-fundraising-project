import { Avatar, Container, Grid } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import ProjectPageHeader from './ProjectPageHeader'
import { makeStyles } from '@material-ui/core/styles'
import  { FiShare2 } from 'react-icons/fi'
import { BiDonateHeart } from 'react-icons/bi'
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0)
  }
}))

function ProjectPage() {
  const classes = useStyles()
  const { id } = useParams()
  const [ project, setProject ] = useState(JSON.parse(localStorage.getItem('Project')))
  // const [ owner, setOwner ] = useState(JSON.parse(localStorage.getItem('Owner')))

  // useEffect(() => {
  //  axios.get(`http://127.0.0.1:4000/projects/601b9a7171ea615314e93223`)
  //   .then(response => {
  //     const project = response.data
  //     localStorage.setItem('Project', JSON.stringify(project))
  //     // setProject(JSON.parse(localStorage.getItem('Project')) || 'Project missing')
  //     console.log(JSON.stringify(project))
  //     return axios.get(`http://127.0.0.1:4000/users/${project.owner}`)
  //       .then(response => {
  //         const owner = response.data
  //         localStorage.setItem('Owner', JSON.stringify(owner))
  //         // setOwner(localStorage.getItem('Owner') || 'Owner missing')
  //         console.log(owner)
  //       })
  //       .catch(error => console.log(error))
  //   })
  //   .catch(error => console.log(error))
  // }, [])

  useEffect(() => {
    console.log('This is the id param ' + id)
    const url = 'http://127.0.0.1:4000/projects/'
    axios.get(url, { params: { id: id } })
      .then(response => {
        console.log(response.data);
        const project = response.data
        localStorage.setItem('Project', JSON.stringify(project))
        console.log('This is the project ' + project);
      })
      .catch(error => console.log(error))
  }, [])

  useEffect(() => { 
    document.title = id
  })

  return (
    <Container maxWidth={'xl'} className={classes.root}>
      <ProjectPageHeader />
      {/* <h1>{project.description.category}</h1> */}
        {/* <Container maxWidth={'lg'}>
          <h1>{project.name}</h1>
          <Grid item xs={12}>
            <Grid item xs={12} md={6} className={classes.mainImage}>
              <img src={project.description.cover_images[0].path} alt={project.description.cover_images[0].title} />
            </Grid>
            <Grid item xs={12} md={4} component='section'>
              <div className={classes.projectInfo}>
                <div className={classes.infoTop}>
                  <div className={classes.infoTopHeader}>
                    <span>{project.stats.curreny}</span>
                    {project.stats.current}
                    <span className={classes.target}>
                      raised of {`${project.stats.curreny} ${project.stats.target}`}
                    </span>
                  </div>
                  <div className={classes.progressBarOuter}>
                    <div className={classes.progressBarInner}></div>
                  </div>
                </div>
                <div className={classes.shareButtons}>
                  <button className={classes.bigButton}>
                    <FiShare2 />
                    Share
                  </button>
                  <button className={classes.bigButton}>
                    <BiDonateHeart />
                    Donate
                  </button>
                </div>
                <div className={classes.funders}>
                  <ul className={classes.fundersList}>
                    {project.stats.funders.map((funder, index) => (
                      <li key={index}>
                        <div>
                          <Avatar />
                        </div>
                        <div>
                          <div className={classes.funderRightTop}></div>
                          <div className={classes.funderRightBottom}>
                            <span className={classes.funderDonation}>
                              {`${funder.currency} ${funder.amount}`}
                            </span>
                            <span className={classes.funderDonationDate}>
                              {`${funder.time.split(',')[0]}`}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className={classes.fundersButtons}>
                    <button className={classes.fundersButton}>See all</button>
                    <button className={classes.fundersButton}>See all</button>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid item className={classes.projectDescription} xs={12} md={6}>
            <div className={classes.mainDescription}>
              <div className={classes.mainDescriptionLeft}></div>
              <div className={classes.mainDescriptionRight}>
                {/* <h3>{owner.name}</h3> */}
                {/* {project.organization ? <h4>Organization Name</h4> : <></>}
              </div>
            </div>
            <div className={classes.shareButtons}>
              <button className={classes.bigButton}>Share</button>
              <button className={classes.bigButton}>Donate</button>
            </div>
            <div className={classes.contacts}>
              <button className={classes.mediumButton}>Send Message</button>
              <button className={classes.mediumButton}>Request number</button>
            </div>
            <div className={classes.descriptionFooter}>
              <span>Created 3 January, 2021</span>
              <span>Children and Youth</span>
            </div>
          </Grid>
      </Container>  */}
    </Container>
  )
}

export default ProjectPage
