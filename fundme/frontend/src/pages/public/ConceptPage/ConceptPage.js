import React, { useState } from 'react'
import PrimaryHeader from '../PrimaryHeader/PrimaryHeader'
import { makeStyles } from '@material-ui/core/styles'
import { WiTime2 } from 'react-icons/wi'
import { RiCalendar2Line } from 'react-icons/ri'
import { Container } from '@material-ui/core'

import {Document, Page} from 'react-pdf'
import ConceptPaper from '../../../assets/pdfs/concept_paper.pdf'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  article: {
    // backgroundColor: 'purple',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column'
  },
  subheader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.8rem',
    color: theme.palette.primary.main
  },
  articleStats: {
    display: 'flex',
    alignItems: 'center'
  },
  articleStatsIcon: {
    marginRight: theme.spacing(0.5)
  },
  articleHeader: {
    textAlign: 'center'
  },
  articleMainheader: {
    margin: theme.spacing(2)
  },
  articleSubheader: {
    margin: theme.spacing(1)
  }
}))

function ConceptPage() {
  const classes = useStyles()
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className={classes.root}>
      <PrimaryHeader />
      <main className={classes.main}>
        <Container maxWidth='md' className={classes.article}>
          <div className={classes.subheader}>
            <span className={classes.articleStats}>
              <WiTime2 className={classes.articleStatsIcon} /> 15 Minutes
            </span>
            <span className={classes.articleStats}>
              <RiCalendar2Line className={classes.articleStatsIcon} /> 30th January, 2021
            </span>
          </div>

          <article>
            {/* <header className={classes.articleHeader}>
              <h1 className={classes.articleMainheader}>GIVAR</h1>
              <h2 className={classes.articleSubheader} >"Give and Make Believe"</h2>
            </header> */}
            <Document file={ConceptPaper} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
            <p>Page {pageNumber} of {numPages}</p>
          </article>
        </Container>
      </main>
    </div>
  )
}

export default ConceptPage
