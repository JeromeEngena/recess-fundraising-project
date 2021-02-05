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

  useEffect(() => {
    axios(`http://127.0.0.1:4000/projects/${id}`)
      .then(response => {
        const project = response.data
        localStorage.setItem('Project', JSON.stringify(project))
        console.log(project);
      })
      .catch(error => console.log(error))
      // return () => {
      //   localStorage.removeItem('Project')
      // }
  }, []) 

  useEffect(() => { 
    document.title = `Project ${id}`
  })

  return (
    <Container maxWidth={'xl'} className={classes.root}>
      {/* <h1>{project.projectName}</h1> */}
      <ProjectPageHeader />
        <Container maxWidth={'lg'}>
          <h1>{project.projectName}</h1>
          <Grid item xs={12}>
            <Grid item xs={12} md={6} className={classes.mainImage}>
              <img src='/https://images.gofundme.com/2SPVJP0Ym0o6QzDz86OfNcr3rM0=/720x405/https://d2g8igdw686xgo.cloudfront.net/42249576_1569326715122969_r.jpeg' alt={project.description.cover_images[0].title} />
              
            </Grid>
            <Grid item xs={12} md={4} component='section'>
              <div className={classes.projectInfo}> 
                <div className={classes.infoTop}>
                  <div className={classes.infoTopHeader}>
                    <span>{project.stats.currency}</span>
                      {project.stats.current}
                    <span className={classes.target}>
                      raised of {project.stats.currency} {project.stats.target}
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
                    <button className={classes.fundersButton}>See top funders</button>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid item className={classes.projectDescription} xs={12} md={6}>
            <div className={classes.mainDescription}>
              <div className={classes.mainDescriptionLeft}></div>
              <div className={classes.mainDescriptionRight}>
                <h3>{`${project.owner.ownerFirstName} ${project.owner.ownerLastName}`}</h3>
                {project.organization ? <h4>Organization Name</h4> : <></>}
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
              <span>{project.projectDescription.category}</span>
            </div>
          </Grid>
      </Container> 
    </Container>
  )
}

export default ProjectPage
