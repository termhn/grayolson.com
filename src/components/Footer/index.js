import React from "react"
import {css} from "glamor"

import {Lato} from "../../style-vars"

var styles = {
  footer: css({
    flex: 1,
    maxWidth: '40rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    fontFamily: Lato,
    textAlign: 'center',
  }),
  
  footerContainer: css({
    display: 'flex',
    aligntItems: 'center',
    justifyContent: 'center'
  }),
  
  phenomicReference: css({
    flex: 1,
    fontSize: '0.75rem',
    opacity: 0.6,
    color: 'inherit',
    textDecoration: 'none',
  }),

  phenomicReferenceName: css({
    fontWeight: 'bold',
  }),
  
  copy: css({
    flex: 1,
    fontSize: '0.75rem',
    opacity: 0.8,
    color: 'inherit',
    textDecoration: 'none'
  }),
  
}


const Footer = () => (
  <footer className={ css(styles.footerContainer) }>
    <div className={ css(styles.footer) }>
      <p className={css(styles.copy)}>
        <span>&copy;</span> Gray Olson 2017
      </p>
      <p className={ css(styles.phenomicReference) }>
        <a
          href={ process.env.PHENOMIC_HOMEPAGE }
        >
          { "Created with " }
          <span className={ css(styles.phenomicReferenceName) }>
            {  `<${ process.env.PHENOMIC_NAME} />.` }
          </span>
        </a>
      </p>
    </div>
  </footer>
)

export default Footer
