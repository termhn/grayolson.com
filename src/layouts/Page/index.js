import React, { PropTypes } from "react"
import Helmet from "react-helmet"
import warning from "warning"
import { BodyContainer, joinUri, Link } from "phenomic"

import {StyleSheet,css} from "aphrodite"
import {mainStyles, maxWidth, colorPrimary, colorPrimaryDark, colorNeutralLight, colorNeutralDark, colorSecondary} from "../../style-vars"
import {toCSS, lum, hexToRGBA} from "../../style-helpers"

import Button from "../../components/Button"
import Loading from "../../components/Loading"
import Header from "../../components/Header"
import Content from "../../components/Content"
import Footer from "../../components/Footer"

var styles = StyleSheet.create({
  page: {
    ...mainStyles.html,
    ...mainStyles.text,
    display: 'flex',
    'flex-direction': 'column',
  },

  wrapper: {
    display: 'flex',
    'flex-direction': 'column',
    'align-self': 'center',
    width: '100%',
    'max-width': toCSS(maxWidth),
    padding: '1rem 0.75rem'
  },

  hero: {
    /* fallback, mainly visible when hero image is loading */
    'background-color': colorSecondary,
    /* fallback when there is no hero image */
    background:'radial-gradient(' + '\n' +
        'ellipse at 50% 50%,' + '\n' +
        lum(colorSecondary, 0.1) + ' 15%,' +'\n' +
        colorSecondary + '70%' + '\n' +
      ')'
  },

  header: {
    display: 'flex',
    'flex-direction': 'column',
    padding: '10vh 0',
    'text-align': 'center',
    background: 'linear-gradient(' + '\n' +
      'to bottom,' + '\n' +
      colorPrimary + ',\n' +
      hexToRGBA(colorPrimary, 0.2) + '\n' +
    ')'
  },

  heading: {
    color: colorNeutralLight,
    'text-shadow':'\n' +
      '0 0 10px ' + colorPrimaryDark + ',\n' +
      '0 0 6px ' + colorNeutralDark + ',\n' +
      '0 0 2px ' + colorNeutralDark + ',\n' +
    ';',
    'letter-spacing': '1px',
  },

  cta: {
    'margin-top': '2rem',
  },

  pageContent: {
    margin: '1rem 0',
  },

  body: {
    a: {
      color: colorPrimary,
      transition: 'all 0.2s',
      'text-decoration': 'none',
      'border-bottom': '1px solid transparent',

      ':hover': {
        opacity: 1,
        color: 'color(' + colorPrimary + ' l(- 5%))',
        'border-bottom-color': colorPrimary,
      }
    },

    /* handy for content */
    img: {
      'max-width': '100%',
    },
  },
})

const Page = (
  {
    isLoading,
    __filename,
    __url,
    head,
    body,
    header,
    footer,
    children,
  },
  {
    metadata: { pkg },
  }
) => {
  warning(
    typeof head.title === "string",
    `Your page '${ __filename }' needs a title`
  )

  const metaTitle = head.metaTitle ? head.metaTitle : head.title

  const meta = [
    { property: "og:type", content: "article" },
    { property: "og:title", content: metaTitle },
    {
      property: "og:url",
      content: joinUri(process.env.PHENOMIC_USER_URL, __url),
    },
    { property: "og:description", content: head.description },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: metaTitle },
    { name: "twitter:creator", content: `@${ pkg.twitter }` },
    { name: "twitter:description", content: head.description },
    { name: "description", content: head.description },
  ]

  return (
    <Content>
    <div className={ css(styles.page) }>
      <Helmet
        title={ metaTitle }
        meta={ meta }
      />
      <Header />
      {
        <div
          className={ css(styles.hero) }
          style={ head.hero && {
            background: `#111 url(${ head.hero }) 50% 50% / cover`,
          } }
        >
          <div className={ css(styles.header) }>
            <div className={ css(styles.wrapper) }>
              <h1 className={ css(styles.heading) }>{ head.title }</h1>
              {
                head.cta &&
                <Link to={ head.cta.link }>
                  <Button className={ css(styles.cta) } light { ...head.cta.props }>
                    { head.cta.label }
                  </Button>
                </Link>
              }
            </div>
          </div>
        </div>
      }
      <div className={ css(styles.wrapper, styles.pageContent) }>
        { header }
        <div className={ css(styles.body) }>
          {
            isLoading
            ? <Loading />
            : <BodyContainer>{ body }</BodyContainer>
          }
        </div>
        { footer }
      </div>
      <Footer />
    </div>
    </Content>
  )
}

Page.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  __filename: PropTypes.string,
  __url: PropTypes.string,
  head: PropTypes.object.isRequired,
  body: PropTypes.string,
  header: PropTypes.element,
  footer: PropTypes.element,
}

Page.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

export default Page
